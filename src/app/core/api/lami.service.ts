import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, IdentificationType } from 'app/modules/contact/customer/clients.types';
import { Store } from 'app/modules/settings/store/store.types';
import { User } from 'app/modules/settings/user/user.types';
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


    get users$(): Observable<User[]> {
        return this._users.asObservable();
    }

    getUsers(): Observable<User[]> {
        this._users.next(USER_DATA);
        return of([])
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


     /* #region  CUSTOMER */
    createCustomer(data: any):Observable<Customer>{
       console.log("🚀 ~ file: lami.service.ts ~ line 71 ~ LamiService ~ createCustomer ~ data", data)
       return  this._httpClient.post<Customer>(`${environment.endPoint}/customer`,data);
    }
     /* #region  CUSTOMER */
}