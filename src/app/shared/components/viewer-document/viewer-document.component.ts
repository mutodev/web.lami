import { Component, Input, OnInit } from '@angular/core';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { Store } from 'app/modules/settings/store/store.types';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ci-viewer-document',
  templateUrl: './viewer-document.component.html',
  styleUrls: ['./viewer-document.component.scss']
})
export class CIViewerDocumentComponent implements OnInit {
  [x: string]: any;
  stores$ : any;
  brilla_price = 0;
  quotation: any;
  store: any;
  sales_person: any;
  subTotal: number;
  discount: number;
  total: number;
  taxes: any[];
  groupTaxes: any[];
  public _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private _httpService: HttpMethodService,
    public _lamiService: LamiService) { }

  ngOnInit(): void {

    this.getDataSource();

    this.getstores(this.sales_person);
    this.brilla_price = 0.40;
console.log(this.taxes);

  }

  getStore(city_name) {
    console.log(city_name, "Ciudad recibida");


    const result = this.stores$.find(x => x.city  === city_name);

    console.log( result,"Tienda Comparada");

    this.setSummary();

/*
    this._lamiService.getStores();

    this._lamiService.stores$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {

        const result = data.find(({ city }) => city === city_name);
        this.store= result;

        console.log( this.store,"Tienda Comparada");

        this.setSummary();
      });

    */


  }

  getDataSource() {
    //Get Products
    this._lamiService.order$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        //Sales person code

        console.log(data);

        this.sales_person = data.salesPerson.extendedData.cities[0];
        this.quotation = data;
        console.log(  this.quotation ,"Orden Captuada");
        this.setSummary();
      });
  }

  setSummary() {

    const summary = this.quotation.orderDetails.map((item) => {
      return {
        discount: (item.value * item.discount) / 100,
        tax: item.vat,
        total: item.value * item.amount
      }
    });


    //this.totalcTaxes();
    this.subTotal = summary.map((item: any) => { return item.total }).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.discount = summary.map((item: any) => { return item.discount }).reduce((acc, value) => Number(acc) + Number(value), 0);
    //let tax = this.taxes.map((item: any) => { return item.value | 0 }).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.total = (this.subTotal - this.discount);
  }

  totalcTaxes() {
    let result = [];

    this.taxes = this.quotation.items.map(item => {
      if (item.tax) {
        const taxCurrency = (item.price * item.tax.percentage) / 100;
        return {
          name: `${item.tax.name} - (${item.tax.percentage}%)`,
          value: taxCurrency
        }
      } else {
        return {};
      }
    });

    this.taxes.reduce((res, value) => {
      if (!res[value.name]) {
        res[value.name] = { name: value.name, value: 0 };
        result.push(res[value.name])
      }
      res[value.name].value += value.value;
      return res;
    }, {});
    this.groupTaxes = result;
  }

  async  getstores(city_name) {
    const stores = await this._httpService.get<any>(`/store`);

    this.stores$ = stores.data;
    this.store = this.stores$.find(x => x.city === city_name);
        console.log("Tiendas", this.stores$);
        console.log("Selected", this.store);
  }


}
