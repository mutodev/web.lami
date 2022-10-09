import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseValidators } from '@fuse/validators';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html'
})
export class UserSecurityComponent implements OnInit {
  securityForm: FormGroup;
  @Input() showSaveButton: boolean = false;
  @Input() passwordLabel: string = 'Contraseña';
  @Input() confirPasswordLabel: string = 'Confirmar Contraseña';


  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

     // Create the form
     this.securityForm = this._formBuilder.group({
      password  : ['', [Validators.required, FuseValidators.passwordStrengthValidator]],
      passwordConfirm      : ['', Validators.required]
  },
  {
      validators: FuseValidators.mustMatch('password', 'passwordConfirm')
  });
  }

}
