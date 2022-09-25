import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html'
})
export class UserSecurityComponent implements OnInit {
  securityForm: any;
  @Input() showSaveButton: boolean = false;
  @Input() passwordLabel: string = 'Contraseña';
  @Input() confirPasswordLabel: string = 'Confirmar Contraseña';


  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('showSaveButton :>> ', this.showSaveButton);
     // Create the form
     this.securityForm = this._formBuilder.group({
      password  : ['', Validators.required],
      confirmPassword      : ['', Validators.required]
  });
  }

}
