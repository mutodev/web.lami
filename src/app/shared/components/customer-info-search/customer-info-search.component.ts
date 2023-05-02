
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LamiService } from 'app/core/api/lami.service';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
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
  projects: any[];
  public _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _lamiService: LamiService, 
              private _httpMethodService: HttpMethodService, 
              private _formBuilder: FormBuilder, 
              public dialog: MatDialog) { }
  
  
  ngAfterViewInit(): void {
   this._unsubscribeAll.unsubscribe();
  }

  ngOnInit(): void {

    this.getClients();
  
    this._lamiService.order$.subscribe((order) => {
      this.client = order?.customer || {};
      
    });

    this._lamiService.getU_HBT('Project').subscribe((data)  => this.projects = data);
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

    dialogRef.afterClosed().subscribe((customer) => {
      if (customer) {
        this.clients.push(
          {
            identification: customer.identification,
            phone: customer.phone,
            email: customer.email,
            project: customer.project
          }
        );
        this.formGroup.controls.customerId.setValue(customer.id);
      }     
    });

  }

  clientChange(customer: any) {
    this.client = {
      identification: customer.identification,
      phone: customer.phone,
      email: customer.email,
      project: customer.project//this.projects.find((a) => a.code == customer.project)?.name
    }
  }

  async getClients(dato = '') {
    const result  = await this._httpMethodService.get<any>(`/customer?page=1&perPage=20&search=${dato}`);
    this.clients = result.data.data.map((item) => {
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
    
    // this._lamiService.customers$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((clients: any[]) => {
    //     this.clients = clients.map((item) => {
    //       let displayName;
    //       if (item.identificationType.code == '31' || item.identificationType.code == '50')
    //           displayName = item.name;
    //       else 
    //         displayName =  `${item?.firstName} ${item?.lastName} ${item?.lastName2}`;

    //       return {
    //         ...item,
    //         displayName:  displayName
    //       }

    //     });
    //   });
  }

  get customer() {
    return this.formGroup.get('customerId');
  }



}
