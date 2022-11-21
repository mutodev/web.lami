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


export enum EnumCustomerType {
  PersonaNatural = '87345bca-46c0-11ed-88f1-7b765a5d50e1',
  PersonaJuridica = '87345bcb-46c0-11ed-88f1-7b765a5d50e1'
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseForm implements OnInit, AfterViewInit {

  formGroup: FormGroup;
  customerType: any[] = [];
  genders: any[] = [];
  isNIT: boolean = false;
  customerComponent = CustomerComponent;
  identificationTypes: IdentificationType[] = [];
  identificationType
  static success: boolean = false;
  U_HBT_MunMed: Uhbt[] = [];
  U_HBT_MedPag: Uhbt[] = [];
  U_HBT_RegTrib: Uhbt[] = [];
  CUSTOMER_GROUP: Uhbt[] = [];
  projects: Uhbt[] = [];
  payTermsGrpCode: Uhbt[] = [];
  salesPersonCode: Uhbt[] = [];
  U_HBT_Nacional: Uhbt[] = [];
  U_HBT_RegFis: Uhbt[] = [];
  

  // @ViewChild('U_HBT_MunMedSelect', { static: true }) U_HBT_MunMedSelectComponent: SearchMatSelectComponent;
  @ViewChildren('U_HBT_Group')
  public UHBTGroup: QueryList<SearchMatSelectComponent>

  private U_HBT_MunMedSelectComponent: SearchMatSelectComponent;
  private U_HBT_MedPagSelectComponent: SearchMatSelectComponent


  constructor(private _lamiService: LamiService,
    public _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private _eventService: EventService,
    private _route: ActivatedRoute) {
    super();
    this.id = this._route.snapshot.params['id'];
  }

  ngAfterViewInit(): void {



  }

  ngOnInit(): void {

    this._eventService.addEvent({ name: 'saveClient', event: this.save.bind(this) });
    this.validations();

    this._lamiService.getU_HBT('SalesPersonCode').subscribe((result: Uhbt[]) => { this.salesPersonCode = result });
    this._lamiService.getU_HBT('PayTermsGrpCode').subscribe((result: Uhbt[]) => { this.payTermsGrpCode = result });
    this._lamiService.getU_HBT('U_HBT_RegTrib').subscribe((result: Uhbt[]) => { this.U_HBT_RegTrib = result });
    this._lamiService.getU_HBT('CUSTOMER_GROUP').subscribe((result: Uhbt[]) => { this.CUSTOMER_GROUP = result });
    this._lamiService.getU_HBT('U_HBT_Nacional').subscribe((result: Uhbt[]) => { this.U_HBT_Nacional = result });
    this._lamiService.getU_HBT('U_HBT_RegFis').subscribe((result: Uhbt[]) => { this.U_HBT_RegFis = result });
    this._lamiService.getU_HBT('U_HBT_MunMed').subscribe((result: Uhbt[]) => { this.U_HBT_MunMed = result });
    this._lamiService.getU_HBT('U_HBT_MedPag').subscribe((result: Uhbt[]) => { this.U_HBT_MedPag = result});
    this._lamiService.getU_HBT('Project').subscribe((result) => this.projects = result);
      
    this._lamiService.identificationTypes$.subscribe((identificationTypes: IdentificationType[]) => {
      this.identificationTypes = identificationTypes;

      if (this.id)
        this.getCusotmer();
    });
  }

  getCusotmer() {
   
    this._lamiService.customer$.subscribe((customer) => {
      this.formGroup.patchValue(customer);
      if(customer.source == 'C')
        this.formGroup.get('source').disable();
    })
  }

  validations() {
    this.formGroup = this._formBuilder.group({
      typeId: [EnumCustomerType.PersonaNatural, Validators.nullValidator], //tipoCliente
      identificationTypeId: [null, Validators.required],
      identification: ['', Validators.required],
      source: ['L', Validators.required],
      name: ['', Validators.nullValidator],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      lastName2: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      project:  ['', Validators.required],
      U_HBT_MunMed: ['', Validators.nullValidator],
      U_HBT_MedPag: ['', Validators.nullValidator],
      U_HBT_RegTrib: ['', Validators.nullValidator],
      groupCode: ['', [Validators.nullValidator, Validators.required]],
      payTermsGrpCode: ['', [Validators.nullValidator, Validators.required]],
      salesPersonCode: ['', [Validators.nullValidator, Validators.required]],
      U_HBT_Nacional: ['', Validators.nullValidator],
      U_HBT_RegFis: ['', Validators.nullValidator],
      firstNameBilling:  ['', Validators.nullValidator],
      lastNameBilling:  ['', Validators.nullValidator],
      lastName2Billing:  ['', Validators.nullValidator],
      checkSameInfo: [false]
    });


    this.formGroup.get('identificationTypeId').valueChanges.subscribe((id) => {

      const identificationType = this.identificationTypes.find((item: any) => item.id == id);
      this.isNIT = identificationType.code == "31" || identificationType.code == "50";
    
      if (this.isNIT) {
        this.formGroup.get('firstName').setValidators([Validators.nullValidator]);
        this.formGroup.get('lastName').setValidators([Validators.nullValidator]);
        this.formGroup.get('lastName2').setValidators([Validators.nullValidator]);
        this.formGroup.get('name').setValidators([Validators.required]);
        this.formGroup.get('typeId').setValue(EnumCustomerType.PersonaJuridica);
        this.formGroup.get('checkSameInfo').reset();
        this.formGroup.get('firstName').reset();
        this.formGroup.get('lastName').reset();
        this.formGroup.get('lastName2').reset();
      }
      else {
        this.formGroup.get('firstName').setValidators([Validators.required]);
        this.formGroup.get('lastName').setValidators([Validators.required]);
        this.formGroup.get('lastName2').setValidators([Validators.required]);
        this.formGroup.get('name').setValidators([Validators.nullValidator]);
        this.formGroup.get('typeId').setValue(EnumCustomerType.PersonaNatural);
        this.formGroup.get('name').reset();
      }

      this.formGroup.get('firstName').updateValueAndValidity();
      this.formGroup.get('lastName').updateValueAndValidity();
      this.formGroup.get('lastName2').updateValueAndValidity();
      this.formGroup.get('name').updateValueAndValidity();

    });

    this.formGroup.get('source').valueChanges.subscribe((value) => {
      this.validateUhtbFields(value);
    });

    this.formGroup.get('firstName').valueChanges.subscribe((value) => {
     if (this.formGroup.get('checkSameInfo').value)
        this.formGroup.get('firstNameBilling').setValue(value);
    });

    this.formGroup.get('lastName').valueChanges.subscribe((value) => {
      if (this.formGroup.get('checkSameInfo').value)
         this.formGroup.get('lastNameBilling').setValue(value);
     });

     this.formGroup.get('lastName2').valueChanges.subscribe((value) => {
      if (this.formGroup.get('checkSameInfo').value)
         this.formGroup.get('lastName2Billing').setValue(value);
     });

    this.formGroup.get('checkSameInfo').valueChanges.subscribe((value) => {

      if (value) {
        this.formGroup.get('firstNameBilling').setValue(this.formGroup.get('firstName').value);
        this.formGroup.get('lastNameBilling').setValue(this.formGroup.get('lastName').value);
        this.formGroup.get('lastName2Billing').setValue(this.formGroup.get('lastName2').value);
        this.formGroup.get('firstNameBilling').disable();
        this.formGroup.get('lastNameBilling').disable();
        this.formGroup.get('lastName2Billing').disable();
      } else {
        this.formGroup.get('firstNameBilling').setValue('');
        this.formGroup.get('lastNameBilling').setValue('');
        this.formGroup.get('lastName2Billing').setValue('');
        this.formGroup.get('firstNameBilling').enable();
        this.formGroup.get('lastNameBilling').enable()
        this.formGroup.get('lastName2Billing').enable()
      }
      
    });
  }

  validateUhtbFields(source: string) {
    if (source == "C") {
      this.getHbtsValues();
      this.formGroup.get('firstNameBilling').setValidators([Validators.required]);
      this.formGroup.get('lastNameBilling').setValidators([Validators.required]);
      this.formGroup.get('lastName2Billing').setValidators([Validators.required]);
      this.formGroup.get('U_HBT_MunMed').setValidators([Validators.required]);
      this.formGroup.get('U_HBT_MedPag').setValidators([Validators.required]);

    } else {
      this.formGroup.get('firstNameBilling').setValidators([Validators.nullValidator]);
      this.formGroup.get('lastNameBilling').setValidators([Validators.nullValidator]);
      this.formGroup.get('lastName2Billing').setValidators([Validators.nullValidator]);
      this.formGroup.get('U_HBT_MunMed').setValidators([Validators.nullValidator]);
      this.formGroup.get('U_HBT_MedPag').setValidators([Validators.nullValidator]);

    }

    this.formGroup.get('U_HBT_MunMed').updateValueAndValidity();
    this.formGroup.get('U_HBT_MedPag').updateValueAndValidity();
    this.formGroup.get('firstNameBilling').updateValueAndValidity();
    this.formGroup.get('lastName2Billing').updateValueAndValidity();
    this.formGroup.get('lastName2').updateValueAndValidity();
  }

  getList(): void {

    this._lamiService.identificationTypes$.subscribe((identificationTypes: IdentificationType[]) => {
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
    console.log('rawValue', this.formGroup.getRawValue())
    console.log('value', this.formGroup.value)
    return this._httpClient.post<any>('/api/customer', this.formGroup.getRawValue()).pipe(
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

  displayClientFields(): void {

  }

  getHbtsValues(): void {

    this._lamiService.getU_HBT('U_HBT_MunMed').subscribe((result: Uhbt[]) => { this.U_HBT_MunMedSelectComponent.loadData(result); });
    this._lamiService.getU_HBT('U_HBT_MedPag').subscribe((result: Uhbt[]) => { this.U_HBT_MedPagSelectComponent.loadData(result); });

  }
}
