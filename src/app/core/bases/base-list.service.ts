import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pagination } from "app/shared/interfaces/pagination";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BaseListService {

    // <!-- ----------------------------------------------------------------------------------------------------- -->
    // <!-- BehaviorSubject -->
    // <!-- ----------------------------------------------------------------------------------------------------- -->
    private _source: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);
    private _customers: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _quotations: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _taxes: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    baseUrl:string = environment.endPoint;
    apiUrl: string;
    constructor(
        private _httpClient: HttpClient

    ) { }


    // <!-- ----------------------------------------------------------------------------------------------------- -->
    // <!-- Getters -->
    // <!-- ----------------------------------------------------------------------------------------------------- -->

    get customers$(): Observable<any[]> {
        return this._customers.asObservable();
    }

    get quotations$(): Observable<any> {
        return this._quotations.asObservable();
    }

    get products$(): Observable<any[]> {
        return this._products.asObservable();
    }

    get taxes$(): Observable<any[]> {
        return this._taxes.asObservable();
    }

    get source$(): Observable<any[]> {
        return this._source.asObservable();
    }

    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }


    // <!-- ----------------------------------------------------------------------------------------------------- -->
    // <!-- Get Sources -->
    // <!-- ----------------------------------------------------------------------------------------------------- -->

    getDataSource(page: number = 1, perPage: number = 25, sort: string = '', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: Pagination; clients: any[] }> {
        return this._httpClient.get<{ pagination: Pagination; clients: any[] }>(`${this.baseUrl}${this.apiUrl}`, {
            params: {
                page,
                perPage, 
                search
            }
        }).pipe(
            tap((response: any) => {
                let pagination: Pagination = {
                    length: response?.data?.total,
                    size: response?.data?.per_page,
                    page: response?.data?.current_page
                };
                this._pagination.next(pagination);
                this._source.next(response.data.data);
            })
        );
    }

    getProducts(url: string): Observable<any[]> {
        return this._httpClient.get<any[]>(url).pipe(
            tap((dataList: any) => {
                this._products.next(dataList.data);
            })
        );
    }

    getCustomers(url: string): Observable<any[]> {
        return this._httpClient.get<any[]>(url).pipe(
            tap((dataList: any) => {
                this._customers.next(dataList.data);
            })
        );
    }

    getTaxes(url: string): Observable<any[]> {
        return this._httpClient.get<any[]>(url).pipe(
            tap((dataList: any) => {
                this._taxes.next(dataList.data);
            })
        );
    }

    getQuotation(url: string, id: string): Observable<any[]> {
        return this._httpClient.get<any>(url, { params: { id } }).pipe(
            tap((dataList: any) => {
                this._quotations.next(dataList.data);
            })
        );
    }

    editSource(newDate: any[]) {
        this._source.next(newDate);
    }
}
