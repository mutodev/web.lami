import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { Product } from 'app/shared/interfaces/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ci-item-table',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() formGroup: FormGroup;
  products: any[] = [];
  taxes: any[] = [{
    id:'1',
    name:'IVA',
    percetage: '19'
  }];
  itemsFormGroup = new FormArray([]);

  discount: number;
  tax: number;
  subTotal: number = 0;
  total: number = 0;
  totalTaxes: any[] = [];

  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _formBuilder: FormBuilder, public _baseListService: BaseListService, public _lamiService:LamiService) { }


  ngOnInit(): void {
    this.getProducts();
    //this.getTaxes();
    Array.from(Array(1)).forEach(() => this.itemsFormGroup.push(this.addItemRow()));
    this.validations();
  }

  validations() {
    this.formGroup = this._formBuilder.group({
      items: this.itemsFormGroup
    });
  }

  addItemRow(): UntypedFormGroup {

    //Items
    const itemsFormGroup = this._formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      code: [''],
      discount: [''],
      discountTotal: [''],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', Validators.required],
      tax: 0,
      taxObject: 0,
      subTotal: [0],
      currencyTax: [''],
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
        const taxPercentage = this.getTaxById(tax.toString()) ? this.getTaxById(tax.toString()).percentage : 0;

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
    this.subTotal = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('subTotal').value).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.discount = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('discountTotal').value).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.tax = this.itemsFormGroup.controls.map((control: FormGroup) => control.get('currencyTax').value).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.total = (this.subTotal - this.discount) + this.tax;
    this.totalcTaxes();
  }

  getTaxById(taxId: string) {
    return this.taxes.find(item => item.id === taxId);
  }

  totalcTaxes() {
    let result = [];

    this.itemsFormGroup.controls.map(item => {
      const control = item as FormGroup;
      if (control.controls['tax'].value) {
        const tax = this.getTaxById(control.controls['tax'].value);
        return {
          name: `${tax.name} - ${tax.percentage}%`,
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
    this.itemsFormGroup.push(this.addItemRow());
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
    return `${item.name}`;
  }

  setTaxtText(item: any) {
    return `${item.name} - ${item.percentage}%`;
  }
  // END

  selectedItem($event: any, item: FormGroup) {
    console.log($event)
    item.get('price').setValue($event.price);
    item.get('description').setValue($event.description);
    item.get('tax').setValue('');
    // item.get('code').setValue($event.code);
    item.get('discount').setValue(0); //TODO: update
    item.get('total').setValue($event.price);
    item.get('quantity').setValue(1);
    item.get('id').setValue($event.id);
  }

}
