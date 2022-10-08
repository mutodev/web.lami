import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ClientsService } from "./clients.service";
import { Pagination } from 'app/shared/interfaces/pagination';
import { BaseListService } from "app/core/bases/base-list.service";
import { environment } from "environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ClientPaginationResolver implements Resolve<any> {
    baseUrl:string = environment.endPoint;
    constructor(public _baseListService: BaseListService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: Pagination; clients: any[] }> {
        this._baseListService.apiUrl = '/customers';
        return this._baseListService.getDataSource();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ClientsResolver implements Resolve<any> {

    constructor(public _baseListService: BaseListService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: Pagination; clients: any[] }> {
        this._baseListService.apiUrl = '/customer';
        return this._baseListService.getDataSource();
    }
}
