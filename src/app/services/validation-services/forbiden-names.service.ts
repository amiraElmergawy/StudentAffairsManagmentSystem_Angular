import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ForbidenNamesService {
  constructor() {}
  // forbiddenNames fun. check for the entered name if it is already exist
  // when the user create (fill a form) it takes all the already exist names and returns null if this name is not found
  // or error message ('nameIsForbidden': true) if it exist
  // if operation is update then the user can choose the current name again and change another value of the form
  // but still forbidden to type an already exist name of another object
  // so it take the current index (id) of the obj. if it is update op.
  forbiddenNames(forbiddenNames: string[], currentIndex?: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      // console.log(currentIndex);
      // console.log(control.value);
      if (control.value != null) {
        if (
          forbiddenNames?.indexOf(control.value) != -1 &&
          forbiddenNames?.indexOf(control.value) + 1 != currentIndex
        ) {
          // the enetred value is already exist
          //console.log(forbiddenNames?.indexOf(control.value));
          return { 'nameIsForbidden': true };
        }
        return null; // name is not exist or the user update current object without changing the name
        // }
        // return null; // control field value is empty
      }
    };
  }
}
