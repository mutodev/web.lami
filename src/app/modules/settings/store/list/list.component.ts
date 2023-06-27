import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LamiService } from 'app/core/api/lami.service';
import { Observable } from 'rxjs';
import { User } from '../../user/user.types';
import { Store } from '../store.types';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { BaseListAbs } from 'app/core/bases-abstract/base-list-abs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles         : [
    /* language=SCSS */
    `
        .inventory-grid {
            grid-template-columns: 48px auto 40px;
            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }
            @screen md {
                grid-template-columns: 96px auto 224px 224px 224px 96px;
            }
            @screen lg {
                grid-template-columns:  96px auto 224px 224px 224px 96px;
            }
        }
    `
],
})
export class StoreListComponent extends BaseListAbs implements OnInit, AfterContentChecked, OnChanges {

  /* searchInputControl: FormControl = new FormControl(); */
  stores$: any;

  isLoading: boolean = false;

    constructor(
      private _httpService: HttpMethodService,
      public _lamiService: LamiService,
      private cdRef : ChangeDetectorRef) {

        super(_httpService);
        this.urlApi = '/store';

   }

  ngOnInit(): void {
     // this.stores$ = this._lamiService.stores$;
    /* this.getstores(); */
    this.getData();

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

  createStore():void{

  }

  async  getstores() {
    const stores = await this._httpService.get<any>(`/store`);
        this.stores$ = stores.data;
        console.log("Precios", this.stores$);

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
