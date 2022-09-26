
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseListService } from 'app/core/bases/base-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Client {
  identification: string;
  phone: string;
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
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getClients();
    this.validation();
  }

  validation() {
    this.formGroup = this._formBuilder.group({
      customer: ['', [Validators.required]]
    })
  }
  setClientText(item: any) {
    return `${item.first_name} ${item.last_name}`;
  }

  openClientDialog() {
    // this.clientSearchSelect.close();
    // this._dialogService.open({
    //   title: "Nuevo Cliente",
    //   template: CustomerComponent,
    //   widthContent: '700px',
    //   actions: {
    //     confirm: {
    //       show: true,
    //       label: "Guardar",
    //       callback: async (ref) => {
    //         const saveClient$ = this.eventService.getEvent('saveClient')
    //         await saveClient$().toPromise()
    //           .then((result: any) => {
    //             if (result.success)
    //               console.log(`result`, result)
    //           })
    //       }
    //     },
    //     cancel: {
    //       show: true,
    //       label: "Cancelar",
    //       callback: () => {
    //         // si quieres ejecutar algo adicional
    //         // alert('adicional');
    //       }
    //     }
    //   }
    //});
  }

  clientChange(client: any) {
    this.client = {
      identification: client.identification,
      phone: client.cell_phone
    }
  }

  getClients() {
    this._baseListService.customers$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((clients: any[]) => {
        this.clients = clients;
      });
  }

  get customer() {
    return this.formGroup.get('customer');
  }

}
