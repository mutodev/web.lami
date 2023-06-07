import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { BaseListAbs } from 'app/core/bases-abstract/base-list-abs';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { RealTimeService } from 'app/core/services/real-time.service';
import { environment } from 'environments/environment';
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
export class CustomerListComponent extends BaseListAbs implements OnInit, AfterContentChecked, OnChanges {

  constructor(public _baseListService: BaseListService,
    public _changeDetectorRef: ChangeDetectorRef,
    public _httpMethodService: HttpMethodService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private realTime: RealTimeService,
    private cdRef : ChangeDetectorRef,
    private _router: Router) {
    super(_httpMethodService);
    this.urlApi = '/customer';
  }

  ngOnInit() {

    this.getData();
    this.realTime.getServerSentEvent(`${environment.endPoint}/customer/sse/change-status-sap?token=${localStorage.getItem('accessToken')}`)
    .subscribe(event => {
      if (this.dataSource) {
        const customer = JSON.parse(event.data);
        let data = this.dataSource;
        const obj = data.find((a) => a.id === customer.id);
        if (obj) {
            obj.sendToSap = customer.sendToSap;
        }
        this.dataSource = [...data];
      }
    });

    this.searchInputControl.valueChanges.subscribe((text) => {
      console.log({text})
      if (text.length > 3) {
        this.search = text;
        this.getData();
      } else if (text == '') {
        this.search = '';
        this.getData();
      }    
    });

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

  ngAfterContentChecked() : void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource && changes.dataSource.currentValue) {
      this.dataSource = changes.dataSource.currentValue;
    }
  }


}
