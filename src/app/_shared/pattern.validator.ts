// Angular Or Third Party Imports
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

// patternValidator abstract control check
export function patternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { patternInvalid: { regexp } } : null;
  };
}



