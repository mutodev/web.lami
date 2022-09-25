import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'app/modules/settings/store/store.types';
import { User } from 'app/modules/settings/user/user.types';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

}