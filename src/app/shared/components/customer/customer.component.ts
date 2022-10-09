import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'app/core/api/event/event.service';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
import { items } from 'app/mock-api/apps/file-manager/data';
import { IdentificationType } from 'app/modules/contact/customer/clients.types';
import { AsyncCustomValidator } from 'app/shared/validators/async-validator';
import { result } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseForm implements OnInit {

  formGroup: FormGroup;
  customerType: any[] = [];
  genders: any[] = [];
  isNIT:boolean= false;
  customerComponent = CustomerComponent;
  identificationTypes: IdentificationType[] = [];
  identificationType
  static success: boolean = false;

  constructor(private _lamiService: LamiService,
    public _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private _eventService: EventService,
    private _route: ActivatedRoute) {
    super();
    this.id = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._eventService.addEvent({ name: 'saveClient', event: this.save.bind(this) });
    this.validations();

    this._lamiService.identificationTypes$.subscribe((identificationTypes: IdentificationType[])=>{
      this.identificationTypes = identificationTypes;

    if(this.id)
      this.getCusotmer();
  })

  }
  getCusotmer() {
    this._lamiService.customer$.subscribe((customer)=>{
      this.formGroup.patchValue(customer)
    })
  }

  validations() {
    this.formGroup = this._formBuilder.group({
      typeId: ['87345bca-46c0-11ed-88f1-7b765a5d50e1', Validators.nullValidator], //tipoCliente
      identificationTypeId: [null, Validators.required],
      identification: ['', Validators.required],
      source: ['Lead', Validators.nullValidator],
      firstName: ['', Validators.nullValidator],
      lastName: ['', Validators.nullValidator],
      companyName:  ['', Validators.nullValidator],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });


    this.formGroup.get('identificationTypeId').valueChanges.subscribe((id)=>{
        const identificationType = this.identificationTypes.find((item:any)=>item.id ==id);
        if (identificationType.code == 'NIT'){
          this.isNIT = true;
          this.formGroup.get('companyName').setValidators([Validators.required]);
          this.formGroup.get('companyName').updateValueAndValidity();
          this.formGroup.get('firstName').setValidators([Validators.nullValidator]);
          this.formGroup.get('lastName').setValidators([Validators.nullValidator]);
          this.formGroup.get('firstName').updateValueAndValidity();
          this.formGroup.get('lastName').updateValueAndValidity();
        }    
        else {
          this.isNIT = false;
          this.formGroup.get('companyName').setValidators([Validators.nullValidator]);
          this.formGroup.get('companyName').updateValueAndValidity();
          this.formGroup.get('firstName').setValidators([Validators.required]);
          this.formGroup.get('lastName').setValidators([Validators.required]);
          this.formGroup.get('firstName').updateValueAndValidity();
          this.formGroup.get('lastName').updateValueAndValidity();
        }
           
    });
  }

  getList(): void {

    this._lamiService.identificationTypes$.subscribe((identificationTypes: IdentificationType[])=>{
        this.identificationTypes = identificationTypes;
    })
    
  }

  save(): Observable<any> {
    if (this.formGroup.valid) {
      return this.create();
    } else {
      this.validateAllFormFields(this.formGroup);
      this.formGroup.enable();
      return of({ success: false });
    }
  }

  create(): Observable<any> {
    return this._httpClient.post<any>('/api/customer', this.formGroup.value).pipe(
      map((res: any) => {
        if (res.status === 'success') {
          return { success: true, data: res.data }
        } else {
          this.formGroup.enable();
          return { success: false }
        }
      }),
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          alert(error.error.message)
        } else {
          alert(error.message)
        }
        this.formGroup.enable();
        return of({ success: false });
      }));
  }

  update() {

  }

}
