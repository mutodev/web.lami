import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { RealTimeService } from 'app/core/services/real-time.service';
import { environment } from 'environments/environment';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseListAbs } from 'app/core/bases-abstract/base-list-abs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  styles: [
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
export class ListComponent extends BaseListAbs implements OnInit {




  current_sales_personecode: string;
  token: string;
  url = environment.endPoint;
  user: User;
  prefix: string;
  /* isLoading: boolean = false; */
  /* filter: string; */
  constructor(public _baseListService: BaseListService, private _userService: UserService,
    private _httpService: HttpMethodService,
    private realTime: RealTimeService) {
    super(_httpService);
    this.urlApi = '/quote'
  }

  ngOnInit(): void {

    this.getData();
    this.prefix = '000000';
    //this.getquotations();
    this.current_sales_personecode = localStorage.getItem('user_salesPersonCode');

    this.token = localStorage.getItem('accessToken');

    /* this.getDataSource(); */
    //console.log(this.dataSource,"datasource")

    /* this.getDataSource();



     console.log("current_sales_personecode",  this.current_sales_personecode);
     console.log("listado de ordenes",this.dataSource$);
     this.realTime.getServerSentEvent(`${environment.endPoint}/order/sse/change-status-sap?token=${localStorage.getItem('accessToken')}`)
     .subscribe(event => {
       if (this.dataSource$) {


         const order = JSON.parse(event.data);
         let data = (this.dataSource$.source as any)._value;
         const obj = data.find((a) => a.id === order.id);
         if (obj) {
             obj.sendToSap = order.sendToSap;
             obj.docNumber = order.docNumber;
         }
         this.editSource([...data]);
       }
     });*/

    this.searchInputControl.valueChanges.subscribe((text) => {
      console.log({ text })
      if (text.length > 3) {
        this.search = text;
        this.getData();
      } else if (text == '') {
        this.search = '';
        this.getData();
      }
    });


  }

  /* async getquotations() {

    const quotations = await this._httpService.get<any>(`/quote`);
    this.dataSource$ = quotations.data;
    console.log(this.dataSource$);
  } */

  open(orderId) {
    let pdf = environment.endPoint + '/quote/generate/pdf/' + orderId + '?token=' + this.token;
    console.log("new window " + pdf);
    window.open(pdf, "_blank");
  }


  /* search() {

    console.log("Buscando",this.formGroup.controls.search.value );

    console.log(this.dataSource$);
    this.filter = this.formGroup.controls.search.value;


  } */




}
