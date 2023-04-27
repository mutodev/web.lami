import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { NotifyService } from 'app/core/notify/notify.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { RealTimeService } from 'app/core/services/real-time.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-refunds-report',
  templateUrl: './refunds-report.component.html',
  styleUrls: ['./refunds-report.component.scss'],
  styles         : [
    /* language=SCSS */
    `
        .list-grid {
            grid-template-columns: auto 110px 48px;

            @screen sm {
                grid-template-columns: auto 60px 100px 80px;
            }

            @screen md {
                grid-template-columns: 60px auto 60px 150px 150px 100px 60px;
            }

            @screen lg {
                grid-template-columns: 150px auto 80px 150px 150px 150px 100px 80px;
            }
        }
    `
],
  animations: fuseAnimations
})
export class RefundsReportComponent implements OnInit  {

  current_sales_personecode: string;
  sales: any[] = [];
  refounds: any[] = [];
  isLoading = false;
 total = 0;
  startDate: any;
  endDate: any;
  pipe: DatePipe;

  constructor(private _formBuilder: FormBuilder,
    private _httpService: HttpMethodService,private _notifyService: NotifyService) {

  }

  async ngOnInit() {
    this.pipe = new DatePipe('en-US');
    this.startDate  = null;
  this.endDate = null;
    this.total = 0;
    this.current_sales_personecode = localStorage.getItem('user_salesPersonCode');



  }


  async getdevolucionesBydate(startDate: string, endDate: string) {
    this.total = 0;
    const rest = await this._httpService.get<any>(`/order/get/sales-and-credit-notes?startDate=${startDate}&endDate=${endDate}`);
    this.sales = rest.data.sales;



    for (let i = 0; i <  this.sales.length; i++) {
this.total = this.total + this.sales[i]['docTotal'];
}



    console.log("sales", this.sales);
    this.refounds = rest.data.creditNotes;
  }


  FiltrarOrdenes(): void {
    const startDate = "2022-04-01";
    const endDate = "2023-04-26";
    const state: string = "Atlantico";
    const city: string = "Barranquilla";

    if (this.startDate === null ||  this.endDate === null ) {

      this._notifyService.errorDateAlert("Error");

    } else if (this.endDate < this.startDate) {

      this._notifyService.errorDateAlert("Validar Fechas");

    }else{

      this.getdevolucionesBydate(this.startDate , this.endDate );
    }








  }
  onInitDateChange(event: any): void {

   this.startDate = this.pipe.transform(event.value,'YYY-MM-dd');
    console.log('Initial date:', this.startDate);

  }
  onEndDateChange(event: any): void {
    this.endDate = this.pipe.transform(event.value,'YYY-MM-dd');
    console.log('End date:', this.endDate);
  }
}