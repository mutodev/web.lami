import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'settings-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  accountForm: UntypedFormGroup;
  constructor( private _formBuilder: UntypedFormBuilder) { 
   
  }

  ngOnInit(): void {
     // Create the form
     this.accountForm = this._formBuilder.group({
      name    : ['', Validators.required],
      last_name: ['', Validators.required],
      username   : ['', Validators.required],
      role: ['', Validators.required]
  });
  }

}
