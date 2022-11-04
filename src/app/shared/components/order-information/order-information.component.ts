import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LamiService } from 'app/core/api/lami.service';
import { Uhbt } from 'app/shared/interfaces/UHBT';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'ci-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {

  dateNow = new Date();
  validityDate = new Date().setDate(this.dateNow.getDate() + 10);
  salesPersonCode: Uhbt[] = [];
  formGroup: FormGroup;
  constructor(private _lamiService: LamiService,  private _formBuilder: FormBuilder) { }

   

  ngOnInit(): void {
   

    this.formGroup = this._formBuilder.group({
      salesPersonCode: ['', Validators.required]
    });
    this._lamiService.getU_HBT('SalesPersonCode').subscribe((result: Uhbt[]) => { this.salesPersonCode = result });
  }

  get date(){
    return moment(this.dateNow).format('YYYY-MM-DD');
  }

  get dueDate(){
    return moment(this.validityDate).format('YYYY-MM-DD');
  }

  get salesPerson() {
    return this.formGroup.get('salesPersonCode');
  }


}
