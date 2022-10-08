import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { Pagination } from 'app/shared/interfaces/pagination';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CustomerListComponent extends BaseList implements OnInit {

  dataSource = [];
  constructor(public _baseListService: BaseListService,
    public _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
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

}
