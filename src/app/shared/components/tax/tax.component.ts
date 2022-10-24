import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from 'app/core/bases/base-form';
import { EventService } from 'app/core/event/event.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent extends BaseForm implements OnInit {

  types = ['IVA', 'ICO', 'OTRO'];

  constructor(
    private _formBuilder: FormBuilder,
    private eventService: EventService) {
    super();
  }

  ngOnInit(): void {
    this.eventService.addEvent({ name: 'saveTax', event: this.save.bind(this) });
    this.validations();
  }

  validations() {
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: '',
      status: true,
      type: ['', Validators.required],
      percentage: ['', Validators.required],
    });
  }

  save(): Observable<any> {

    if (this.formGroup.valid) {
      this.formGroup.disable();
      return of({ success: true });
    } else {
      this.validateAllFormFields(this.formGroup);
      this.formGroup.enable();
      return of({ success: false });
    }
  }



}
