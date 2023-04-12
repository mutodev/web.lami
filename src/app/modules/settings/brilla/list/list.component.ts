import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LamiService } from 'app/core/api/lami.service';
import { Observable } from 'rxjs';
import { User } from '../../user/user.types';
import { BPrice } from '../brilla.types';
import { Price } from 'app/shared/interfaces/Price.types';

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
  prices$: Observable<Price[]>;
  isLoading: boolean = false;

  constructor(public _lamiService: LamiService) { }

  ngOnInit(): void {
      this.stores$ = this._lamiService.stores$;
      this._lamiService.getPrices();
     this.prices$ = this._lamiService.prices$;
  }

  createPrices():void{

  }

}
