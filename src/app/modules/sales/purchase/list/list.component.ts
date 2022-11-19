import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';

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
                grid-template-columns: auto  80px 150px 80px;
            }

            @screen md {
                grid-template-columns: 60px auto 150px 150px 150px 100px 60px;
            }

            @screen lg {
                grid-template-columns: 150px auto 150px 150px 150px 100px 80px;
            }
        }
    `
],
  animations: fuseAnimations
})
export class PurchaseListComponent extends BaseList implements OnInit {

  constructor(public _baseListService: BaseListService,) {
    super(_baseListService);
   }

  ngOnInit(): void {
    this.getDataSource();
  }

}
