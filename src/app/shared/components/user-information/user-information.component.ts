import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LamiService } from 'app/core/api/lami.service';
import { NotifyService } from 'app/core/notify/notify.service';
import { ROLE, User } from 'app/modules/settings/user/user.types';
import { Type } from 'app/shared/interfaces/setting.types';
import { Uhbt } from 'app/shared/interfaces/UHBT';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {
  @Input() showSaveButton: boolean = false;
  accountForm: FormGroup;
  roles: Type[];
  id: string;
  salesPersonCode: Uhbt[];
  sellerTypes: Uhbt[];
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
      email: [null, Validators.nullValidator],
      phone:  ['', Validators.nullValidator],
      roleId: ['', Validators.required],
      active: [true, Validators.required],
      salesPersonCode: [''],
      sellerTypeId: [''],
    });

    this._lamiService.roleTypes$
      .subscribe((roles: Type[]) => {
        this.roles = roles;
      });

      if(this.id)
      this.getUser();


    this.getSalesPersonCode();

  }

  getUser(){
    this._lamiService.user$.subscribe((user) => {
      this.accountForm.patchValue(user)
      console.log(this.id);

      localStorage.setItem('user_to_edit', this.id);

// llnar una variable del local storage

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

  getSalesPersonCode() {
    this._lamiService.getU_HBT('sales/personcode').subscribe((result: Uhbt[]) => { this.salesPersonCode = result; });

    this._lamiService.getU_HBT('SELLER_TYPE').subscribe((result: Uhbt[]) => { this.sellerTypes = result; });

  }

  nameSalesPerson(item) {

    return item.extendedData?.cities[0] ? `${item.name} (${item.extendedData?.cities[0]})` : item.name;

  }

}

