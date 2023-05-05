import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'app/core/bases/base-form';
import { NotifyService } from 'app/core/notify/notify.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { rest } from 'lodash';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseForm implements OnInit {



 formGroup  = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    value: new FormControl('')
  });

  id:string;
  actionName: string;
  isLoading: boolean = false;
    disabledForm: boolean = false;
  constructor(private _notifyService: NotifyService,
    private _formBuilder: FormBuilder,
    private _httpService: HttpMethodService,
    private route: ActivatedRoute,) {
    super();
    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nuevo';



  }
  ngOnInit(): void {



    if (this.id) {
      this.getPrice();
    }



  }

  validations() {



  }



  save() {

    console.log("object", this.formGroup);
    this.create();

  }


  async create() {

    if (this.id) {
      const rest = await this._httpService.patch<any>('/prices/'+this.id, this.formGroup.getRawValue());
      console.log("Respuesta", rest);


      this._notifyService.successOrdenAlert(rest.message);

    } else {
      const rest = await this._httpService.post<any>('/prices', this.formGroup.getRawValue());
      console.log("Respuesta", rest);
      this._notifyService.successOrdenAlert(rest.message);


    }



  }

  async getPrice() {


    const rest = await this._httpService.get<any>('/prices/'+this.id);
     console.log("Respuesta", rest);

     this.formGroup.controls.code.setValue(rest.data['code']);
     this.formGroup.controls.name.setValue(rest.data['name']);
     this.formGroup.controls.value.setValue(rest.data['value']);

   }


}
