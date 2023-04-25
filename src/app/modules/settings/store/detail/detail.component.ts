import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class StoreDetailComponent implements OnInit {

  storeForm: FormGroup;
  id:string;
  actionName: string;
  isLoading: boolean = false;
  constructor( private _formBuilder: FormBuilder,
    private route: ActivatedRoute,) {
    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nueva';



  }
  ngOnInit(): void {

  }

  save(){}

}
