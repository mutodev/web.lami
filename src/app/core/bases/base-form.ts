import { FormGroup, FormArray, FormControl } from "@angular/forms";

export abstract class BaseForm {

  public id: string;
  formGroup: FormGroup;
  public actionName: string;
  formFieldHelpers: string[] = [''];
  
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
}