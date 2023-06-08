import { UntypedFormGroup, UntypedFormControl, UntypedFormArray } from "@angular/forms";
import { ReplaySubject } from "rxjs";

export abstract class BaseModelAbs {

  public form: UntypedFormGroup;
  public id: any;
  public nombreAccion: string;
  public urlApi: string;
  public fileCount: number;

  protected filterData(filter, data: any[], ctr: UntypedFormControl, filteredData: ReplaySubject<any[]>) {
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

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormArray) {
        const list = formGroup.controls[field] as UntypedFormArray;
        list.controls.forEach((controlV: UntypedFormGroup) => {
            this.validateAllFormFields(controlV);
        });
      }
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
   
}
