import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { LamiService } from 'app/core/api/lami.service';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { Observable } from 'rxjs';
import { User } from '../user.types';

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
                grid-template-columns: 224px auto 112px 224px 224px 112px;
            }

            @screen lg {
                grid-template-columns:  224px auto 224px 224px 112px 96px;
            }
        }
    `
],
})
export class UserListComponent extends BaseList implements OnInit {

  searchInputControl: FormControl = new FormControl();
  users$: Observable<User[]>;
  isLoading: boolean = false;

  constructor(public _lamiService: LamiService, public _baseListService: BaseListService) {
    super(_baseListService);
   }

  ngOnInit(): void{ ;

    this.getDataSource();
    console.log( this.dataSource$);
  }

  createUser():void{

  }

}
