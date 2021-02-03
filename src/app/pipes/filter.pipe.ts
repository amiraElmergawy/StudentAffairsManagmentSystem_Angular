import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: number): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }else{
    if(propName == 0){
      const resultArray = [];
      for (const item of value) {
        if (item['arName'].includes(filterString)) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }else {//propName == 1 ==> user want to filter by course-code
      const resultArray = [];
      for (const item of value) {
        if (item['enCode'].includes(filterString.toUpperCase())) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }
}
}
