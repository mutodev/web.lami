import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { EventService } from 'app/core/event/event.service';
import { Product } from 'app/shared/interfaces/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchProductDialogComponent } from '../search-product-dialog/search-product-dialog.component';
import * as _moment from 'moment';
import { ProductStockDialogComponent } from '../product-stock-dialog/product-stock-dialog.component';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

const TAXES: any[] = [
  {
    'id': '2',
    'label': 'IVA - (0%)',
    'percentage': 0
  },
  {
    'id': '3',
    'label': 'IVA - (5%)',
    'percentage': 5
  },
  {
    'id': '4',
    'label': 'IVA - (19%)',
    'percentage': 19
  }
]

@Component({
  selector: 'ci-item-table',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  styles: [
    /* language=SCSS */
    `
        .list-grid {
            grid-template-columns: auto 40px;

            @screen sm {
                grid-template-columns: auto 80px 80px 110px 110px 150px 150px 40px;
            }
            @screen md {
                grid-template-columns: auto 40px 40px 90px 90px 110px 110px 20px;
            }

            @screen lg {
                grid-template-columns: auto 80px 80px 110px 110px 150px 150px 40px;
            }
        }
    `
  ],
})
export class ItemsComponent implements OnInit {

  @Input() formGroup: FormGroup;
  products: any[] = [];
  brilla_price = 0;
  taxes = TAXES;
  itemsFormGroup = new FormArray([]);
  id
  discount: number;
  tax: number;
  subTotal: number = 0;
  total: number = 0;
  totalTaxes: any[] = [];
  comments: string = "";
  projects: any[] = [];
  selectedProduct: boolean = false;
  estimatedDate = _moment().format('YYYY-MM-DD');
  @Output() onEstimatedDate = new EventEmitter<any>();
  typer_of_seller: string;
  brilla_prices:  any[] = [];
  user: User;

  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _httpService: HttpMethodService,private _formBuilder: FormBuilder, public _baseListService: BaseListService, public _lamiService: LamiService,    private _userService: UserService,
    private route: ActivatedRoute, public dialog: MatDialog,
    private _event: EventService) {

    this.id = this.route.snapshot.params['id'];
  }


  ngOnInit(): void {

    this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });

    console.log("sellerTypeId", this.user.sellerTypeId);

    this.getType_seller();

    /* this._lamiService.getU_HBT('Project').subscribe((result) => this.projects = result); */
    this._lamiService.getU_HBT('TAX').subscribe((result) => this.taxes = result);
    this.getProducts();
    //this.getTaxes();

    if (this.id) {
      this._lamiService.order$.subscribe((order) => {
        order.orderDetails.forEach((item) => {
          this.itemsFormGroup.push(this.addItemRow(item));

        });
      });


    } else {
      //Array.from(Array(1)).forEach(() => this.itemsFormGroup.push(this.addItemRow()));

    }

    this.validations();


  }

  validations() {
    this.formGroup = this._formBuilder.group({
      items: this.itemsFormGroup
    });
  }

    getType_seller() {
  this.typer_of_seller = localStorage.getItem('user_sellerTypeId');

      if (this.typer_of_seller == '1aa1acf5-7b5b-11ed-b8b2-93cfa5187c2a') {
        this._lamiService.getPrices();
        this.brilla_price = parseFloat("0." + this._lamiService._prices.value[2].value);

        this.getbrilla_prices();
        //this.brilla_prices = this._lamiService._prices.value;

        console.log('Vendedor Brilla Precio Especial', this.brilla_price );
      }
  }
  async getbrilla_prices() {

    const prices = await this._httpService.get<any>(`/prices`);
    this.brilla_prices = prices.data;
        console.log("Precios",  this.brilla_prices);


    this.brilla_prices

  }
  addItemRow(item: any = {}): UntypedFormGroup {

    const tax = item.arTaxCode;
    const total_item = item.total;
    console.log("tax",tax);
    const taxPercentage = this.getTaxById(tax) ? this.getTaxById(tax).value : 0;
    console.log("taxPercentage",taxPercentage );

    console.log("item", item);

    const itemsFormGroup = this._formBuilder.group({
      id: [''],
      brilla: [''],
      Oprice: [item?.price],
      name: [item?.name, Validators.required],
      description: [item?.description] || '',
      code: [item?.code],
      discount: ['0'],
      discountTotal: [''],
      /* project: [item?.project, Validators.required], */
      quantity: ['1', [Validators.required, Validators.min(1)]],
      price: [item?.price + (item?.price * this.brilla_price ), Validators.required],
           tax: item.arTaxCode,
      taxObject: 0,
      subTotal: [0],
      currencyTax: [''],
      estimatedDate: [item?.estimatedDate],
      total: [0, Validators.nullValidator],

    });



    itemsFormGroup.get('name').valueChanges.subscribe((productId: any) => {
      if (productId) {
        itemsFormGroup.get('quantity').setValidators([Validators.required, Validators.min(1)]);
        itemsFormGroup.get('price').setValidators([Validators.required]);
        itemsFormGroup.get("quantity").updateValueAndValidity();
        itemsFormGroup.get("price").updateValueAndValidity();
      }


    });

    itemsFormGroup.get('quantity')
      .valueChanges
      .subscribe((quantity: any) => {

        const priceForm = Number(itemsFormGroup.get('Oprice').value);
        const discountForm = Number(itemsFormGroup.get('discount').value);
        const tax = itemsFormGroup.get('tax').value
        const taxPercentage = this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).value : 0;

        const subTotal = priceForm * quantity;
        const discount = (subTotal * discountForm) / 100;


        let total = (subTotal - discount);

        const currencyTax = (taxPercentage * total) / 100;

        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('discountTotal').setValue(discount.toString());
        itemsFormGroup.get('total').setValue(total);
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        this.calculateSummary();
      });



      itemsFormGroup.get('brilla')
      .valueChanges
      .subscribe((brilla) => {
       brilla = brilla || '0';
        console.log('brilla', brilla)

        const priceForm = Number(itemsFormGroup.get('Oprice').value) ;

        const NewpriceForm = priceForm  +( priceForm * parseFloat("0."+brilla));

        const quantityForm = Number(itemsFormGroup.get('quantity').value);

        const tax = itemsFormGroup.get('tax').value;
        const taxPercentage = this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).value : 0;

        const subTotal = NewpriceForm * quantityForm;
        const currencyTax = (+taxPercentage * priceForm) / 100;

        const discountTotal = (subTotal * Number(itemsFormGroup.get('discount').value)) / 100;

        //Total = (subTotal + currencyTax) - discountTotal

       // let total = (subTotal - discountTotal);

        let total = (subTotal + currencyTax) - discountTotal;
        itemsFormGroup.get('price').setValue(NewpriceForm);
        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        itemsFormGroup.get('total').setValue(total);
        this.calculateSummary();
      });




    itemsFormGroup.get('discount')
      .valueChanges
      .subscribe((discount) => {
        discount = discount || '0';
        console.log('discount', discount)

        const priceForm = Number(itemsFormGroup.get('price').value);
        const quantityForm = Number(itemsFormGroup.get('quantity').value);
        const tax = itemsFormGroup.get('tax').value;
        const taxPercentage = this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).value : 0;
        const subTotal = priceForm * quantityForm;
        const discountTotal = (subTotal * Number(discount)) / 100;
        let total = (subTotal - discountTotal);
        const currencyTax = (+taxPercentage * total) / 100;
        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('discountTotal').setValue(discountTotal.toString());
        itemsFormGroup.get('total').setValue(total);
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        this.calculateSummary();
      });

    itemsFormGroup.get('price')
      .valueChanges
      .subscribe((price: any) => {

        const discountForm = Number(itemsFormGroup.get('discount').value);
        const quantityForm = Number(itemsFormGroup.get('quantity').value);
        const tax = itemsFormGroup.get('tax').value;
        const taxPercentage = this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).value : 0;

        const subTotal = price * quantityForm;
        const discountTotal = (subTotal * discountForm) / 100;
        const currencyTax = (+taxPercentage * subTotal) / 100;
        let total = (subTotal - discountTotal) + currencyTax;

        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('discountTotal').setValue(discountTotal.toString());
        itemsFormGroup.get('total').setValue(total);
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        this.calculateSummary();
      });


    itemsFormGroup.get('tax').valueChanges
      .subscribe((taxId: any) => {
        this.calculateCurrencyTax(itemsFormGroup);
        this.calculateSummary();
      });


    this.calculateCurrencyTax(itemsFormGroup);
    return itemsFormGroup;
  }

  calculateCurrencyTax(itemsFormGroup) {
    const taxId = itemsFormGroup.get('tax').value;
    const priceForm = Number(itemsFormGroup.get('price').value);
    const discountForm = Number(itemsFormGroup.get('discount').value);
    const quantityForm = Number(itemsFormGroup.get('quantity').value);
    const taxPercentage = this.getTaxById(taxId) ? this.getTaxById(taxId).value : 0;
    const subTotal = priceForm * quantityForm;
    const discountTotal = (subTotal * discountForm) / 100;

    //validar brilla price/cantidad/toral/taxes$

    let total = (subTotal - discountTotal); //  sumar el impuesto
    const currencyTax = (+taxPercentage * total) / 100;



    itemsFormGroup.get('subTotal').setValue(subTotal);
    itemsFormGroup.get('discountTotal').setValue(discountTotal.toString());
    itemsFormGroup.get('currencyTax').setValue(currencyTax);

    itemsFormGroup.get('total').setValue(total + currencyTax );

  }

  get items() {
    return this.formGroup.get('items') as FormArray;
  }


  calculateSummary() {
    this.subTotal = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('subTotal').value).reduce((acc, value) => Number(acc) + Number(value), 0);


    this.discount = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('discountTotal').value).reduce((acc, value) => Number(acc) + Number(value), 0);

    this.tax = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('currencyTax').value).reduce((acc, value) => Number(acc) + Number(value), 0);
