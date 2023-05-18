import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { LamiService } from 'app/core/api/lami.service';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { NotifyService } from 'app/core/notify/notify.service';
import { HttpMethodService } from 'app/core/services/http-method.service';
import { CustomerInfoSearchComponent } from 'app/shared/components/customer-info-search/customer-info-search.component';
import { ItemsComponent } from 'app/shared/components/items/items.component';
import { OrderInformationComponent } from 'app/shared/components/order-information/order-information.component';
import { Order, OrderDetail } from 'app/shared/interfaces/order';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: fuseAnimations
})
export class DetailComponent extends BaseList implements OnInit {


  order: Order;
  id
  formGroup: FormGroup;
  @ViewChild('itemsApp', { static: false }) itemsComponent: ItemsComponent;
  @ViewChild('customerApp', { static: true }) customerComponent: CustomerInfoSearchComponent;
  @ViewChild('orderInfoApp', { static: true }) orderInfoComponent: OrderInformationComponent;
  disabledForm: boolean = false;
  estimatedDate;
  current_sales_person_code: string;
  constructor(private _formBuilder: FormBuilder, public _lamiService: LamiService,
    private _httpService: HttpMethodService,
    public _baseListService: BaseListService,
    private route: ActivatedRoute, private _notifyService: NotifyService,
    private _router: Router) {
    super(_baseListService);


    this.id = this.route.snapshot.params['id'];

    if(this.id){
      this._lamiService.order$.subscribe(order=>{ this.order = order;});


    }

  }

  dateNow = new Date();
  validityDate = new Date().setDate(this.dateNow.getDate() + 10);

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      'customerId': new FormControl(),
      'estimatedDate': new FormControl(),
      'date': new FormControl(),
      'vatTotal': new FormControl(),
      'subTotal': new FormControl(),
      'total':new FormControl(),
      'discount': new FormControl(),
      'comments':new FormControl(),
      'serie': new FormControl(),
      'salesPersonCode': new FormControl()
    });

    let current_user = localStorage.getItem('user');
  this.current_sales_person_code = localStorage.getItem('user_salesPerson');
    console.log(current_user);
//

  }

  async  save(){
console.log("Save cotizacion");

    console.log("Order Info",this.orderInfoComponent);
    console.log("itwm Info",this.itemsComponent);
    console.log("customer Info",this.customerComponent);
    console.log("user_salesPerson", this.current_sales_person_code);

    this.formGroup.patchValue({
      date: this.orderInfoComponent.date,
      estimatedDate: this.orderInfoComponent.estimatedDate,
      customerId: this.customerComponent.customer.value,
      salesPersonCode: this.current_sales_person_code,
      serie: this.orderInfoComponent.formGroup.controls.serie.value,
      comments: this.itemsComponent.comments,
      total: this.itemsComponent.total,
      subTotal: this.itemsComponent.subTotal,
      discount: this.itemsComponent.discount,
      vatTotal: this.itemsComponent.tax,

    });


    this.formGroup.addControl('quoteDetails', this.itemsComponent.items);

/*
    this.formGroup.setValue('date', this.orderInfoComponent.date);
    this.formGroup.addControl('dueDate', this.orderInfoComponent.dueDate);
this.formGroup.addControl('vatTotal', this.orderInfoComponent.salesPerson);
    this.formGroup.addControl('subTotal', this.orderInfoComponent.salesPerson);
    this.formGroup.addControl('total', this.orderInfoComponent.salesPerson);
    this.formGroup.addControl('discount', this.orderInfoComponent.salesPerson);
    //this.formGroup.addControl('serie', this.orderInfoComponent.salesPerson);
    this.formGroup.addControl('comments', this.orderInfoComponent.salesPerson);
    this.formGroup.addControl('estimatedDate', this.orderInfoComponent.estimatedDate
    );*/
    console.log("Imprimir los datos enviados", this.formGroup.getRawValue());

    if (this.formGroup.valid) {
      const rest = await this._httpService.post<any>('/quote/',this.buildOrderRequest());
      console.log("Respuesta", rest);


      this._notifyService.successOrdenAlert(rest.message);


    } else {

      this.validateAllFormFields(this.formGroup)
    }


     /*  this._notifyService.successOrdenAlert("Guardado con exito");*/
       /* this._notifyService.dispalyErrorMsg("Guardado con exito");*/
  }

  buildOrderRequest() {
    let quoteDetails: OrderDetail[] = this.formGroup
      .get('quoteDetails').value
      .map((item: any) => {
        console.log('item', item)
        return {
          description: item.name,
          aditionalInfo: '',
          discount: Number(item.discount),
          amount: Number(item.quantity),
          value: item.price,
          vat: item.currencyTax,
          arTaxCode: item.tax,
          project: item.project,
          wareHouseCode: "",
          itemCode:item.code
        }
      });


    //reemplazar sales person code por el almacenado en memoria
    // salesPersonCode: this.formGroup.get('salesPersonCode').value,
    return {
      customerId: this.customerComponent.customer.value,
      date: this.orderInfoComponent.date,
      dueDate: this.orderInfoComponent.dueDate,
      vatTotal: this.itemsComponent.tax,
      salesPersonCode: this.current_sales_person_code,
      serie:  this.orderInfoComponent.formGroup.controls.serie.value,
      subTotal: this.itemsComponent.subTotal,
      total: this.itemsComponent.total,
      discount: Number(this.itemsComponent.discount),
      estimatedDate : this.itemsComponent.estimatedDate,
      quoteDetails  ,
      comments: this.itemsComponent.comments
    }
  }

  changeEstimatedDate(date){
    this.estimatedDate = date;
  }
}
