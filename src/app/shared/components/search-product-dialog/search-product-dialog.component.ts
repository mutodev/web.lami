import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LamiService } from 'app/core/api/lami.service';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';
import { HttpMethodService } from 'app/core/services/http-method.service';

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
export class SearchProductDialogComponent implements OnInit {

  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  selectedProduct: boolean = false;
  brilla_price = 0;
  typer_of_seller: string;
  searchInputControl: FormControl = new FormControl();
  dataSource = [];
  constructor(public _baseListService: BaseListService,
    public _lamiService: LamiService,
    public _httpService: HttpMethodService,
    public dialogRef: MatDialogRef<SearchProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    /* super(_baseListService); */
  }

  ngOnInit(): void {
    /* this.getDataSource(); */
    /* this.getItems(); */
    this.getType_seller();
    this.searchInputControl.valueChanges.subscribe((text) => {
      if (text.length > 3) {
        this.getItems(text);
      } else if (text == '') {
        this.getItems();
      } 
        
    });
  }



  getType_seller() {
    this.typer_of_seller = localStorage.getItem('user_sellerTypeId');

    if (this.typer_of_seller == '1aa1acf5-7b5b-11ed-b8b2-93cfa5187c2a') {
      this._lamiService.getPrices();
      this.brilla_price = parseFloat("0." + this._lamiService._prices.value[2].value);
      console.log('Vendedor Brilla Precio Especial', this.brilla_price);

    }
  }

  onSelectedItem(item: any) {

    console.log("Selected item", item.code);
    const elem = document.getElementById(item.code);
    elem.style.color = '#fff';
    elem.style.background = '#1c1f5d';
    elem.style.padding = '2%';
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
    const result = await this._httpService.get<any[]>(`/items/find-all/from-sap?search=${search}&stop=14`);
    this.dataSource = result.data;
  }

}

