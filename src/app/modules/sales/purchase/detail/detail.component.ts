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
export class PurchaseDetailComponent extends BaseList implements OnInit {


  order: any;
  id: string;
  formGroup: FormGroup;
  actionName;
  @ViewChild('itemsApp', { static: false }) itemsComponent: ItemsComponent;
  @ViewChild('customerApp', { static: true }) customerComponent: CustomerInfoSearchComponent;
  @ViewChild('orderInfoApp', { static: true }) orderInfoComponent: OrderInformationComponent;
  disabledForm: boolean = false;
  estimatedDate;
  current_sales_person_code: string;
  constructor(private _formBuilder: FormBuilder,
    public _lamiService: LamiService,
    public _baseListService: BaseListService,
    public _httpMethodService: HttpMethodService,
    private route: ActivatedRoute, private _notifyService: NotifyService,
    private _router: Router) {
    super(_baseListService);


    this.id = this.route.snapshot.params['id'];
    this.actionName = this.id ? 'Editar' : 'Nuevo';

    if (this.id) {
      this.getOrder();
      // this._lamiService.order$.subscribe(order => { this.order = order; });



    }

  }

  dateNow = new Date();
  validityDate = new Date().setDate(this.dateNow.getDate() + 10);

  ngOnInit(): void {


    this.formGroup = this._formBuilder.group({});

    let current_user = localStorage.getItem('user');
    this.current_sales_person_code = localStorage.getItem('user_salesPerson');

    console.log("editando orden:", this.id);

  }

  save(): void {

    this.formGroup.addControl('orderDetails', this.itemsComponent.items);
    this.formGroup.addControl('customer', this.customerComponent.customer);
    this.formGroup.addControl('salesPersonCode', this.orderInfoComponent.salesPerson);
    this.formGroup.addControl('serie', this.orderInfoComponent.serie);

    if (this.formGroup.valid) {
      if (this.id) {
        this._lamiService.updateOrder(this.id, this.buildOrderRequest()).subscribe(result => {
          if (result.status == 'success') {
            this._router.navigateByUrl('/sales/purchase/all');
          } else {
            this._notifyService.dispalyErrorMsg(result.message);
          }
  
          /*  this._notifyService.successOrdenAlert("Guardado con exito");*/
          /* this._notifyService.dispalyErrorMsg("Guardado con exito");*/
        });        
      } else {
        this._lamiService.createOrder(this.buildOrderRequest()).subscribe(result => {
          if (result.status == 'success') {
            this._router.navigateByUrl('/sales/purchase/all');
            console.log(result);
          } else {
            this._notifyService.dispalyErrorMsg(result.message);
          }
          /*  this._notifyService.successOrdenAlert("Guardado con exito");*/
          /* this._notifyService.dispalyErrorMsg("Guardado con exito");*/
        });
      }
     
    } else {
      this.validateAllFormFields(this.formGroup)
    }
  }

  buildOrderRequest(): Order {
    let orderDetails: OrderDetail[] = this.formGroup
      .get('orderDetails').value
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
          itemCode: item.code
        }
      });


    //reemplazar sales person code por el almacenado en memoria
    // salesPersonCode: this.formGroup.get('salesPersonCode').value,
    return {
      customerId: this.formGroup.get('customer').value,
      date: this.orderInfoComponent.date,
      dueDate: this.orderInfoComponent.dueDate,
      vatTotal: this.itemsComponent.tax,
      salesPersonCode: this.formGroup.get('salesPersonCode').value,
      serie: this.formGroup.get('serie').value,
      subTotal: this.itemsComponent.subTotal,
      total: this.itemsComponent.total,
      discount: Number(this.itemsComponent.discount),
      estimatedDate: this.itemsComponent.estimatedDate,
      orderDetails: orderDetails,
      comments: this.itemsComponent.comments
    }
  }

  changeEstimatedDate(date) {
    this.estimatedDate = date;
  }

  async getOrder() {
    const result = await this._httpMethodService.get(`/order/${this.id}`);
    this.order = result.data;
  }

}
