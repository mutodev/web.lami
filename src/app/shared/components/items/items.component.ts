import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { Product } from 'app/shared/interfaces/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchProductDialogComponent } from '../search-product-dialog/search-product-dialog.component';

const  TAXES : any[] = [
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
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() formGroup: FormGroup;
  products: any[] = [];
  taxes= TAXES;
  itemsFormGroup = new FormArray([]);
  id
  discount: number;
  tax: number;
  subTotal: number = 0;
  total: number = 0;
  totalTaxes: any[] = [];
  comments: string = "";

  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _formBuilder: FormBuilder, public _baseListService: BaseListService, public _lamiService:LamiService,
    private route: ActivatedRoute, public dialog: MatDialog) { 

    this.id = this.route.snapshot.params['id'];
  }


  ngOnInit(): void {
    this.taxes = TAXES;
    this.getProducts();
    //this.getTaxes();
   
    if (this.id){
      this._lamiService.order$.subscribe((order)=>{
        order.orderDetails.forEach((item)=>{
          this.itemsFormGroup.push(this.addItemRow(item));
         
        });
      });
   
      
    } else{
      //Array.from(Array(1)).forEach(() => this.itemsFormGroup.push(this.addItemRow()));
   
    }
  
    this.validations();
  

  }

  validations() {
    this.formGroup = this._formBuilder.group({
      items: this.itemsFormGroup
    });
  }

  addItemRow(item: any={}): UntypedFormGroup {
  
    const itemsFormGroup = this._formBuilder.group({
      id: [''],
      name: [item?.name, Validators.required],
      description: [item?.description] || '',
      code: [item?.code],
      discount: ['0'],
      discountTotal: [''],
      project: [item?.project, Validators.required],
      quantity: ['1',[Validators.required, Validators.min(1)]],
      price: [item?.price, Validators.required],
      tax: 0,
      taxObject: 0,
      subTotal: [item?.price],
      currencyTax: [''],
      total: [item?.price, Validators.nullValidator],

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

        const priceForm = parseInt(itemsFormGroup.get('price').value);
        const discountForm = parseInt(itemsFormGroup.get('discount').value);
        const tax = itemsFormGroup.get('tax').value
        const taxPercentage = this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).percentage : 0;

        const subTotal = priceForm * quantity;
        const discount = (subTotal * discountForm) / 100;
        const currencyTax = (taxPercentage * subTotal) / 100;

        let total = (subTotal - discount) + currencyTax;

        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('discountTotal').setValue(discount.toString());
        itemsFormGroup.get('total').setValue(total);
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        this.calculateSummary();
      });

    itemsFormGroup.get('discount')
      .valueChanges
      .subscribe((discount) => {
        const priceForm = parseInt(itemsFormGroup.get('price').value);
        const quantityForm =  parseInt(itemsFormGroup.get('quantity').value);
        const tax = itemsFormGroup.get('tax').value;
        const taxPercentage = this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).percentage : 0;
        const subTotal = priceForm * quantityForm;
        const discountTotal = (subTotal *  parseInt(discount)) / 100;
        const currencyTax = (taxPercentage * subTotal) / 100;
        let total = (subTotal - discountTotal) + currencyTax;
        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('discountTotal').setValue(discountTotal.toString());
        itemsFormGroup.get('total').setValue(total);
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        this.calculateSummary();
      });

    itemsFormGroup.get('price')
      .valueChanges
      .subscribe((price: any) => {
        const discountForm = parseInt(itemsFormGroup.get('discount').value);
        const quantityForm = parseInt(itemsFormGroup.get('quantity').value);
        const tax = itemsFormGroup.get('tax').value;
        const taxPercentage =   this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).percentage : 0;

        const subTotal = price * quantityForm;
        const discountTotal = (subTotal * discountForm) / 100;
        const currencyTax = (taxPercentage * subTotal) / 100;
        let total = (subTotal - discountTotal) + currencyTax;

        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('discountTotal').setValue(discountTotal.toString());
        itemsFormGroup.get('total').setValue(total);
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        this.calculateSummary();
      });


    itemsFormGroup.get('tax').valueChanges
      .subscribe((taxId: any) => {

        const priceForm = parseInt(itemsFormGroup.get('price').value);
        const discountForm = parseInt(itemsFormGroup.get('discount').value);
        const quantityForm = parseInt(itemsFormGroup.get('quantity').value);
        const taxPercentage = this.getTaxById(taxId) ? this.getTaxById(taxId).percentage : 0;
        const subTotal = priceForm * quantityForm;
        const discountTotal = (subTotal * discountForm) / 100;
        const currencyTax = (taxPercentage * subTotal) / 100;
        let total = (subTotal - discountTotal) + currencyTax;

        itemsFormGroup.get('subTotal').setValue(subTotal);
        itemsFormGroup.get('discountTotal').setValue(discountTotal.toString());
        itemsFormGroup.get('currencyTax').setValue(currencyTax.toString());
        itemsFormGroup.get('total').setValue(total);
        this.calculateSummary();
      });
      
    return itemsFormGroup;
  }

  get items() {
    return this.formGroup.get('items') as FormArray;
  }


  calculateSummary() {
    console.log( this.itemsFormGroup.controls)
    this.itemsFormGroup.controls.map((control: FormGroup) => console.log(control.get('subTotal').value));
    this.subTotal = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('subTotal').value).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.discount = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('discountTotal').value).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.tax = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('currencyTax').value).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.total = (this.subTotal - this.discount) + this.tax;
    this.totalcTaxes();
  }

  getTaxById(taxId: string) {

    let item =  this.taxes.find(item => item.id === taxId);
    return item;
  }

  totalcTaxes() {
    let result = [];

    this.itemsFormGroup.controls.map(item => {
      const control = item as FormGroup;
      if (control.controls['tax'].value) {
        const tax = this.getTaxById(control.controls['tax'].value.toString());
        return {
          name: `${tax.label}`,
          value: item.get('currencyTax').value
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
    this.totalTaxes = result;
  }

  update() { }
  //END



  //ADD/REMOVE ITEMS ROWS
  addItemRowBtn() {
  
      const dialogRef = this.dialog.open(SearchProductDialogComponent, {
        width: '900px',
        maxHeight: '900px',
        minHeight: '900px',
        data: {
          selectItem: (item)=>{
            this.itemsFormGroup.push(this.addItemRow(item));
            this.calculateSummary();
          }
        },
      });
  
      dialogRef.afterClosed().subscribe(result => {
       
     
      });
    
    
    //this.productSearchSelect?.loadData(this.products, 'product');
  }

  removeItemRowBtn(index: number) {
    this.itemsFormGroup.removeAt(index);
    this.calculateSummary();
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
   
    if(item)
    return `${item.name }`;
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
    // item.get('total').setValue($event.price);
    // item.get('quantity').setValue(1);
    // item.get('project').setValue('DIGITAL');
    // item.get('id').setValue($event.code);
  }

}
