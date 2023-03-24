import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseValidators } from '@fuse/validators';
import { NotifyService } from 'app/core/notify/notify.service';
import { HttpMethodService } from 'app/core/services/http-method.service';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html'
})
export class UserSecurityComponent implements OnInit {
  securityForm: FormGroup;
  @Input() showSaveButton: boolean = false;
  @Input() passwordLabel: string = 'Contraseña';
  @Input() confirPasswordLabel: string = 'Confirmar Contraseña';
  user: any;

  constructor(private _formBuilder: FormBuilder,
    private httpService: HttpMethodService,
    private _notifyService: NotifyService) { }

  ngOnInit(): void {

    // Create the form
    this.securityForm = this._formBuilder.group({
      password: ['', [Validators.required, FuseValidators.passwordStrengthValidator]],
      passwordConfirm: ['', Validators.required]
    },
      {
        validators: FuseValidators.mustMatch('password', 'passwordConfirm')
      });

      this.user = JSON.parse(localStorage.getItem('user'));
  }

  async save() {
    if (this.securityForm.valid) {
      let result = await this.httpService.patch(`/user/${this.user.id}/update-password`, {password: this.securityForm.controls.password.value});
      if (result.status === 'success') {
        this._notifyService.successAlert(result.message);
        this.securityForm.reset();
      }
    }
    
  }

}
