
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { HttpMethodService } from '../services/http-method.service';
import { FormControl } from '@angular/forms';
import { Pagination } from 'app/shared/interfaces/pagination';

export abstract class BaseListAbs {
 
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    public dataSource: any[] = [];
    public search = '';
    public urlApi = '';
    public defaultPagination: number;    
    public pageSizeOptions: number[];    
    public parametros = {};
    public  pagination: Pagination = { page: 1, size: 25, length: 0};
   
    constructor(public methodService: HttpMethodService){ }

    public fillPagination(data: any) {
        this.pagination.page = data.currentPage;
        this.pagination.length = data.total;
        // this.pageSize = data.per_page;
    }

    public async getData() {
        let queryParam = {
            perPage: this.pagination.size,
            page: this.pagination.page,
            search: this.search
        }
        const data = Object.assign(queryParam, this.parametros);
        const url = `${this.urlApi}`;
        const response = await this.methodService.get<any>(url, data);
        if (response.status === 'success') {
            this.dataSource = response.data.data;
            this.fillPagination(response.data);
            // console.log({dataSource: this.dataSource})
        } else {
            // this.controlService.msgInfo(response.message);
        }
    }

    public nextForward(pageEvent: PageEvent) {
        this.pagination.page = pageEvent.pageIndex + 1;
        this.getData();
    }

    public filter(event: any) {
        if (event.keyCode === 13) {
            this.pagination.page = 1;
            this.getData();
        }
    }
   
}

