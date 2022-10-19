import { Component, OnInit, ViewChild } from '@angular/core';
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

  formGroup: FormGroup;
  @ViewChild('itemsApp', { static: false }) itemsComponent: ItemsComponent;
  @ViewChild('customerApp', { static: true }) customerComponent: CustomerInfoSearchComponent;
  @ViewChild('orderInfoApp', { static: true }) orderInfoComponent: OrderInformationComponent;

  constructor(private _formBuilder: FormBuilder, public _lamiService: LamiService,
    public _baseListService: BaseListService,
    private route: ActivatedRoute,
    private _router: Router) {
    super(_baseListService)
  }

  dateNow = new Date();
  validityDate = new Date().setDate(this.dateNow.getDate() + 10);

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({});
  }

  save(): void {
    this.formGroup.addControl('orderDetails', this.itemsComponent.items);
    this.formGroup.addControl('customer', this.customerComponent.customer);

    if (this.formGroup.valid) {
      this._lamiService.createOrder(this.buildOrderRequest()).subscribe(result => {

      });
    }
  }




  buildOrderRequest(): Order {
    console.log('this.formGroup :>> ', this.formGroup.value);
    let orderDetails: OrderDetail[] = this.formGroup
      .get('orderDetails').value
      .map((item: any) => {
        return {
          description: item.description,
          aditionalInfo: '',
          discount: Number(item.discount),
          amount: item.quantity,
          value: item.price,
          vat: 0,
          project: 'Digital',
          itemCode:"10"

        }
      });

    return {
      customerId: this.formGroup.get('customer').value.id,
      date: this.orderInfoComponent.date,
      dueDate: this.orderInfoComponent.dueDate,
      vatTotal: 0,
      subTotal: this.itemsComponent.subTotal,
      total: this.itemsComponent.total,
      discount: this.itemsComponent.discount,
      orderDetails: orderDetails,
    }
  }
}
