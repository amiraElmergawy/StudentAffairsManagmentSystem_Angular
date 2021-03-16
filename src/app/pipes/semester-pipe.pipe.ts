import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semesterPipe'
})
export class SemesterPipePipe implements PipeTransform {

  /**
   * 
1-> First semester of the academic year

2-> Second semester of the academic year

3-> Summer (the third one in the academic year)
   */
  transform(value: number): string {
    if (value == 1) {
      return "فصل الخريف";
    } else if (value == 2) {
      return "فصل الربيع";
    } else { // == 3
      return "الفصل الصيفي";
    }
  }

}
