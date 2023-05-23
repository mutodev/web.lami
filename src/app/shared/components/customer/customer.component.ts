import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Directive, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'app/core/api/event/event.service';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
import { items } from 'app/mock-api/apps/file-manager/data';
import { IdentificationType } from 'app/modules/contact/customer/clients.types';
import { SearchMatSelectComponent } from 'app/shared/controls/custom-mat-select/search-mat-select.component';
import { Uhbt } from 'app/shared/interfaces/UHBT';
import { Neighborhood } from 'app/shared/interfaces/Neighborhood';

import { AsyncCustomValidator } from 'app/shared/validators/async-validator';
import { result } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { ErrorStateMatcher } from '@angular/material/core';


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
  U_HBT_ResFis: Uhbt[] = [];
  COUNTIES: Uhbt[] = [];
  Neighborhood: Neighborhood[] = [];
  CITIESTEMP: Uhbt[] = [];
  CITIES: Uhbt[] = [];
  Barrios: Uhbt[] = [];
  neighborhoodName = '';
  COUNTIESBILLING: Uhbt[] = [];
  CITIESBILLING: Uhbt[] = [];
  U_HBT_ActEco: Uhbt[] = [];
  // @ViewChild('U_HBT_MunMedSelect', { static: true }) U_HBT_MunMedSelectComponent: SearchMatSelectComponent;
  @ViewChildren('U_HBT_Group')
  public UHBTGroup: QueryList<SearchMatSelectComponent>
  state: any;
  city: any;

  matcher = new ErrorStateMatcher();
  // private U_HBT_MunMedSelectComponent: SearchMatSelectComponent;
  // private U_HBT_MedPagSelectComponent: SearchMatSelectComponent


  constructor(private _lamiService: LamiService,
    private _httpService: HttpMethodService,
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

    this.state = null;
    this.city = null;
    this.Barrios = null;

    this._eventService.addEvent({ name: 'saveClient', event: this.save.bind(this) });
    this.validations();

    this._lamiService.getU_HBT('SalesPersonCode').subscribe((result: Uhbt[]) => { this.salesPersonCode = result });
    this._lamiService.getU_HBT('PayTermsGrpCode').subscribe((result: Uhbt[]) => { this.payTermsGrpCode = result });
    this._lamiService.getU_HBT('U_HBT_RegTrib').subscribe((result: Uhbt[]) => { this.U_HBT_RegTrib = result });
    this._lamiService.getU_HBT('CUSTOMER_GROUP').subscribe((result: Uhbt[]) => { this.CUSTOMER_GROUP = result });
    this._lamiService.getU_HBT('U_HBT_Nacional').subscribe((result: Uhbt[]) => { this.U_HBT_Nacional = result });
    this._lamiService.getU_HBT('U_HBT_RegFis').subscribe((result: Uhbt[]) => { this.U_HBT_RegFis = result });
    // this._lamiService.getU_HBT('U_HBT_ResFis').subscribe((result: Uhbt[]) => { this.U_HBT_ResFis = result });
    // this._lamiService.getU_HBT('U_HBT_MunMed').subscribe((result: Uhbt[]) => { this.U_HBT_MunMed = result });
    this._lamiService.getU_HBT('U_HBT_ActEco').subscribe((result: Uhbt[]) => { this.U_HBT_ActEco = result });
    this._lamiService.getU_HBT('U_HBT_MedPag').subscribe((result: Uhbt[]) => { this.U_HBT_MedPag = result });
    this._lamiService.getU_HBT('Project').subscribe(
      (result) => this.projects =

      result.sort(function (x, y) {
        let a = x.name.toUpperCase(),
            b = y.name.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
    })


    );
    this._lamiService.getU_HBT('IDENTIFICATION_TYPE').subscribe((result) => {
      this.identificationTypes = result;
      if (this.id)
        this.getCusotmer();
    });

    this._lamiService.getU_HBT('CITIES').subscribe((result) => {
      this.CITIESTEMP = result;
      if (this.formGroup.controls.County.value) this.CITIES = this.CITIESTEMP.filter((a) => a.value == this.formGroup.controls.County.value);
      if (this.formGroup.controls.CountyBilling.value) this.CITIESBILLING = this.CITIESTEMP.filter((a) => a.value == this.formGroup.controls.CountyBilling.value);

    });




    this._lamiService.getU_HBT('County').subscribe((result) => { this.COUNTIES = result; this.COUNTIESBILLING = [...result]; });

    // this._lamiService.identificationTypes$.subscribe((identificationTypes: IdentificationType[]) => {
    //   // this.identificationTypes = identificationTypes;

    //   // if (this.id)
    //   //   this.getCusotmer();
    // });

    this.formGroup.controls.County.valueChanges.subscribe((val) => {
      // this.formGroup.controls.City.setValue('');
      this.CITIES = this.CITIESTEMP.filter((a) => a.value == val);

      // this.Barrios = null;


      const checkSameAddress = this.formGroup.controls.checkSameAddress.value;
      if (checkSameAddress) this.formGroup.controls.CountyBilling.setValue(val);

    });

    this.formGroup.controls.City.valueChanges.subscribe((val) => {

      this.state = this.formGroup.controls.County.value;
      this.city = this.formGroup.controls.City.value;
      // this.Barrios = null;
      console.log("Ciudad seleccionada", this.city);
      console.log("Departamento seleccionado", this.state);

      if (val) {
        this.getbarrios(val);
      }

      // if (this.state && this.city) {
      //   // this.Barrios = null;
      //   this.formGroup.controls.neighborhoodName.setValue("");
      //   this.getbarrios(this.state, this.city);
      // }

      const checkSameAddress = this.formGroup.controls.checkSameAddress.value;

      if (checkSameAddress) this.formGroup.controls.CityBilling.setValue(val);

    });

    this.formGroup.controls.CountyBilling.valueChanges.subscribe((val) => {
      // this.formGroup.controls.CityBilling.setValue('');

      this.CITIESBILLING = this.CITIESTEMP.filter((a) => a.value == val);
    });




    console.log(this.projects);
  }


  async getbarrios(city: string) {

    if (this.formGroup.controls.County.value) {
        const rest = await this._httpService.get<any>(`/neighborhood/find-by-city-and-state/${this.formGroup.controls.County.value}/${city}`);

        this.Barrios = rest.data;
        this.formGroup.controls.neighborhoodName.setValue(this.neighborhoodName);
        // this.neighborhoodName = '';
        console.log('barrios', rest);
        console.log('token', localStorage.getItem('accessToken'));

    }

  }

  getCusotmer() {

    this._lamiService.customer$.subscribe((customer) => {
      this.neighborhoodName = customer.neighborhoodName || ''
      this.formGroup.patchValue(customer);

      if (customer.source == 'C')
        this.formGroup.get('source').disable();
    })
  }

  validations() {


    const user = JSON.parse(localStorage.getItem('user'));
    let selesPersonCode = '';
    selesPersonCode = user.salesPersonCode;
    /*
    if (user.sellerTypeId !== '1aa1acf5-7b5b-11ed-b8b2-93cfa5187c2a') {
    if (!this.id && user.sellerTypeId !== '1aa1acf5-7b5b-11ed-b8b2-93cfa5187c2a') {
      selesPersonCode = user.salesPersonCode;
    }*/
    this.formGroup = this._formBuilder.group({
      typeId: [EnumCustomerType.PersonaNatural, Validators.nullValidator], //tipoCliente
      identificationTypeId: ['7974094a-46c0-11ed-88f1-7b765a5d50e1', Validators.required],
      identification: [''],
      source: ['C', Validators.required],
      name: [''],
      firstName: ['', [Validators.required, Validators.nullValidator]],
      lastName: ['', [Validators.required, Validators.nullValidator]],
      lastName2: ['', [Validators.required, Validators.nullValidator]],
      address: ['', Validators.required],
      address2: [''],
      neighborhoodName: [''],
      neighborhoodNameBilling: [''],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      phone2: ['', [Validators.pattern("^[0-9]+$")]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      project: ['', Validators.required],
      // U_HBT_MunMed: ['', Validators.nullValidator],
      U_HBT_MedPag: ['1', Validators.nullValidator],
      U_HBT_RegTrib: ['NR', Validators.nullValidator],
      groupCode: ['', [Validators.nullValidator, Validators.required]],
      payTermsGrpCode: ['', [Validators.nullValidator, Validators.required]],
      salesPersonCode: [selesPersonCode, [Validators.nullValidator, Validators.required]],
      U_HBT_Nacional: ['1', Validators.nullValidator],
      U_HBT_RegFis: ['49', Validators.nullValidator],
      // U_HBT_ResFis: ['', Validators.nullValidator],
      firstNameBilling: [''],
      lastNameBilling: [''],
      lastName2Billing: [''],
      checkSameInfo: [false],
      County: ['', [Validators.nullValidator, Validators.required]],
      City: ['', [Validators.nullValidator, Validators.required]],
      CityBilling: [''],
      CountyBilling: [''],
      addressBilling: [''],
      checkSameAddress: [false],
      U_HBT_ActEco: ['']
    });


    this.formGroup.get('identificationTypeId').valueChanges.subscribe((id) => {

      const identificationType = this.identificationTypes?.find((item: any) => item.id == id);
      this.isNIT = identificationType.code == "31" || identificationType.code == "50";

      if (this.isNIT) {
        this.formGroup.get('identification').setValidators([Validators.required, Validators.pattern("^[0-9]+-[0-9]{1}$|^CL-[0-9]+-[0-9]{1}$")]);
        this.formGroup.get('name').setValidators([Validators.required]);

        this.formGroup.get('typeId').setValue(EnumCustomerType.PersonaJuridica);
        this.formGroup.get('checkSameInfo').reset();
        this.formGroup.get('firstName').clearValidators();
        this.formGroup.get('lastName').clearValidators();
        this.formGroup.get('lastName2').clearValidators();
        this.formGroup.get('U_HBT_ActEco').setValidators([Validators.nullValidator]);
        this.formGroup.controls.U_HBT_RegTrib.setValue('NR'); // por defecto no responsable de iva

        if (this.formGroup.get('source').value === 'C') {
          this.formGroup.get('firstNameBilling').clearValidators();
          this.formGroup.get('lastNameBilling').clearValidators();
          this.formGroup.get('lastName2Billing').clearValidators();
        }

      }
      else {

        this.formGroup.get('identification').setValidators([Validators.required, Validators.pattern("^[0-9]+$|^CL-[0-9]+$")]);
        this.formGroup.get('firstName').setValidators([Validators.required, Validators.nullValidator]);
        this.formGroup.get('lastName').setValidators([Validators.required, Validators.nullValidator]);
        this.formGroup.get('lastName2').setValidators([Validators.required, Validators.nullValidator]);
        this.formGroup.get('name').clearAsyncValidators();
        this.formGroup.get('typeId').setValue(EnumCustomerType.PersonaNatural);


        if (this.formGroup.get('source').value === 'C') {
          this.formGroup.get('firstNameBilling').setValidators([Validators.required]);
          this.formGroup.get('lastNameBilling').setValidators([Validators.required]);
          this.formGroup.get('lastName2Billing').setValidators([Validators.required]);
        } else {
          this.formGroup.get('firstNameBilling').clearValidators();
          this.formGroup.get('lastNameBilling').clearValidators();
          this.formGroup.get('lastName2Billing').clearValidators();
        }

        this.formGroup.get('name').reset();
        this.formGroup.get('U_HBT_ActEco').reset();
      }

      this.formGroup.get('identification').updateValueAndValidity();
      this.formGroup.get('firstName').updateValueAndValidity();
      this.formGroup.get('lastName').updateValueAndValidity();
      this.formGroup.get('lastName2').updateValueAndValidity();
      this.formGroup.get('name').updateValueAndValidity();
      this.formGroup.get('U_HBT_ActEco').updateValueAndValidity();
      this.formGroup.get('firstNameBilling').updateValueAndValidity();
      this.formGroup.get('lastNameBilling').updateValueAndValidity();
      this.formGroup.get('lastName2Billing').updateValueAndValidity();

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
        if (!this.id) {
          this.formGroup.get('firstNameBilling').setValue('');
          this.formGroup.get('lastNameBilling').setValue('');
          this.formGroup.get('lastName2Billing').setValue('');
          this.formGroup.get('firstNameBilling').enable();
          this.formGroup.get('lastNameBilling').enable()
          this.formGroup.get('lastName2Billing').enable()
        }
      }

    });


    this.formGroup.controls.checkSameAddress.valueChanges.subscribe((val) => {
      if (val) {
        this.formGroup.controls.CountyBilling.setValue(this.formGroup.controls.County.value);
        this.formGroup.controls.CityBilling.setValue(this.formGroup.controls.City.value);
        this.formGroup.controls.addressBilling.setValue(this.formGroup.controls.address.value);

        this.formGroup.controls.neighborhoodNameBilling.setValue(this.formGroup.controls.neighborhoodName.value);



      } else {
        if (!this.id) {
          this.formGroup.controls.CountyBilling.setValue('');
          this.formGroup.controls.CityBilling.setValue('');
          this.formGroup.controls.neighborhoodNameBilling.setValue('');
        }
      }
    });
  }

  validateUhtbFields(source: string) {


    if (source == "C") {
      this.getHbtsValues();

      if (this.formGroup.get('typeId').value === EnumCustomerType.PersonaNatural) {
        this.formGroup.get('firstNameBilling').setValidators([Validators.required]);
        this.formGroup.get('lastNameBilling').setValidators([Validators.required]);
        this.formGroup.get('lastName2Billing').setValidators([Validators.required]);
      } else {
        this.formGroup.get('firstNameBilling').clearValidators();
        this.formGroup.get('lastNameBilling').clearValidators();
        this.formGroup.get('lastName2Billing').clearValidators();
      }

      this.formGroup.get('CountyBilling').setValidators([Validators.required]);
      this.formGroup.get('CityBilling').setValidators([Validators.required]);

    } else {

      this.formGroup.get('firstNameBilling').clearValidators();
      this.formGroup.get('lastNameBilling').clearValidators();
      this.formGroup.get('lastName2Billing').clearValidators();
      this.formGroup.get('CountyBilling').clearValidators();
      this.formGroup.get('CityBilling').clearValidators();

    }
    this.formGroup.get('CountyBilling').updateValueAndValidity();
    this.formGroup.get('CityBilling').updateValueAndValidity();
    this.formGroup.get('firstNameBilling').updateValueAndValidity();
    this.formGroup.get('lastName2Billing').updateValueAndValidity();
    this.formGroup.get('lastName2').updateValueAndValidity();




  }

  getList(): void {

    // this._lamiService.identificationTypes$.subscribe((identificationTypes: IdentificationType[]) => {
    //   this.identificationTypes = identificationTypes;
    // })

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
    return this._httpService.postObservable<any>('/customer', this.formGroup.getRawValue()).pipe(
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

    // this._lamiService.getU_HBT('U_HBT_MunMed').subscribe((result: Uhbt[]) => { this.U_HBT_MunMedSelectComponent.loadData(result); });
    // this._lamiService.getU_HBT('U_HBT_MedPag').subscribe((result: Uhbt[]) => { this.U_HBT_MedPagSelectComponent.loadData(result); });

  }

}
