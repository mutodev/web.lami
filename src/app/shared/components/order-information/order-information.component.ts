import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ci-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.scss']
})
export class OrderInformationComponent implements OnInit {

  dateNow = new Date();
  validityDate = new Date().setDate(this.dateNow.getDate() + 10);
 
  constructor() { }

   

  ngOnInit(): void {
   
  }

}
