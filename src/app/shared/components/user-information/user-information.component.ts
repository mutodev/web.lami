import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LamiService } from 'app/core/api/lami.service';
import { NotifyService } from 'app/core/notify/notify.service';
import { ROLE, User } from 'app/modules/settings/user/user.types';
import { Type } from 'app/shared/interfaces/setting.types';


@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {
  @Input() showSaveButton: boolean = false;
  accountForm: FormGroup;
  roles: Type[];
  id: string;

  constructor(private _formBuilder: FormBuilder, private _lamiService: LamiService,
    private _route: ActivatedRoute,private _notifyService: NotifyService,
    private _router: Router,
    ) { 
      this.id = this._route.snapshot.params['id'];
    }

  ngOnInit(): void {

    this.accountForm = this._formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.nullValidator],
      phone:  ['', Validators.nullValidator],
      roleId: ['', Validators.required],
      active: [true, Validators.required]
    });

    this._lamiService.roleTypes$
      .subscribe((roles: Type[]) => {
        this.roles = roles;
      });

      if(this.id)
        this.getUser();

  }

  getUser(){
    this._lamiService.user$.subscribe((user) => {
      this.accountForm.patchValue(user)

    })
  }

  save(){
    if(this.id)
      this.update();
  }


  update(): void {
    this._lamiService.updateUser(this.id,  this.accountForm.value).subscribe({
      next: (result)=>{
        this._notifyService.successAlert("Registro actualizado.")
        this._router.navigateByUrl('/settings/user/all');
      },
      error:(error) =>  this._notifyService.showError(error)
    })
  }

}

