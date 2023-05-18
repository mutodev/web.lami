import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';

@Component({
  selector: 'app-product-stock-dialog',
  templateUrl: './product-stock-dialog.component.html',
  styleUrls: ['./product-stock-dialog.component.scss']
})
export class ProductStockDialogComponent extends BaseList implements OnInit {

  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  selectedProduct: boolean = false;

  constructor(public _baseListService: BaseListService,
    public dialogRef: MatDialogRef<ProductStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(_baseListService);
  }

  ngOnInit(): void {
    this.getDataSource();

    console.log(this.dataSource$);
  }

  onSelectedItem(item: any) {
    this.data.selectItem(item);
  }

  toggleDetails(productID): void {
    // If the product is already selected...
    if(this.selectedProduct && this.selectedProduct == productID){
       this.selectedProduct = null;
       return;
    };

    this.selectedProduct = productID;
  }

}

