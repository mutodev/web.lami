import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { SearchProductDialogComponent } from 'app/shared/components/search-product-dialog/search-product-dialog.component';
import {MatAccordion} from '@angular/material/expansion';
@Component({
  selector: 'app-order-summary-dialog',
  templateUrl: './order-summary-dialog.component.html',
  styleUrls: ['./order-summary-dialog.component.scss'],
  styles         : [
    /* language=SCSS */
    `
        .list-grid {
            grid-template-columns: auto ;

            @screen sm {
                grid-template-columns: auto  80px 150px 80px;
            }

            @screen md {
                grid-template-columns: auto 100px 150px 40px;
            }

            @screen lg {
                grid-template-columns: auto 110px 110px 110px 80px;
            }
        }
    `
],
})
export class OrderSummaryDialogComponent implements OnInit {

 
  orderDetail: any[] = [];
  constructor(public _lamiService: LamiService,
    public dialogRef: MatDialogRef<SearchProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

     }

  ngOnInit(): void {

    this._lamiService.getOrderDetail(this.data.customerId).subscribe((result) => {
        this.orderDetail = result.data;
        console.log(' this.orderDetail',  this.orderDetail)
    });
  }

}
