import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ClientsService } from "./clients.service";
import { Pagination } from 'app/shared/interfaces/pagination';
import { BaseListService } from "app/core/bases/base-list.service";


@Injectable({
    providedIn: 'root'
})
export class ClientsResolver implements Resolve<any> {

    constructor(public _baseListService: BaseListService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: Pagination; clients: any[] }> {
        this._baseListService.apiUrl = 'api/customer';
        return this._baseListService.getDataSource();
    }
}
