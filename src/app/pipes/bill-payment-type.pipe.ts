import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billPaymentTypePipe'
})
export class BillPaymentTypePipe implements PipeTransform {

  /**
   * 
1=> collage/university expences
2=> summer courses
3=> faild retaken courses
4=> special program
*/
  transform(value: number): string {
    if (value == 1) {
      return "مصاريف العام الدراسي";
    } else if (value == 2) {
      return "مصاريف مقررات الفصل الصيفي";
    }else if (value == 3) {
      return "مصاريف اعادة المقررات";
    } else { // == 4
      return "مصاريف برنامج خاص";
    }
  }

}
