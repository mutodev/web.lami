
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseListService } from 'app/core/bases/base-list.service';
import { Customer } from 'app/modules/contact/customer/clients.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

interface Client {
  identification: string;
  phone: string;
  email:string;
}

@Component({
  selector: 'ci-customer-search',
  templateUrl: './customer-info-search.component.html',
  styleUrls: ['./customer-info-search.component.scss']
})
export class CustomerInfoSearchComponent implements OnInit {

  client: Client;
  clients: any[];
  formGroup: FormGroup;
  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _baseListService: BaseListService,
    private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getClients();
    this.validation();
  }

  validation() {
    this.formGroup = this._formBuilder.group({
      customer: ['', [Validators.required]]
    })
  }
  setClientText(customer: Customer) {
    if (customer.identificationType == 'N'){
      return customer.companyName
    } else {
      return `${customer.firstName} ${customer.lastName}`;
    }
    
  }

  openClientDialog() {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      data: {},
    });
  }

  clientChange(customer: Customer) {
    this.client = {
      identification: customer.identification,
      phone: customer.phone,
      email: customer.email
    }
  }

  getClients() {
    this._baseListService.source$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((clients: any[]) => {
        this.clients = clients;
      });
  }

  get customer() {
    return this.formGroup.get('customer');
  }



}
