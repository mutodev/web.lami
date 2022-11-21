
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { items } from 'app/mock-api/apps/file-manager/data';
import { Customer } from 'app/modules/contact/customer/clients.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

interface Client {
  identification?: string;
  phone?: string;
  email?: string;
}

@Component({
  selector: 'ci-customer-search',
  templateUrl: './customer-info-search.component.html',
  styleUrls: ['./customer-info-search.component.scss']
})
export class CustomerInfoSearchComponent implements OnInit, AfterViewInit {

  client: any = {};
  clients: any[];
  formGroup: FormGroup;
  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _lamiService: LamiService, private _formBuilder: FormBuilder, public dialog: MatDialog) { }
  
  
  ngAfterViewInit(): void {
   this._unsubscribeAll.unsubscribe();
  }

  ngOnInit(): void {

    this.getClients();
  
    this._lamiService.order$.subscribe((order) => {
      this.client = order.customer;
      
    });

    this.validation(this.client.customerId || '');
  }

  validation(customerId = '') {
    this.formGroup = this._formBuilder.group({
      customerId: [customerId, [Validators.required]]
    });

    console.log('formGroup', this.formGroup)
  }

  setClientText(customer: any) {
    return customer.displayName

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
    this._lamiService.customers$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((clients: any[]) => {
        this.clients = clients.map((item) => {
          let displayName;
          if (item.identificationType.code == '31' || item.identificationType.code == '50')
              displayName = item.name;
          else 
            displayName =  `${item?.firstName} ${item?.lastName} ${item?.lastName2}`;

          return {
            ...item,
            displayName:  displayName
          }

        });
      });
  }

  get customer() {
    return this.formGroup.get('customerId');
  }



}
