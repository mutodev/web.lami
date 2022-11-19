import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';

@Component({
  selector: 'app-search-product-dialog',
  templateUrl: './search-product-dialog.component.html',
  styles: [
    /* language=SCSS */
    `
        .list-grid {
            grid-template-columns: calc(100vw - 90px);

            @screen sm {
                grid-template-columns: auto  80px 150px 80px;
            }

            @screen md {
                grid-template-columns: auto 100px 150px 40px;
            }

            @screen lg {
                grid-template-columns: auto 80px 80px 80px 80px;
            }
        }
    `
  ],
})
export class SearchProductDialogComponent extends BaseList implements OnInit {

  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  selectedProduct: boolean = false;

  constructor(public _baseListService: BaseListService,
    public dialogRef: MatDialogRef<SearchProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(_baseListService);
  }

  ngOnInit(): void {
    this.getDataSource();
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

 