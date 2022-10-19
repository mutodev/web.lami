import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class PurchaseViewComponent implements OnInit {

  id: string;
  constructor(private route: ActivatedRoute,) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

  }

}
