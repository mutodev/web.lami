import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { LamiService } from 'app/core/api/lami.service';
import { BaseList } from 'app/core/bases/base-list';
import { BaseListService } from 'app/core/bases/base-list.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: fuseAnimations
})
export class PurchaseDetailComponent extends BaseList implements OnInit {

  formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public _lamiService: LamiService,
    public _baseListService: BaseListService,
    private route: ActivatedRoute,
    private _router: Router) {
    super(_baseListService)
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({});
  }

  save(): void{
    
  }

}
