import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { BaseListAbs } from 'app/core/bases-abstract/base-list-abs';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { RealTimeService } from 'app/core/services/real-time.service';
import { environment } from 'environments/environment';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';

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
export class PurchaseListComponent extends BaseListAbs implements OnInit, AfterContentChecked, OnChanges {

  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  current_sales_personecode: string;
  token: string;

  constructor(public _baseListService: BaseListService,
    public _httpMethodService: HttpMethodService,
    private _userService: UserService,
              private cdRef : ChangeDetectorRef,
              private socket: Socket,
              private realTime: RealTimeService) {
    super(_httpMethodService);
    this.urlApi = '/order';
   }

  ngOnInit(): void {
    this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
              this.user = user;
              console.log(this.user);
            });
    /* this.getDataSource(); */
    this.getData();
    this.token = localStorage.getItem('accessToken');
    /*this.current_sales_personecode = localStorage.getItem('user_salesPersonCode');
    let user = JSON.parse(localStorage.getItem('user'));
    */
    /* console.log({user}) */

    this.socket.on(`changeStatusOrder${this.user.id}`, (event: any) => {
      console.log({event});
      if (this.dataSource) {
        const order = event;
        let data = this.dataSource;
        const obj = data.find((a) => a.id === order.id);
        if (obj) {
            obj.sendToSap = order.sendToSap;
            obj.docNumber = order.docNumber;
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

  open(orderId){
     let pdf = environment.endPoint + '/order/generate/pdf/'+ orderId +'?token='+this.token;
    console.log("new window "+pdf);
    window.open(pdf,"_blank");
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
