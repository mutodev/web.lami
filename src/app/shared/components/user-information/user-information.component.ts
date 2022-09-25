import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ROLE } from 'app/modules/settings/user/user.types';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {
  @Input() showSaveButton: boolean = false;
  accountForm: any;
  roles = ROLE

  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
     // Create the form
     this.accountForm = this._formBuilder.group({
      name    : ['', Validators.required],
      last_name: ['', Validators.required],
      username   : ['', Validators.required],
      status   : [true],
      role: ['', Validators.required]
  })
}

}

