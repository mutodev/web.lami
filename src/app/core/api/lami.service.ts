import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, IdentificationType } from 'app/modules/contact/customer/clients.types';
import { Store } from 'app/modules/settings/store/store.types';
import { User } from 'app/modules/settings/user/user.types';
import { Order } from 'app/shared/interfaces/order';
import { Price } from 'app/shared/interfaces/Price.types';
import { Product } from 'app/shared/interfaces/product';
import { APIResponse } from 'app/shared/interfaces/response';
import { Type } from 'app/shared/interfaces/setting.types';
import { Uhbt } from 'app/shared/interfaces/UHBT';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { BRILLA_PRICES, STORE_DATA, USER_DATA } from './moke-data';
import { HttpMethodService } from 'app/core/services/http-method.service';
@Injectable({
    providedIn: 'root'
})
export class LamiService {

    constructor(private _httpClient: HttpClient, private _httpService: HttpMethodService) {




    }

    public _httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // replace authToken with your actual authorization token
        })
    };

    /* #Brilla prices */

    public _prices: BehaviorSubject<Price[] | null> = new BehaviorSubject(null);






    getPrices(): Observable<Price[]> {
        this._prices.next(BRILLA_PRICES);
        return of([])
    }





    /* #region  STORES */

    private _stores: BehaviorSubject<Store[] | null> = new BehaviorSubject(null);



    getStores(): Observable<Store[]> {
        this._stores.next(STORE_DATA);
        return of([])
    }

    /* #endregion */


    /* #region  USER */


    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);

    get prices$(): Observable<Price[]> {
        return this._prices.asObservable();
    }
    get stores$(): Observable<Store[]> {
        return this._stores.asObservable();
    }
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

    updateUser(id: string, data: any): Observable<APIResponse<User>> {
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
    private _customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject(null);
    private _orderDetail: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

    get customer$(): Observable<Customer> {
        console.log("customer", this._customer);
        return this._customer.asObservable();
    }

    get orderDetail$(): Observable<any> {
        return this._orderDetail.asObservable();
    }


    get customers$(): Observable<Customer[]> {
        return this._customers.asObservable();
    }

    getOrderDetail(customerId): Observable<APIResponse<any[]>> {
        return this._httpClient.get<any[]>(`${environment.endPoint}/customer/orders/${customerId}`).pipe(
            tap((result: any) => {
                this._orderDetail.next(result.data);
            })
        );
    }


    getCustomers(params?: any): Observable<APIResponse<Customer[]>> {
        return this._httpClient.get<Customer[]>(`${environment.endPoint}/customer`, { params }).pipe(
            map((result: any) => {
                let newData = result.data?.data.map((item: any) => {
                    return {
                        name: item?.firstName + ' ' + item?.lastName,
                        ...item
                    }

                })
                return {
                    message: result.message,
                    status: result.status,
                    data: newData
                }

            }),
            tap((result: any) => {
                this._customers.next(result.data);
            })
        );
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

    updateCustomer(id: string, data: any): Observable<APIResponse<Customer>> {
        return this._httpClient.patch<APIResponse<Customer>>(`${environment.endPoint}/customer/${id}`, data);
    }
    /* #endregion */

    /* #region  PRODUCT */
    private _products: BehaviorSubject<Product[] | null> = new BehaviorSubject(null);

    get products$(): Observable<Product[]> {
        return this._products.asObservable();
    }

    getProducts(): Observable<APIResponse<Product[]>> {
        return this._httpClient.get<Product[]>(`${environment.endPoint}/items`).pipe(
            tap((result: any) => {
                this._products.next(result.data);
            })
        );
    }
    /* #endregion */

    /* #region  ORDER */

    private _order: BehaviorSubject<Order | null> = new BehaviorSubject(null);

    createOrder(order: Order): Observable<APIResponse<Order>> {
        return this._httpClient.post<APIResponse<Order>>(`${environment.endPoint}/order`, order);
    }

    updateOrder(id: string, order: Order): Observable<APIResponse<Order>> {
        return this._httpClient.patch<APIResponse<Order>>(`${environment.endPoint}/order/${id}`, order);
    }

    get order$(): Observable<Order> {
        return this._order.asObservable();
    }

    getOrderById(id: string): Observable<APIResponse<Order>> {
        return this._httpClient.get<APIResponse<Order>>(`${environment.endPoint}/order/${id}`).pipe(
            tap((result) => {
                this._order.next(result.data);
            }));
    }

    getquteById(id: string): Observable<APIResponse<Order>> {
        return this._httpClient.get<APIResponse<Order>>(`${environment.endPoint}/quote/${id}`).pipe(
            tap((result) => {
                this._order.next(result.data);
            }));
    }
    /* #endregion */



    /* #region  U_HBT */

    private _Uhbt: BehaviorSubject<Uhbt | null> = new BehaviorSubject(null);

    get U_HBT$(): Observable<Uhbt> {
        return this._Uhbt.asObservable();
    }

    getU_HBT(id: string): Observable<Uhbt[]> {
        return this._httpClient.get<any>(`${environment.endPoint}/setting/all/details/${id}`).pipe(
            map((result: any) => {
                return result.data;
            }));
    }
    /* #endregion */



}