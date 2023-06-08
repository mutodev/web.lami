import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
import { NotifyService } from 'app/core/notify/notify.service';
import { CustomerComponent } from 'app/shared/components/customer/customer.component';
import { Customer } from '../clients.types';
import forEach from 'lodash-es/forEach';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: fuseAnimations
})
export class CustomerDetailsComponent extends BaseForm implements OnInit {

  @ViewChild('customerComponent') customrComponent: CustomerComponent;
  filds: any = [];
  id: string;


  constructor(private route: ActivatedRoute,
    private _lamiService: LamiService,
    private _router: Router,
    private _notifyService: NotifyService) {
    super();
    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nuevo';
  }



  ngOnInit(): void {



  }


  save() {

    this.filds = this.customrComponent.formGroup.controls;
    let error_fields = [];
    console.log("controsl", this.filds);
    //Recorrer los errores mostrar las alertas y dalr foco al primero despues de cerrar
    forEach(this.filds, function (value, key) {
      /* do something for all key: value pairs */
      if (value['status'] === "INVALID") {
        console.log(value['status'] + "|" + key); // 👉️ atributo, estatus
        error_fields.push(key);
      }

    });

    console.log("focus", error_fields[0]);

    let data: Customer = this.customrComponent.formGroup.getRawValue();

    if (this.customrComponent.formGroup.valid) {
      this.customrComponent.formGroup.disable();
      this.disabledForm = true;
      this.id ? this.update(data) : this.create(data);
    } else {
      document.getElementById(error_fields[0]).focus();
      this.validateAllFormFields(this.customrComponent.formGroup);
      document.getElementById(error_fields[0]).focus();
    }


  }

  create(data: any) {
    console.log(data, "Información enviada");
    this._lamiService.createCustomer(data).subscribe({
      next: (result) => {
        this._router.navigateByUrl('/contact/customer/all');
        this._notifyService.successAlert(result.message);
      },
      error: ({ error }) => {
        this._notifyService.dispalyErrorMsg(error.message);
        this.disabledForm = false
        this.customrComponent.formGroup.enable();
      },
      complete: () => {
        this.disabledForm = false
        this.customrComponent.formGroup.enable();
      }
    });
  }

  update(data: any) {
    this._lamiService.updateCustomer(this.id, data).subscribe({
      next: (result) => {
        this._router.navigateByUrl('/contact/customer/all');
        this._notifyService.successAlert("Registro actualiazado sastifactoriamente.");
      },
      error: ({ error }) => {
        this._notifyService.dispalyErrorMsg(error.message);
        this.disabledForm = false
        this.customrComponent.formGroup.enable();
      },
      complete: () => {

      }
    });
  }

}
