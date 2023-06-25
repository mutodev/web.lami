import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { APIResponse } from 'app/shared/interfaces/response';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class HttpMethodService {
  
  public baseUrl: string;
  public baseUrlWS: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.endPoint;
  }

  get<T>(url: string, data: any = {}): Promise<APIResponse<T>> {
    const result = this.http.get<APIResponse<T>>(this.baseUrl + url, {headers: this.header(), params: data});
    return firstValueFrom(result);
    // .toPromise().then((response) => {
    //   return response;
    // });
  }

  post<T>(url: string, data: any): Promise<APIResponse<T>>  {
    return this.http.post<APIResponse<T>>(this.baseUrl + url, data, {headers: this.header()}).toPromise();
    // .toPromise().then((response) => {
    //   return response;
    // });
  }

  postObservable<T>(url: string, data: any): Observable<APIResponse<T>>  {
    return this.http.post<APIResponse<T>>(this.baseUrl + url, data, {headers: this.header()});
    // .toPromise().then((response) => {
    //   return response;
    // });
  }

  put<T>(url: string, data: any): Promise<APIResponse<T>>  {
    return this.http.put<APIResponse<T>>(this.baseUrl + url, data, {headers: this.header()}).toPromise();
    // .toPromise().then((response) => {
    //   return response;
    // });
  }

  patch<T>(url: string, data: any): Promise<APIResponse<T>>  {
    return this.http.patch<APIResponse<T>>(this.baseUrl + url, data, {headers: this.header()}).toPromise();
    // .toPromise().then((response) => {
    //   return response;
    // });
  }

  delete<T>(url: string): Promise<APIResponse<T>> {
    return this.http.delete<APIResponse<T>>(this.baseUrl + url, {headers: this.header()}).toPromise();
  }

  postyFormData<T>(url: string, data: FormData): Promise<APIResponse<T>>  {
    return this.http.post<APIResponse<T>>(this.baseUrl + url, data, {headers: this.headerFormData()}).toPromise();
    // .toPromise().then((response) => {
    //   return response;
    // });
  }

  putFormData<T>(url: string, data: FormData) {
    return this.http.put<APIResponse<T>>(this.baseUrl + url, data, {headers: this.headerFormData()}).toPromise();
    // .toPromise().then((response) => {
    //   return response;
    // });
  }

  postNoToken<T>(url: string, data: any): Promise<APIResponse<T>>  {
    return this.http.post<APIResponse<T>>(this.baseUrl + url, data, {headers: this.headerFormDataNoToken()}).toPromise();
  }

  getNoToken<T>(url: string, data: any = {}): Promise<APIResponse<T>>  {
    return this.http.get<APIResponse<T>>(this.baseUrl + url, {headers: this.headerFormDataNoToken(), params: data}).toPromise();
  }

  export<T>(url: string) {
    window.open(this.baseUrl + url, '_blank');
  }

  getExternal<T>(url: string, data: any = {}): Promise<APIResponse<T>> {
    return this.http.get<APIResponse<T>>(url, {params: data}).toPromise();
  }
  
  private header() {
  
    const tokenObj = localStorage.getItem('accessToken');
    if (tokenObj) {
        let headers = new HttpHeaders();
        headers = headers.append('Cache-Control',  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Authorization', 'Bearer ' + tokenObj);
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }
  }

  private headerFormData() {
    const tokenObj = localStorage.getItem('accessToken');
    if (tokenObj) {
        let headers = new HttpHeaders();
        headers = headers.append('Cache-Control',  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
        headers = headers.append('Authorization', 'Bearer ' + tokenObj);
        return headers;
    }
  }

  private headerFormDataNoToken() {
    let headers = new HttpHeaders();
    return headers;
  }

}
