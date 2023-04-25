import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Directive, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'app/core/api/event/event.service';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
import { items } from 'app/mock-api/apps/file-manager/data';
import { IdentificationType } from 'app/modules/contact/customer/clients.types';
import { SearchMatSelectComponent } from 'app/shared/controls/custom-mat-select/search-mat-select.component';
import { Uhbt } from 'app/shared/interfaces/UHBT';
import { AsyncCustomValidator } from 'app/shared/validators/async-validator';
import { result } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-store-component',
  templateUrl: './store-component.component.html',
  styleUrls: ['./store-component.component.scss']
})
export class StoreComponentComponent extends BaseForm implements OnInit, AfterViewInit  {


  constructor(private _lamiService: LamiService,
    public _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private _eventService: EventService,
    private _route: ActivatedRoute) {
    super();
    this.id = this._route.snapshot.params['id'] || null;
  }
  ngAfterViewInit(): void {



  }
  ngOnInit(): void {
  }

}
