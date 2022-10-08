import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html'
})
export class CustomerDialogComponent implements OnInit {

  @ViewChild('appCustomer', { static: true }) customerComponent: CustomerComponent;

  constructor(public dialogRef: MatDialogRef<CustomerDialogComponent>) {

  }

  ngOnInit(): void {

  }

  save() {
    this.customerComponent.save()
      .subscribe((result) => {
        if (result.success) {
          this.dialogRef.close(result.data);
        }
      });
  }
}
