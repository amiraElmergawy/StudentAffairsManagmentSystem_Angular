import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "convertIdToName",
})
export class ConvertIdToNamePipe implements PipeTransform {
  // transform function take array of all data iclude id needed to be convert
  // if the id match a record in the array it will be converted to its name (return name)
  // and take the propertyName of needed value (like arName) to make the pipe more general 
  transform(value: number, dataArray, propName: string):any {
    let property1 = propName.valueOf();
    if (value != 0 && value != null) {
      if (propName != null && dataArray != null) {
        dataArray.forEach(element => {
          if (element.id == value) {
            console.log(propName);
            console.log(element?.property1);
            console.log(element);
            console.log(element.propName?.valueOf());
            return element.propName;
          }
        });
      }
    }
    return '';
  }
}
