import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { RealTimeService } from 'app/core/services/real-time.service';
import { report } from 'app/shared/interfaces/report';
import { environment } from 'environments/environment';
import { rest } from 'lodash';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-open-report',
  templateUrl: './open-report.component.html',
  styleUrls: ['./open-report.component.scss'],
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



export class OpenReportComponent extends BaseForm  implements OnInit  {

  current_sales_personecode: string;
  dataSource$ = null;
  isLoading = false;
  constructor(  private _formBuilder: FormBuilder,
              private _httpService:  HttpMethodService) {
    super();
  }

  async ngOnInit() {

    const startDate = "2022-04-01";
    const endDate = "2023-04-26";
    const state:  string = "Atlantico";
    const city: string = "Barranquilla";
    this.dataSource$ = (await this.getdevolucionesBydate(startDate, endDate));




    this.current_sales_personecode = localStorage.getItem('user_salesPersonCode');


    console.log("current_sales_personecode",  this.current_sales_personecode);
    console.log("array", this.dataSource$ );



  }


  async getdevolucionesBydate(startDate: string, endDate: string) {

    const rest  = await this._httpService.get(`/order/get/sales-and-credit-notes?startDate=${startDate}&endDate=${endDate}`);

    return rest;



  }


  FiltrarOrdenes(): void{


}
}