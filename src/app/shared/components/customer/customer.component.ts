import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'app/core/api/event/event.service';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
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
  identificationTypes: any[] = [];
  customerType: any[] = [];
  genders: any[] = [];
  customerComponent = CustomerComponent;
  static success: boolean = false;

  constructor(private _lamiService: LamiService,
    public _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private _eventService: EventService) {
    super();
  }

  ngOnInit(): void {
    this._eventService.addEvent({ name: 'saveClient', event: this.save.bind(this) });
    this.validations();
    this.getList();

  }

  validations() {
    this.formGroup = this._formBuilder.group({
      identification_type: [null, Validators.required], //tipoIdentificacion
      type: [null, Validators.required], //tipoCliente
      identification: [
        '',
        Validators.compose([Validators.required]),
        AsyncCustomValidator.existingIdentification(this._httpClient)
      ], //identificacionß
      business_name: [''],
      last_name: [null, Validators.required], //apellido1
      first_name: [null, Validators.required],//nombre
      birth_date: [null, Validators.nullValidator],// fechaNacimiento
      state: [null, [Validators.nullValidator, Validators.nullValidator]],//departamento
      city: [null, Validators.nullValidator], //ciudad
      neighborhood: [''], //barrio " "
      address1: [null, Validators.nullValidator], // direccion1,
      address2: [''], // direccion2 la ciudad,
      address3: [' '], // direccion3 default" "
      email: [null, [
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ]],
      cell_phone: [null, Validators.nullValidator], //string
      gender: [null, Validators.nullValidator], //sexo
    }, { updateOn: 'blur' });

  }

  getList(): void {
    this._httpClient.get<any>('/api/list/LIST_CUSTOMER_TYPE,LIST_IDENTIFICATION_TYPE,LIST_GENDER').subscribe((res) => {
      this.identificationTypes = res.data.LIST_IDENTIFICATION_TYPE;
      this.customerType = res.data.LIST_CUSTOMER_TYPE;
      this.genders = res.data.LIST_GENDER;
    });
  }

  save(): Observable<any> {
    if (this.formGroup.valid) {
      this.formGroup.disable();
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
          alert(res.message);
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
