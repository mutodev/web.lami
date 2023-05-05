import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class PqrDetailComponent implements OnInit {

  formGroup  = new FormGroup({
    type: new FormControl(''),
    identificationTypeId: new FormControl(''),
    identification: new FormControl(''),
    customerId : new FormControl(''),
    title : new FormControl(''),
    name : new FormControl(''),
    descripction : new FormControl(''),
    celular : new FormControl(''),
    email : new FormControl(''),
    OrderDetailId : new FormControl('')
  });


  id:string;
  actionName: string;
  isLoading: boolean = false;
  disabledForm: boolean = false;
  /*
  {
    "type": "string",
    "identificationTypeId": "string",
    "identification": "string",
    "customerId": "string",
    "title": "string",
    "name": "string",
    "descripction": "string",
    "celular": "string",
    "email": "string",
    "OrderDetailPqrs": [
      {
        "OrderDetailId": "string"
      }
    ]
*/

  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,) {

      this.id = this.route.snapshot.params['id'];
      this.actionName = this.id ? 'Editar' : 'Nueva';

    }

  ngOnInit(): void {

  }
 save():void{

  }

}
