import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class OrderInformationComponent implements OnInit, AfterContentChecked, OnChanges {

  dateNow = new Date();
  validityDate = new Date().setDate(this.dateNow.getDate() + 10);
  salesPersonCode: Uhbt[] = [];
  formGroup: FormGroup;
  @Input('estimatedDate') estimatedDate: string;
  Series: Uhbt[] = [];
  current_sales_person_code: string;
  @Input()
  order: any = {};
  @Input()
  idRecord: string;
  constructor(private _lamiService: LamiService,
              private _formBuilder: FormBuilder,
              private cdRef : ChangeDetectorRef) {
                this.formGroup = this._formBuilder.group({
                  salesPersonCode: ['', Validators.required],
                  serie:  ['', Validators.required],
                });
              }

  ngOnInit(): void {

    this.current_sales_person_code = localStorage.getItem('user_salesPerson');

    this.formGroup.controls.salesPersonCode.setValue(this.current_sales_person_code);

    console.log('jhkjkjk', this.idRecord, this.order)
    if (!this.idRecord) {
      this._lamiService.getU_HBT('SalesPersonCode').subscribe((result: Uhbt[]) => {
        this.salesPersonCode = result.map((item: any) => {
          return {...item, city: item.extendedData?.cities[0]};
        });
      });
      this._lamiService.getU_HBT('SERIES').subscribe((result: Uhbt[]) => { this.Series = result });
    }

  }


  get date(){
    return moment(this.order?.date || this.dateNow).format('YYYY-MM-DD');
  }

  get dueDate(){
    return moment(this.order?.dueDate || this.validityDate).format('YYYY-MM-DD');
  }

  get getEstimatedDate(){
    return moment(this.order?.estimatedDate).format('YYYY-MM-DD');
  }

  get salesPerson() {
    return this.formGroup.get('salesPersonCode');

  }

  get serie() {
    return this.formGroup.get('serie');
  }

  ngAfterContentChecked() : void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.order && changes.order.currentValue) {
      this.order = changes.order.currentValue;
      if (this.idRecord) {
        this._lamiService.getU_HBT(`by-city/SalesPersonCode/${this.order?.salesPersonCode}`).subscribe((result: Uhbt[]) => {
          this.salesPersonCode = result.map((item: any) => {
            return {...item, city: item.extendedData?.cities[0]};
          });
        });

        this._lamiService.getU_HBT(`by-city/SERIES/${this.order?.salesPersonCode}`).subscribe((result: Uhbt[]) => { this.Series = result });
        this.formGroup.controls.salesPersonCode.setValue(this.order?.salesPersonCode);
        this.formGroup.controls.serie.setValue(this.order?.serie);

      }
    }
  }

  nameSalesPerson(item) {

    return item.extendedData?.cities[0] ? `${item.name} (${item.extendedData?.cities[0]})` : item.name;

  }

}
