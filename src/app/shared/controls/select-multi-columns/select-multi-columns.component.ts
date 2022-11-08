import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormControl, NgControl } from '@angular/forms';
import { Component, Input, forwardRef, EventEmitter, Output, OnChanges, ChangeDetectorRef, SimpleChanges, Self, HostBinding, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { Event } from '@angular/router';

@Component({
    selector: 'select-multi-columns',
    templateUrl: './select-multi-columns.component.html',
    styleUrls: ['./select-multi-columns.component.scss'],
    providers: [{
        provide: MatFormFieldControl,
        useExisting: forwardRef(() => SelectMultiColumnsComponent)
    }]
})
export class SelectMultiColumnsComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, MatFormFieldControl<any> {

    static nextId: number = 0;
    stateChanges: Subject<void> = new Subject<void>();

    _focused = false;
    _initializeError = false;
    private _placeholder: string = '';
    _required = false;

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
    id = `select-multi-columns-${++SelectMultiColumnsComponent.nextId}`;
    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }
    get empty(): boolean {
        return !this.formControlSelect.value;
    }
    //----------------
    @Input() multiple = false;
    @Input() widthList: string;
    @Input() showButton: boolean = true;
    @Input() labelButton: string = 'Nuevo';
    @Input() customClass: string;
    @Input() dataSource: any[] = [];
    @Input() headers: string[] = [];
    @Input() displayColumns: string[] = [];
    @Input() selectedValue: string;
    @Input() selectedText: (item: any) => string | string;
    @Input() customStyle: any = {};
    @Output() onFilter: EventEmitter<any> = new EventEmitter();
    @Output() selectedChange: EventEmitter<any> = new EventEmitter();
    @Output() onClickButton: EventEmitter<any> = new EventEmitter();
    dataFilterSelect: FormControl = new FormControl();
    touched = false;
    onChanged!: Function;
    onTouched!: Function;
    selectedItem: any = {};
    textValue: string;
    public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    formControlSelect = new FormControl({ value: '', disabled: this.disabled });
    constructor(@Self() public ngControl: NgControl,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: any) {

        if (ngControl) {
            this.ngControl.valueAccessor = this;
            ngControl.valueAccessor = this;
        }

        this.formControlSelect.valueChanges.subscribe((val) => {
            if (val) {
                this.selectedItem = this.dataSource.find((a) => a[this.selectedValue] === val);
                if (this.selectedItem) {
                    if (typeof this.selectedText === 'string') {
                        this.textValue = this.selectedItem ? this.selectedItem[this.selectedText] : '';
                    } else {

                        this.textValue = this.selectedText(this.selectedItem || {});
                    }
                }
                
                this.selectedChange.emit(this.selectedItem);
            }
            if (this.onChanged)
                this.onChanged(val);

        });

        this.dataFilterSelect.valueChanges
            .subscribe((val) => {
                this.onFilter.emit(val);
                const filter = (a, s) => this.displayColumns.map((col) => {
                    return a[col].toLowerCase();
                }).join(' ').includes(s);
                this.filterData(filter, this.dataSource, this.dataFilterSelect, this.filteredData);
            });

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
            search = search.toLowerCase();
        }
        // filter the banks
        filteredData.next(
            data.filter((a) => filter(a, search))
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dataSource && changes.dataSource.currentValue) {
            this.dataSource = changes.dataSource.currentValue;
            this.filteredData.next(this.dataSource.slice());
            if (this.formControlSelect.value) {
                this.selectedItem = this.dataSource.find((a) => a[this.selectedValue] === this.formControlSelect.value);
                if (typeof this.selectedText === 'string') {
                    this.textValue = this.selectedItem[this.selectedText];
                } else {
                    this.textValue = this.selectedText(this.selectedItem);
                }
            }
            if (this.onChanged)
                this.onChanged(this.formControlSelect.value);
        }
        if (changes.widthList && changes.widthList.currentValue) {
            const styles = this.document.getElementById('dynamic-theme-css');
            if (styles) {
                styles.innerHTML = this.style;
            }
        }
    }

    setDescribedByIds(ids: string[]): void {

    }

    onContainerClick(): void {

    }

    public get style(): string {
        return `
            ::ng-deep.mat-select-panel-wrap {
                width: ${this.widthList} !important;
            }
        `;
    }

    clickButton() {
        this.onClickButton.emit(null);
    }

    ngOnInit() {
        // const styles = this.document.createElement('style') as HTMLStyleElement;
        // styles.id = 'dynamic-theme-css';
        // styles.innerHTML = this.style;
        // this.renderer.appendChild(this.document.head, styles);
    }

    ngOnDestroy() {
        // const styles = this.document.getElementById('dynamic-theme-css');
        // if (styles) {
        //   this.document.removeElement(styles);
        // }
    }

}