console.log("print taxes", this.tax )
    this.total = (this.subTotal - this.discount) + this.tax;

    this.totalcTaxes();
  }

  getTaxById(taxId: string) {

    let item = this.taxes.find(item => item.code === taxId);
    return item;
  }

  totalcTaxes() {
    let result = [];

    this.itemsFormGroup.controls.map(item => {
      const control = item as FormGroup;
      if (control.controls['tax'].value) {
        const tax = this.getTaxById(control.controls['tax'].value.toString());
        return {
          name: `${tax.name}`,
          value: Number(item.get('currencyTax').value)
        }
      }
      else
        return {};
    }).reduce((res, value) => {

      if (!res[value.name]) {
        res[value.name] = { name: value.name, value: 0 };
        result.push(res[value.name])
      }
      res[value.name].value += value.value;
      return res;
    }, {});

    const filteredResult = result.filter((item: any) => item.name != undefined)
    this.totalTaxes = filteredResult;

  }

  update() { }
  //END4



  //ADD/REMOVE ITEMS ROWS
  addItemRowBtn() {

    const dialogRef = this.dialog.open(SearchProductDialogComponent, {
      width: '900px',
      maxHeight: 'calc(100vh - 22px) !important;',
      disableClose: true,
      data: {
        selectItem: (item) => {
         this.itemsFormGroup.push(this.addItemRow(item));
         this.calculateSummary();


        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.calculateOrderEstimatedDate();

    });


    //this.productSearchSelect?.loadData(this.products, 'product');
  }

  removeItemRowBtn(index: number) {
    this.itemsFormGroup.removeAt(index);
    this.calculateSummary();
    this.calculateOrderEstimatedDate();

  }
  //END


  // GET DATA FROM DB

  getProducts() {
    //Get Products
    this._lamiService.products$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((products) => {
        this.products = products;
      });
  }

  getTaxes() {
    //Get Products
    this._baseListService.taxes$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((taxes: any[]) => {
        this.taxes = taxes;
      });
  }
  //END

  //SELECTED TEXTS
  setProductText(item: any) {

    if (item)
      return `${item.name}`;
  }

  setTaxtText(item: any) {
    return `${item.name} - ${item.percentage}%`;
  }
  // END

  selectedItem($event: any, item: FormGroup) {

    // item.get('price').setValue($event.price);
    // item.get('description').setValue($event.name);
    // //item.get('tax').setValue(0);
    // // item.get('code').setValue($event.code);
    // item.get('discount').setValue(0); //TODO: update
    // // item.get('total').setValue($event.total);
    // item.get('quantity').setValue(1);
    // item.get('project').setValue('DIGITAL');
    // item.get('id').setValue($event.code);
  }


  toggleDetails(productID): void {

    if (this.selectedProduct && this.selectedProduct == productID) {
      this.selectedProduct = null;
      return;
    };

    this.selectedProduct = productID;
  }


  calculateOrderEstimatedDate() {
    if (this.itemsFormGroup.controls.length > 0) {
      this.estimatedDate = this.itemsFormGroup.controls[0].get('estimatedDate').value;
      this.itemsFormGroup.controls.forEach(item => {
        let estimatedDate = item.get('estimatedDate').value;
        let momentA = _moment(this.estimatedDate);
        var momentB = _moment(estimatedDate);
        if (momentA > momentB)
          this.estimatedDate = momentA.format('YYYY-MM-DD');
        else
          this.estimatedDate = momentB.format('YYYY-MM-DD');
      });
    } else {
      this.estimatedDate = '';
    }
    this.onEstimatedDate.emit(this.estimatedDate);
  }

  stockItemRowBtn() {

    const dialogRef = this.dialog.open(ProductStockDialogComponent, {
      width: '900px',
      maxHeight: 'calc(100vh - 22px) !important;',
      disableClose: true,
      data: {

      },
    });

  }


}
