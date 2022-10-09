import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, IdentificationType } from 'app/modules/contact/customer/clients.types';
import { Store } from 'app/modules/settings/store/store.types';
import { User } from 'app/modules/settings/user/user.types';
import { APIResponse } from 'app/shared/interfaces/response';
import { Type } from 'app/shared/interfaces/setting.types';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { STORE_DATA, USER_DATA } from './moke-data';

@Injectable({
    providedIn: 'root'
})
export class LamiService {

    constructor(private _httpClient: HttpClient) {

    }


    /* #region  STORES */

    private _stores: BehaviorSubject<Store[] | null> = new BehaviorSubject(null);

    get stores$(): Observable<Store[]> {
        return this._stores.asObservable();
    }

    getStores(): Observable<Store[]> {
        this._stores.next(STORE_DATA);
        return of([])
    }
    /* #endregion */


    /* #region  USER */

    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);


    get users$(): Observable<User[]> {
        return this._users.asObservable();
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    createUser(data: any): Observable<APIResponse<User>> {

        return this._httpClient.post<APIResponse<User>>(`${environment.endPoint}/user`, data);
    }

    getUserById(id: string): Observable<APIResponse<User>> {
        return this._httpClient.get<APIResponse<User>>(`${environment.endPoint}/user/${id}`).pipe(
            tap((result) => {
                this._user.next(result.data);
            }));
    }

    updateUser(id: string, data: any):  Observable<APIResponse<User>> {
        return this._httpClient.patch<APIResponse<User>>(`${environment.endPoint}/user/${id}`, data);
    }

    /* #endregion */


    /* #region  IDENTIFICATION TYPE */

    private _ientificationTypes: BehaviorSubject<IdentificationType[] | null> = new BehaviorSubject(null);

    get identificationTypes$(): Observable<IdentificationType[]> {
        return this._ientificationTypes.asObservable();
    }

    getIdentificationTypes(): Observable<IdentificationType[]> {
        return this._httpClient.get<IdentificationType[]>(`${environment.endPoint}/setting/IDENTIFICATION_TYPE`).pipe(
            tap((result: any) => {
                this._ientificationTypes.next(result.settingDetail);
            })
        );
    }

    /* #endregion */


    /* #region  ROLES */
    private _roleTypes: BehaviorSubject<Type[] | null> = new BehaviorSubject(null);

    get roleTypes$(): Observable<Type[]> {
        return this._roleTypes.asObservable();
    }

    getRoleTypes(): Observable<IdentificationType[]> {
        return this._httpClient.get<IdentificationType[]>(`${environment.endPoint}/setting/ROLES`).pipe(
            tap((result: any) => {
                this._roleTypes.next(result.settingDetail);
            })
        );
    }

    /* #endregion */


    /* #region CUSTOMER  */

    private _customer: BehaviorSubject<Customer | null> = new BehaviorSubject(null);

    get customer$(): Observable<Customer> {
        return this._customer.asObservable();
    }

    createCustomer(data: any): Observable<APIResponse<Customer>> {

        return this._httpClient.post<APIResponse<Customer>>(`${environment.endPoint}/customer`, data);
    }


    getCustomerById(id: string): Observable<APIResponse<Customer>> {
        return this._httpClient.get<APIResponse<Customer>>(`${environment.endPoint}/customer/${id}`).pipe(
            tap((result) => {
                this._customer.next(result.data);
            }));
    }

    updateCustomer(id: string, data: any):  Observable<APIResponse<Customer>> {
        return this._httpClient.patch<APIResponse<Customer>>(`${environment.endPoint}/customer/${id}`, data);
    }
    /* #endregion */

}