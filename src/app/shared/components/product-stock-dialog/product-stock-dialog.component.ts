import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';

@Component({
  selector: 'app-product-stock-dialog',
  templateUrl: './product-stock-dialog.component.html',
  styleUrls: ['./product-stock-dialog.component.scss']
})
export class ProductStockDialogComponent implements OnInit {

  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  selectedProduct: boolean = false;

  searchInputControl: FormControl = new FormControl();
  dataSource = [];
  constructor(public _baseListService: BaseListService,
    public _httpService: HttpMethodService,
    public dialogRef: MatDialogRef<ProductStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
    // this.getItems();
    this.searchInputControl.valueChanges.subscribe((text) => {
      if (text.length > 3)
        this.getItems(text);
    });
  }

  onSelectedItem(item: any) {
    this.data.selectItem(item);
  }

  toggleDetails(productID): void {
    // If the product is already selected...
    if (this.selectedProduct && this.selectedProduct == productID) {
      this.selectedProduct = null;
      return;
    };

    this.selectedProduct = productID;
  }

  async getItems(search = '') {
    const result = await this._httpService.get<any[]>(`/items/find-all/stock-from-sap?search=${search}&stop=14`);
    this.dataSource = result.data;
  }
}

