import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { LamiService } from 'app/core/api/lami.service';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { products } from 'app/mock-api/inventory/product/data';
import { CustomerInfoSearchComponent } from 'app/shared/components/customer-info-search/customer-info-search.component';
import { ItemsComponent } from 'app/shared/components/items/items.component';
import { OrderInformationComponent } from 'app/shared/components/order-information/order-information.component';
import { Order, OrderDetail } from 'app/shared/interfaces/order';
import { Product } from 'app/shared/interfaces/product';
import { CIFormatter } from 'app/shared/validators/formatters';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: fuseAnimations
})
export class PurchaseDetailComponent extends BaseList implements OnInit {


  order: Order;
  id
  formGroup: FormGroup;
  @ViewChild('itemsApp', { static: false }) itemsComponent: ItemsComponent;
  @ViewChild('customerApp', { static: true }) customerComponent: CustomerInfoSearchComponent;
  @ViewChild('orderInfoApp', { static: true }) orderInfoComponent: OrderInformationComponent;
  disabledForm: boolean = false;
  constructor(private _formBuilder: FormBuilder, public _lamiService: LamiService,
    public _baseListService: BaseListService,
    private route: ActivatedRoute,
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
    this.formGroup = this._formBuilder.group({});
   
  }



  save(): void {
    this.formGroup.addControl('orderDetails', this.itemsComponent.items);
    this.formGroup.addControl('customer', this.customerComponent.customer);
    this.formGroup.addControl('salesPersonCode', this.orderInfoComponent.salesPerson);
    this.formGroup.addControl('serie', this.orderInfoComponent.serie);
   
    if (this.formGroup.valid) {
      this._lamiService.createOrder(this.buildOrderRequest()).subscribe(result => {
        if (result.status == 'success')
          this._router.navigateByUrl('/sales/purchase/all');
       
      });
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
          itemCode:item.code
        }
      });

    return {
      customerId: this.formGroup.get('customer').value,
      date: this.orderInfoComponent.date,
      dueDate: this.orderInfoComponent.dueDate,
      vatTotal: 0,
      salesPersonCode: this.formGroup.get('salesPersonCode').value,
      serie: '13',
      subTotal: this.itemsComponent.subTotal,
      total: this.itemsComponent.total,
      discount: Number(this.itemsComponent.discount),
      orderDetails: orderDetails,
      comments: this.itemsComponent.comments
    }
  }
}
