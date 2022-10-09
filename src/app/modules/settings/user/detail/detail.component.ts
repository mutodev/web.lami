import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LamiService } from 'app/core/api/lami.service';
import { BaseForm } from 'app/core/bases/base-form';
import { NotifyService } from 'app/core/notify/notify.service';
import { UserInformationComponent } from 'app/shared/components/user-information/user-information.component';
import { UserSecurityComponent } from 'app/shared/components/user-security/user-security.component';
import { Type } from 'app/shared/interfaces/setting.types';
import { update } from 'lodash';
import { ROLE } from '../user.types';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class UserDetailComponent extends BaseForm implements OnInit {

  @ViewChild('userSecurity', { static: false }) userSecurityComponent: UserSecurityComponent;
  @ViewChild('userInformation', { static: false }) userInformationComponent: UserInformationComponent;


  isLoading: boolean = false;
  id: string;
  actionName: string;


  constructor(private _formBuilder: UntypedFormBuilder, private _lamiService: LamiService,
    private _notifyService: NotifyService,
    private _router: Router,
    private route: ActivatedRoute,) {
    super();
    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nuevo';
  }

  ngOnInit(): void {

  }
 

  save() {
   
    
    if (this.userSecurityComponent.securityForm.valid && this.userInformationComponent.accountForm.valid) {

      this.userSecurityComponent.securityForm.removeControl('passwordConfirm');
      console.log('this.userSecurityComponent.securityForm :>> ', this.userSecurityComponent.securityForm.value);
      this.userInformationComponent.accountForm.disable();
      this.userSecurityComponent.securityForm.disable();
      this.disabledForm = true;
      this.id ? this.update() : this.create();
    } else {
      this.validateAllFormFields(this.userInformationComponent.accountForm);
      this.validateAllFormFields(this.userSecurityComponent.securityForm);

    }
  }

  update(): void {

    this._lamiService.updateUser(this.id, { ...this.userInformationComponent.accountForm.value, ...this.userSecurityComponent.securityForm.value })
      .subscribe({
        next: (result: any) => {
          console.log('result :>> ', result);
          this._router.navigateByUrl('/settings/user/all');
        },
        error: (error) => this._notifyService.error500(error),
        complete: () => {
          this.userInformationComponent.accountForm.enable();
          this.userSecurityComponent.securityForm.enable();
          this.disabledForm = false;
        }
      });

  }

  create(): void {
    this._lamiService.createUser({ ...this.userInformationComponent.accountForm.value, ...this.userSecurityComponent.securityForm.value })
      .subscribe({
        next: (result) => {
         this._router.navigateByUrl('/settings/user/all');
         this._notifyService.successAlert(result.message);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this._notifyService.showError(errorResponse);
          this.userInformationComponent.accountForm.enable();
          this.userSecurityComponent.securityForm.enable();
          this.disabledForm = false;
        },
        complete: () => {}
      })
  }

}
