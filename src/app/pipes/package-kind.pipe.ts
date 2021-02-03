import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'packageKindPipe'
})
export class PackageKindPipe implements PipeTransform {
 /**
   * 
1=> package is normal and it contains only FORCED courses
2=> package is normal and it contains OPTIONAL courses
3=> package is normal and it contains UNIVERSITY courses (optional)
   */
  transform(value: number): string {
    if (value == 1) {
      return " اجباري";
    } else if (value == 2) {
      return " اختياري";
    } else { // == 3
      return " متطلب جامعي";
    }
  }

}
