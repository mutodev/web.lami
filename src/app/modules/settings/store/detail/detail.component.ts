import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'app/core/notify/notify.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class StoreDetailComponent implements OnInit {

  formGroup  = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    city: new FormControl(''),
  });

  id:string;
  actionName: string;
  isLoading: boolean = false;
  disabledForm: boolean = false;
  constructor(private _notifyService: NotifyService,
    private _httpService: HttpMethodService, private _formBuilder: FormBuilder,
    private route: ActivatedRoute,) {
    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nueva';



  }
  ngOnInit(): void {

    if (this.id) {
      this.getStore();
    }

  }

  save() {

    console.log("object", this.formGroup);
    this.create();

  }


  async create() {

    if (this.id) {
      console.log("Sent",this.formGroup.getRawValue());
      const rest = await this._httpService.patch<any>('/store/'+this.id, this.formGroup.getRawValue());
      console.log("Respuesta", rest);
      this._notifyService.successOrdenAlert(rest.message);
    } else {
      const rest = await this._httpService.post<any>('/store', this.formGroup.getRawValue());
      console.log("Respuesta", rest);
      this._notifyService.successOrdenAlert(rest.message);
    }


   }

   async getStore() {


    const rest = await this._httpService.get<any>('/store/'+this.id);
     console.log("Respuesta", rest);

     this.formGroup.controls.code.setValue(rest.data['code']);
     this.formGroup.controls.name.setValue(rest.data['name']);
     this.formGroup.controls.phoneNumber.setValue(rest.data['phoneNumber']);
     this.formGroup.controls.email.setValue(rest.data['email']);
     this.formGroup.controls.city.setValue(rest.data['city']);
     this.formGroup.controls.address.setValue(rest.data['address']);

   }


}
