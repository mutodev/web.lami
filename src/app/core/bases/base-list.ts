import { ArrayDataSource } from "@angular/cdk/collections";
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { user } from "app/mock-api/common/user/data";
import { Pagination } from "app/shared/interfaces/pagination";
import { environment } from "environments/environment";
import { BehaviorSubject, merge, Observable, Subject } from "rxjs";
import { debounceTime, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { BaseListService } from "./base-list.service";






@Component({
    template: ''
})
export abstract class BaseList implements AfterViewInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    dataSource$: Observable<any[]>;
    dataSource_array$: any;
    pagination: Pagination;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    apiUrl: string;
    private _source: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    public _unsubscribeAll: Subject<any> = new Subject<any>();
    public _changeDetectorRef: ChangeDetectorRef;

    constructor(
        public _baseListService: BaseListService) {

    }

    get source$(): Observable<any[]> {

        return this._source.asObservable();
    }

    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    getDataSource2() {
console.log("Obteniendo Listas from filds");

    }

    getDataSource() {

        //Get pagination
        this._baseListService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: Pagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                // this._changeDetectorRef.markForCheck();
            });

        // Get the dataSource data
        this.dataSource$ = this._baseListService.source$;


        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(1000),
                switchMap((query) => {
                    //this.closeDetails();
                    this.isLoading = true;
                    return this._baseListService.getDataSource(1, 10, 'name', 'asc', query);

                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    ngAfterViewInit(): void {

        // Get products if sort or page changes
        if (this._paginator)
            merge(this._paginator.page).pipe(
                switchMap(() => {
                    //this.closeDetails();
                    this.isLoading = true;
                    return this._baseListService.getDataSource(this._paginator.pageIndex + 1, this._paginator.pageSize);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormArray) {
                const list = formGroup.controls[field] as FormArray;
                list.controls.forEach((controlV: FormGroup) => {
                    this.validateAllFormFields(controlV);
                });
            }
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    editSource(newDate: any[]) {
        this._baseListService.editSource(newDate);
        this.dataSource$ = this._baseListService.source$;
    }


}
