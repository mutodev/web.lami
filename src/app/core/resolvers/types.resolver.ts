import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IdentificationType } from "app/modules/contact/customer/clients.types";
import { User } from "app/modules/settings/user/user.types";
import { Type } from "app/shared/interfaces/setting.types";
import { Observable } from "rxjs";
import { LamiService } from "../api/lami.service";


@Injectable({
    providedIn: 'root'
})
export class IdentificationTypesResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IdentificationType[]>
    {
        return this._lamiService.getIdentificationTypes();
    }
}

@Injectable({
    providedIn: 'root'
})
export class RolesTypesResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Type[]>
    {
        return this._lamiService.getRoleTypes();
    }
}