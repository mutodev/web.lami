import { ReplaySubject, Subject } from 'rxjs';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, Self, forwardRef, HostBinding, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ValidatorFn } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { filter, take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'search-mat-select',
    templateUrl: './search-mat-select.component.html',
    styleUrls: ['./search-mat-select.component.scss'],
    providers: [{
        provide: MatFormFieldControl,
        useExisting: forwardRef(() => SearchMatSelectComponent)
    }]
})
export class SearchMatSelectComponent implements OnInit, ControlValueAccessor, OnChanges, MatFormFieldControl<any> {

    static nextId: number = 0;
    stateChanges: Subject<void> = new Subject<void>();


    private _focused = false;
    private _placeholder: string = '';
    private _required = false;
    @ViewChild('select') mySelect;
    @Output() onClickButton: EventEmitter<any> = new EventEmitter();


    get focused(): boolean {
        return this._focused;
    }
    set focused(value: boolean) {
        this._focused = value;
        this.stateChanges.next();
    }

    get shouldPlaceholderFloat() {
        return !!this.value;
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    closeSelect() {
        this.mySelect.close();
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get value() {
        return this.formControlSelect.value;
    }

    set value(value) {
        console.log('value', value)
        this.formControlSelect.setValue(value);
        this.ngControl.control.setValue(value);
        this.stateChanges.next();
    }

    get errorState(): boolean {
    
        return  this.ngControl.control.status == 'INVALID'  && !!this.ngControl.control.touched;
    }

    @Input()
    set disabled(disabled) {
        this._disabled = disabled;
        disabled ? this.formControlSelect.disable() : this.formControlSelect.enable();
        this.stateChanges.next();
    }
    get disabled() {
        return this._disabled;
    }
    private _disabled = false;

    @HostBinding('attr.aria-describedby')
    describedBy: string = '';
    // @HostBinding()
    // id = `search-mat-select-${++SearchMatSelectComponent.nextId}`;
    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }
    get empty(): boolean {
        return !this.formControlSelect.value;
    }
    //--------
    @Input() multiple = false;
    @Input() id:string;
    @Input() labelSearch: string = "Buscar ...";
    @Input() customClass: string;
    @Input() dataSource: any[] = [];
    @Input() filterColumns: string[] = [];
    @Input() selectedValue: string;
    @Input() selectedText: (item: any) => string | string = null;
    @Input() customStyle: any = {};
    @Input() appearance: MatFormFieldAppearance = 'fill';
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    @Output() onFilter: EventEmitter<any> = new EventEmitter();
    @Input() labelButton: string = 'Nuevo';
    @Input() showButton: boolean = true;
    @Input() countDisplayField: number = 1;
    dataFilterCrtl: FormControl = new FormControl();
    // disabled = false;
    touched = false;
    onChanged!: Function;
    onTouched!: Function;
    selectedItem: any = {};
    textValue: string;
    public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    formControlSelect = new FormControl({ value: '', disabled: this.disabled });
    protected _onDestroy = new Subject<void>();

    constructor(@Self() public ngControl: NgControl) {
        if (ngControl) {
            this.ngControl.valueAccessor = this;
            ngControl.valueAccessor = this;
        }

        this.formControlSelect.valueChanges.subscribe((val) => {
            console.log('val', val)
            this.onChanged(val);
        })

    }

    ngOnInit() {

    }

    loadData(data: any[]): void {
        // set initial selection
        //this.bankCtrl.setValue(data[0]);
        this.dataSource = data;
        // load the initial bank list
        this.filteredData.next(this.dataSource.slice());

        // listen for search field value changes
        this.dataFilterCrtl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
            this.filterData();
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
      }

    close() {
        this.mySelect.close();
    }

    writeValue(val: any) {
        // if (val)
        this.formControlSelect.setValue(val);
    }

    registerOnChange(fn: any) {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    protected filterData() {
        if (!this.dataSource) {
            return;
        }
        // get the search keyword
        let search = this.dataFilterCrtl.value;
        if (!search) {
            this.filteredData.next(this.dataSource.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredData.next(
             this.dataSource.filter(data => data.name.toLowerCase().indexOf(search) > -1)
        );
    }

    ngOnChanges(changes: SimpleChanges) {
       console.log(' this.formControlSelect.value',  this.formControlSelect.value)
    }

    getText(item) {
        if (!this.selectedText) {
            return item;
        } else if (typeof this.selectedText === 'string') {
            return item[this.selectedText];
        } else {
            return this.selectedText(item);
        }
    }

    setDescribedByIds(ids: string[]): void {

    }

    onContainerClick(): void {

    }

    clickButton() {
        this.onClickButton.emit(null);
        this.close();
    }
}
