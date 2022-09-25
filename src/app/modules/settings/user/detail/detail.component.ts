import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'app/core/bases/base-form';
import { UserInformationComponent } from 'app/shared/components/user-information/user-information.component';
import { UserSecurityComponent } from 'app/shared/components/user-security/user-security.component';
import { ROLE } from '../user.types';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class UserDetailComponent extends BaseForm implements OnInit {
 
  @ViewChild('userSecurity', { static: false }) userSecurityComponent:  UserSecurityComponent;
  @ViewChild('userInformation', { static: false }) userInformationComponent:  UserInformationComponent;

  accountForm: FormGroup;
  isLoading: boolean = false;
  id: string;
  actionName: string;
  

  constructor( private _formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,) { 
    super();
    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nuevo';
    
    
   
  }

  ngOnInit(): void {
    this.accountForm = this._formBuilder.group({
      formInfo    : ['', Validators.required],
      last_name: ['', Validators.required],
      username   : ['', Validators.required],
      role: ['', Validators.required],
      status: [true],
      currentPassword  : [''],
      newPassword      : ['']
  });
  }

  save(){
    if(this.userSecurityComponent.securityForm.valid && this.userInformationComponent.accountForm.valid){
      
    }else{
      this.validateAllFormFields(this.userInformationComponent.accountForm);
      this.validateAllFormFields(this.userSecurityComponent.securityForm);
      
    }
  
  }

}
