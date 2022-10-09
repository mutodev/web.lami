import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { User } from "app/modules/settings/user/user.types";
import { Pagination } from "app/shared/interfaces/pagination";
import { APIResponse } from "app/shared/interfaces/response";
import { Observable } from "rxjs";
import { LamiService } from "../api/lami.service";
import { BaseListService } from "../bases/base-list.service";


@Injectable({
    providedIn: 'root'
})
export class UsersResolver implements Resolve<any>
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
        this._baseListService.apiUrl = '/user';
        return this._baseListService.getDataSource();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<APIResponse<User>>
    {
        let id = route.params.id;
        return this._lamiService.getUserById(id)
    }
}