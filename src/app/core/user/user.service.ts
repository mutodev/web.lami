import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { NotifyService } from '../notify/notify.service';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,private _notifyService: NotifyService)
    {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
        console.log(value);
        console.log(value['salesPersonCode']);
        localStorage.setItem('user', JSON.stringify(value));
        localStorage.setItem('user_sellerTypeId', value.sellerTypeId);
        localStorage.setItem('user_role', value.role);
        localStorage.setItem('user_role_id', value['roleId']);
        localStorage.setItem('user_salesPersonCode', value.id);
        localStorage.setItem('user_salesPerson', value['salesPersonCode']);

       /* this._notifyService.successTestAlert("Guardado con exito");*/
    }

    get user$(): Observable<User>
    {
        return of(JSON.parse(localStorage.getItem('user')))
        // return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
