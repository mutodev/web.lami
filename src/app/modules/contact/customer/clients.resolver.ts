import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ClientsService } from "./clients.service";
import { Pagination } from 'app/shared/interfaces/pagination';
import { BaseListService } from "app/core/bases/base-list.service";
import { environment } from "environments/environment";
import { LamiService } from "app/core/api/lami.service";
import { APIResponse } from "app/shared/interfaces/response";
import { Customer } from "./clients.types";




@Injectable({
    providedIn: 'root'
})
export class CustomersResolver implements Resolve<any> {
    baseUrl:string = environment.endPoint;
    constructor(public _lamiService: LamiService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<APIResponse<Customer[]>> {
        return this._lamiService.getCustomers({source: 'C'})
    }
}

@Injectable({
    providedIn: 'root'
})
export class PaginationClientsResolver implements Resolve<any> {

    constructor(public _baseListService: BaseListService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: Pagination; clients: any[] }> {
        this._baseListService.apiUrl = '/customer';
        return this._baseListService.getDataSource();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ClientResolver implements Resolve<any> {

    constructor(public _lamiService: LamiService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APIResponse<Customer>> {
        const id = route.params.id;
        return this._lamiService.getCustomerById(id);
    }
}
