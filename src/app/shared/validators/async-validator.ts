import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";


export class AsyncCustomValidator {


    static existingIdentification(_httpClient: HttpClient): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return _httpClient.get(`/api/customer/by/identification/${control.value}/`).pipe(
                map((result: any) => result.data ? { invalidAsync: true } : null)
            );
        };
    }

}




