import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { SearchProductDialogComponent } from 'app/shared/components/search-product-dialog/search-product-dialog.component';
import { OrderSummaryDialogComponent } from '../order-summary-dialog/order-summary-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles         : [
    /* language=SCSS */
    `
        .list-grid {
            grid-template-columns: auto 48px ;

            @screen sm {
                grid-template-columns: auto  80px 150px 80px;
            }

            @screen md {
                grid-template-columns: auto 100px 150px 40px;
            }

            @screen lg {
                grid-template-columns: 200px auto 300px 80px 200px 100px;
            }
        }
    `
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CustomerListComponent extends BaseList implements OnInit {

  dataSource = [];
  constructor(public _baseListService: BaseListService,
    public _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute
    , public dialog: MatDialog,
    private _router: Router) {
    super(_baseListService);
    this.apiUrl = '/api/customer';
  }

  ngOnInit(): void {

    this.getDataSource();
  }


  createClient() {
    this._router.navigate(['./new'], { relativeTo: this._activatedRoute });
  }

   getStage(source: string): string{
    return source == 'L' ? 'Posible cliente': 'Cliente';
  }

  openDetailOrder(customer){
    this.dialog.open(OrderSummaryDialogComponent, {
     width: '900px',
     maxHeight: 'calc(100vh - 22px) !important;',
      data: {
        customerId: customer.id,
        displayName: customer.name
      },
    });
  }
  

}
