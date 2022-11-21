import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
import { NotifyService } from 'app/core/notify/notify.service';
import { CustomerComponent } from 'app/shared/components/customer/customer.component';
import { AsyncCustomValidator } from 'app/shared/validators/async-validator';
import { relativeTimeThreshold } from 'moment';
import { fromEvent, Observable } from 'rxjs';
import { Customer } from '../clients.types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: fuseAnimations
})
export class CustomerDetailsComponent extends BaseForm implements OnInit {

  @ViewChild('customerComponent') customrComponent: CustomerComponent;


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
    
    let data: Customer = this.customrComponent.formGroup.getRawValue();
   
    if (this.customrComponent.formGroup.valid) {
      this.customrComponent.formGroup.disable();
      this.disabledForm = true;
      this.id ? this.update(data) : this.create(data);
    } else {
      this.validateAllFormFields(this.customrComponent.formGroup);
    }
  }

  create(data: any) {

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
      error: ({ error } ) => {
        this._notifyService.dispalyErrorMsg(error.message);
        this.disabledForm = false
        this.customrComponent.formGroup.enable();
      },
      complete: () => {
        
      }
    });
  }

}
