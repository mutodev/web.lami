import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'ci-date-field',
  templateUrl: './date-field.component.html',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }

  ],
})
export class CIDateFieldComponent implements OnInit {

  @Input() title: string;


  formGroup: FormGroup;
  public onTouched: () => void = () => { };

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validations();
  }

  validations() {
    this.formGroup = this._formBuilder.group({
      date: [moment(), [Validators.required]]
    });
  }

  get date() {
    return this.formGroup.get('date');
  }



}
