import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FuseValidators
{
    /**
     * Check for empty (optional fields) values
     *
     * @param value
     */
    static isEmptyInputValue(value: any): boolean
    {
        return value == null || value.length === 0;
    }

    /**
     * Must match validator
     *
     * @param controlPath A dot-delimited string values that define the path to the control.
     * @param matchingControlPath A dot-delimited string values that define the path to the matching control.
     */
    static mustMatch(controlPath: string, matchingControlPath: string): ValidatorFn
    {
        return (formGroup: AbstractControl): ValidationErrors | null => {

            // Get the control and matching control
            const control = formGroup.get(controlPath);
            const matchingControl = formGroup.get(matchingControlPath);

            // Return if control or matching control doesn't exist
            if ( !control || !matchingControl )
            {
                return null;
            }

            // Delete the mustMatch error to reset the error on the matching control
            if ( matchingControl.hasError('mustMatch') )
            {
                delete matchingControl.errors.mustMatch;
                matchingControl.updateValueAndValidity();
            }

            // Don't validate empty values on the matching control
            // Don't validate if values are matching
            if ( this.isEmptyInputValue(matchingControl.value) || control.value === matchingControl.value )
            {
                return null;
            }

            // Prepare the validation errors
            const errors = {mustMatch: true};

            // Set the validation error on the matching control
            matchingControl.setErrors(errors);

            // Return the errors
            return errors;
        };
    }

    static passwordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

        let value: string = control.value || '';

        if (!value) {
            return null
        }

        if (value.length < 8) {
            return { passwordStrength: `Password must contain at least 8 characters` };
        }

        // let upperCaseCharacters = /[A-Z]+/g
        // if (upperCaseCharacters.test(value) === false) {
        //     return { passwordStrength: `Password must contain at least 1 upper case letter` };
        // }

        // let lowerCaseCharacters = /[a-z]+/g
        // if (lowerCaseCharacters.test(value) === false) {
        //     return { passwordStrength: `text has to contine lower case characters,current value ${value}` };
        // }


        let numberCharacters = /[0-9]+/g
        if (numberCharacters.test(value) === false) {
            return { passwordStrength: `Password must contain at least 1 number` };
        }

        let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        if (specialCharacters.test(value) === false) {
            return { passwordStrength: `Password must contain at least 1 special character` };
        }
        return null;
    }
}
