import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
