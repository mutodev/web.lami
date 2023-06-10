import { ReplaySubject, Subject } from 'rxjs';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, Self, forwardRef, HostBinding, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ValidatorFn } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
        this.formControlSelect.setValue(value);
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.ngControl.errors !== null && !!this.ngControl.touched;
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
    @HostBinding()
    id = `search-mat-select-${++SearchMatSelectComponent.nextId}`;
    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }
    get empty(): boolean {
        return !this.formControlSelect.value;
    }
    //--------
    @Input() multiple = false;
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
    dataFilterSelect: FormControl = new FormControl();
    // disabled = false;
    touched = false;
    onChanged!: Function;
    onTouched!: Function;
    selectedItem: any = {};
    textValue: string;
    public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    formControlSelect = new FormControl({ value: '', disabled: this.disabled });
    constructor(@Self() public ngControl: NgControl) {
        if (ngControl) {
            this.ngControl.valueAccessor = this;
            ngControl.valueAccessor = this;
        }
        this.formControlSelect.valueChanges.subscribe((val) => {
            if (val) {
                this.selectedItem = this.dataSource?.find((a) =>  this.selectedValue ? a[this.selectedValue] === val : a === val || val.includes(this.selectedValue ? a[this.selectedValue] : a));
                let selected;
                if (this.selectedItem) {
                    if (!this.selectedText) {
                        let newVal = [];
                        if (this.multiple) {
                            for (let index = 0; index < this.countDisplayField; index++) {
                                newVal.push(val[index]);
                            }
                        }
                        this.textValue = this.multiple ? newVal.join(',') : this.selectedItem;
                        selected = this.multiple ? this.dataSource.filter((a) => val.includes(a)) : this.selectedItem;
                    } else if (typeof this.selectedText === 'string') {
                        let newVal = [];
                        if (this.multiple) {
                            for (let index = 0; index < this.countDisplayField; index++) {
                                const obj = this.dataSource.find((a) => a[this.selectedValue] === val[index])
                                newVal.push(obj[this.selectedText]);
                            }
                        }
                        this.textValue = this.multiple ? newVal.join(',') : this.selectedItem ? this.selectedItem[this.selectedText] : '';
                        selected = this.multiple ? this.dataSource.filter((a: any) => val.includes(a[this.selectedValue])) : this.selectedItem;
                    } else {
                        let newVal = [];
                        if (this.multiple) {
                            for (let index = 0; index < this.countDisplayField; index++) {
                                const obj = this.dataSource.find((a) => a[this.selectedValue] === val[index])
                                newVal.push(obj[this.selectedText(obj)]);
                            }
                        }
                        this.textValue =  this.multiple ? newVal.join(',') : this.selectedText(this.selectedItem || {});
                        selected = this.multiple ? this.dataSource.filter((a: any) => val.includes(a[this.selectedValue])) : this.selectedItem;
                    }
                }
                this.selectionChange.emit(selected);
            }

            if (this.onChanged)
                this.onChanged(val);
        });

        this.dataFilterSelect.valueChanges
            .subscribe((val) => {
                this.onFilter.emit(val);
                const filter = (a, s) => this.filterColumns && this.filterColumns.length > 0 ? this.filterColumns.map((col) => {
                    return this.replaceAllTilde(a[col]?.toString()?.toLowerCase() || '');
                }).join(' ').includes(s) : a.toLowerCase().includes(s);
                this.filterData(filter, this.dataSource, this.dataFilterSelect, this.filteredData);
            });

    }

    replaceAllTilde(s) {
        return s.replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u');
    }

    ngOnInit() {

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

    protected filterData(filter, data: any[], ctr: FormControl, filteredData: ReplaySubject<any[]>) {
        if (!data) {
            return;
        }
        // get the search keyword
        let search = ctr.value;
        if (!search) {
            filteredData.next(data.slice());
            return;
        } else {
            search = this.replaceAllTilde(search.toLowerCase());
        }
        // filter the banks
        filteredData.next(
            data.filter((a) => filter(a, search))
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dataSource && changes.dataSource.currentValue && changes.dataSource?.currentValue?.length > 0) {
            this.dataSource = changes.dataSource.currentValue;
            this.filteredData.next(this.dataSource.slice());
            if (this.formControlSelect.value) {
                // ((a) =>  this.selectedValue ? a[this.selectedValue] === val : a === val || val.includes(this.selectedValue ? a[this.selectedValue] : a));
                let val = this.formControlSelect.value;
                this.selectedItem = this.dataSource.find((a) => this.selectedValue ? a[this.selectedValue] === this.formControlSelect.value : a === this.formControlSelect.value || this.formControlSelect.value.includes(this.selectedValue ? a[this.selectedValue] : a));

                if (!this.selectedText) {
                    let newVal = [];
                    if (this.multiple) {
                        for (let index = 0; index < this.countDisplayField; index++) {
                            newVal.push(val[index]);
                        }
                    }
                    this.textValue = this.multiple ? newVal.join(',') : this.selectedItem;
                } else if (typeof this.selectedText === 'string') {
                    let newVal = [];
                    if (this.multiple) {
                        for (let index = 0; index < this.countDisplayField; index++) {
                            const obj = this.dataSource.find((a) => a[this.selectedValue] === val[index])
                            newVal.push(obj[this.selectedText]);
                        }
                    }
                    this.textValue = this.multiple ? newVal.join(',') : this.selectedItem[this.selectedText];
                } else {
                    let newVal = [];
                    if (this.multiple) {
                        for (let index = 0; index < this.countDisplayField; index++) {
                            const obj = this.dataSource.find((a) => a[this.selectedValue] === val[index])
                            newVal.push(obj[this.selectedText(obj)]);
                        }
                    }
                    this.textValue = this.multiple ? newVal.join(',') : this.selectedText(this.selectedItem);
                }
            }
            if (this.onChanged)
                this.onChanged(this.formControlSelect.value);
        } else {
            this.filteredData.next([].slice());
        }
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
