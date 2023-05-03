import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LamiService } from 'app/core/api/lami.service';
import { Observable } from 'rxjs';
import { PQR } from '../pqr.types';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
  ,
  styles         : [
    /* language=SCSS */
    `
        .inventory-grid {
            grid-template-columns: 48px auto 40px;
            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }
            @screen md {
                grid-template-columns: 96px auto 224px 224px 224px 96px;
            }
            @screen lg {
                grid-template-columns:  96px auto 224px 224px 224px 96px;
            }
        }
    `
],
})
export class PqrListComponent implements OnInit {
  isLoading: boolean;
  searchInputControl: FormControl = new FormControl();
 pqrs$: Observable<PQR[]>;

  constructor() { }

  ngOnInit(): void {

    this.isLoading = false;
    this.pqrs$ = null;
  }


  createPQR():void{

  }

}
