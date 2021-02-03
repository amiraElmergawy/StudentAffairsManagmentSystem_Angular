import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe'
})
export class BooleanPipePipe implements PipeTransform {
 /**
   * 
0-> NO Execuse (Means that this grade is included in the comulative gpa)

1-> Execuse (Means that this grade is NOT calculated with the gpa)

   */
  transform(value: number): string {
    if (value == 0) {
      return "لا يوجد";
    } else if (value == 1) {
      return "يوجد ";
    }
  }

}
