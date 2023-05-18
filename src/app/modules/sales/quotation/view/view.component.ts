import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id: string;
  quotation;
  store;
  discount;
  subTotal = 0;
  constructor(private route: ActivatedRoute,) {

  }


  ngOnInit(): void {

    console.log("id", this.id);
    this.quotation = null;
    this.store = null;
    this.discount = 0;
    this.subTotal = 0;
    this.getquotationinfo();
  }


  getquotationinfo() {

  console.log( this.id);

  }
}
