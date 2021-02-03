import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'majorType'
})
export class MajorTypePipe implements PipeTransform {
 /**
   * 
1-> single major

2-> double major

3-> special
   */
  transform(value: number): string {
    if (value == 1) {
      return "  منفرد";
    } else if (value == 2) {
      return " مزدوج";
    } else { // == 3
      return " خاص";
    }
  }
}
