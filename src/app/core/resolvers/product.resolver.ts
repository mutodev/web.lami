import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { User } from "app/modules/settings/user/user.types";
import { Pagination } from "app/shared/interfaces/pagination";
import { Product } from "app/shared/interfaces/product";
import { APIResponse } from "app/shared/interfaces/response";
import { Observable } from "rxjs";
import { LamiService } from "../api/lami.service";
import { BaseListService } from "../bases/base-list.service";


@Injectable({
    providedIn: 'root'
})
export class PaginationProductResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _baseListService: BaseListService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<{ pagination: Pagination; clients: any[]}>
    {
        this._baseListService.apiUrl = '/items';
        return this._baseListService.getDataSource();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ProductsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _lamiService: LamiService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<APIResponse<Product[]>>
    {

        return this._lamiService.getProducts()
    }
}