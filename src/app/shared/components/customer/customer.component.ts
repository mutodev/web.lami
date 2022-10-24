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
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseForm implements OnInit, AfterViewInit {

  formGroup: FormGroup;
  customerType: any[] = [];
  genders: any[] = [];
  isNIT:boolean= false;
  customerComponent = CustomerComponent;
  identificationTypes: IdentificationType[] = [];
  identificationType
  static success: boolean = false;
  U_HBT_MunMed: Uhbt[] = [];
  U_HBT_MedPag: Uhbt[]  = [];


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

   this.UHBTGroup.changes.subscribe(comps=>{
    this.U_HBT_MunMedSelectComponent =  comps.find((p: any) => p.id == 'U_HBT_MunMed');
    this.U_HBT_MedPagSelectComponent =  comps.find((p: any) => p.id == 'U_HBT_MedPag');
    console.log('this.U_HBT_MedPagSelectComponent', this.U_HBT_MedPagSelectComponent)
  
   })

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
      source: ['L', Validators.nullValidator],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      lastName2: ['', Validators.required],
      companyName:  ['', Validators.nullValidator],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      U_HBT_MunMed: ['', Validators.nullValidator],
      U_HBT_MedPag: ['', Validators.nullValidator],
    });


    this.formGroup.get('identificationTypeId').valueChanges.subscribe((id)=>{
        const identificationType = this.identificationTypes.find((item:any)=>item.id ==id);
        if (identificationType.code == "31" || identificationType.code == "50" ){
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

    this.formGroup.get('source').valueChanges.subscribe((value)=>{
      this.validateUhtbFields(value);       
  });   
  }

  validateUhtbFields(source:string){
    if (source == "C" ){
      this.getHbtsValues();
      this.formGroup.get('U_HBT_MunMed').setValidators([Validators.required]);
      this.formGroup.get('U_HBT_MedPag').setValidators([Validators.required]);
      this.formGroup.get('U_HBT_MunMed').updateValueAndValidity();
      this.formGroup.get('U_HBT_MedPag').updateValueAndValidity();
    }else {
      this.formGroup.get('U_HBT_MunMed').setValidators([Validators.nullValidator]);
      this.formGroup.get('U_HBT_MedPag').setValidators([Validators.nullValidator]);
      this.formGroup.get('U_HBT_MunMed').updateValueAndValidity();
      this.formGroup.get('U_HBT_MedPag').updateValueAndValidity();
    }
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

  displayClientFields():void {

  }

  getHbtsValues(): void {
    // this.U_HBT_MunMedSelectComponent.bankCtrl.setValidators([Validators.required]);
    // this.U_HBT_MunMedSelectComponent.bankCtrl.updateValueAndValidity();
    // this.formGroup.setControl('U_HBT_MunMed',this.U_HBT_MunMedSelectComponent.bankCtrl);
    
    this._lamiService.getU_HBT('U_HBT_MunMed').subscribe((result:Uhbt[])=>{ this.U_HBT_MunMedSelectComponent.loadData(result); });
    this._lamiService.getU_HBT('U_HBT_MedPag').subscribe((result:Uhbt[])=>{ this.U_HBT_MedPagSelectComponent.loadData(result);  });
  }

}
