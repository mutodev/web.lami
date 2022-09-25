import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { BaseForm } from 'app/core/bases/base-form';
import { AsyncCustomValidator } from 'app/shared/validators/async-validator';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: fuseAnimations
})
export class CustomerDetailsComponent extends BaseForm implements OnInit {
  identificationTypes: any[] = [];
  customerType: any[] = [];
  genders: any[] = [];
  formGroup: FormGroup;
  formFieldHelpers: string[] = [''];

  constructor(private _httpService: HttpClient,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router) {
    super();
    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nuevo';
  }


  ngOnInit(): void {
    this.validations();
    this.getList();
  }

  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }


  getList(): void {
    this._httpService.get<any>('/api/list/LIST_CUSTOMER_TYPE,LIST_IDENTIFICATION_TYPE,LIST_GENDER').subscribe((res) => {
      this.identificationTypes = res.data.LIST_IDENTIFICATION_TYPE;
      this.customerType = res.data.LIST_CUSTOMER_TYPE;
      this.genders = res.data.LIST_GENDER;
    });
  }

  validations() {
    this.formGroup = this._formBuilder.group({
      identification_type: [null, Validators.required], //tipoIdentificacion
      type: [null, Validators.required], //tipoCliente
      identification: [
        '',
        Validators.compose([Validators.required]),
        AsyncCustomValidator.existingIdentification(this._httpService)
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

  saveClient() {
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.id ? this.update() : this.create();
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  create() {
    this._httpService.post<any>('/api/customer', this.formGroup.value).subscribe((res) => {
      if (res.status === 'success') {
        this._router.navigateByUrl('/clients');
      } else {

        this.formGroup.enable();
      }
    }, (error) => {
      this.formGroup.enable();
    })
  }

  update() {

  }

}
