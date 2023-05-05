import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LamiService } from 'app/core/api/lami.service';
import { Observable } from 'rxjs';
import { User } from '../../user/user.types';
import { BPrice } from '../brilla.types';
import { Price } from 'app/shared/interfaces/Price.types';
import { HttpMethodService } from 'app/core/services/http-method.service';
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
export class ListComponent implements OnInit {
  searchInputControl: FormControl = new FormControl();
  stores$: Observable<BPrice[]>;
  prices$ : any;
  isLoading: boolean = false;

  constructor(  private _httpService: HttpMethodService, public _lamiService: LamiService, ) { }

  ngOnInit(): void {

      this.getprices();

  }

  createPrices():void{

  }

    async getprices() {

        const prices = await this._httpService.get<any>(`/prices`);
        this.prices$ = prices.data;
        console.log("Precios", this.prices$);

    }

}
