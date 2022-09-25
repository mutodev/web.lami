import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pagination } from "app/shared/interfaces/pagination";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    private _clients: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);
    constructor(
        private _httpClient: HttpClient

    ) { }


    /**
     * Getter for clients
     */
    get clients$(): Observable<any[]> {
        return this._clients.asObservable();
    }

    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    getClients(page: number = 1, size: number = 10, sort: string = '', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: Pagination; clients: any[] }> {
        return this._httpClient.get<{ pagination: Pagination; clients: any[] }>('' + '/api/customer', {
            params: {
                page: page,
                page_size: '' + size,
                sort,
                order,
                data: search
            }
        }).pipe(
            tap((response: any) => {
                let pagination: Pagination = {
                    length: response.data.total,
                    size: response.data.per_page,
                    page: response.data.current_page
                };
                this._pagination.next(pagination);
                this._clients.next(response.data.result);
            })
        );
    }

}