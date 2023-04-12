import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { RealTimeService } from 'app/core/services/real-time.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
export class PurchaseListComponent extends BaseList implements OnInit {
  current_sales_personecode: string;

  constructor(public _baseListService: BaseListService,
              private realTime: RealTimeService) {
    super(_baseListService);
   }

  ngOnInit(): void {
    this.getDataSource();
    this.current_sales_personecode = localStorage.getItem('user_salesPersonCode');


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
    });
  }

}
