import { Component, Input, OnInit } from '@angular/core';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ci-viewer-document',
  templateUrl: './viewer-document.component.html',
  styleUrls: ['./viewer-document.component.scss']
})
export class CIViewerDocumentComponent implements OnInit {

  quotation: any;
  subTotal: number;
  discount: number;
  total: number;
  taxes: any[];
  groupTaxes: any[];
  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public _lamiService: LamiService) { }

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource() {
    //Get Products
    this._lamiService.order$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any) => {
        this.quotation = data;
        this.setSummary();
      });
  }

  setSummary() {

    const summary = this.quotation.items.map((item) => {
      const taxPercentage = item.tax ? item.tax.percentage : 0;
      return {
        discount: (item.price * item.discount) / 100,
        tax: (item.price * taxPercentage) / 100,
        total: item.price * item.quantity
      }
    });

    console.log(`Summary`, summary);

    this.totalcTaxes();
    this.subTotal = summary.map((item: any) => { return item.total }).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.discount = summary.map((item: any) => { return item.discount }).reduce((acc, value) => Number(acc) + Number(value), 0);
    let tax = this.taxes.map((item: any) => { return item.value | 0 }).reduce((acc, value) => Number(acc) + Number(value), 0);
    this.total = (this.subTotal - this.discount) + tax;
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

}
