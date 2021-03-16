import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "coursesOpPipe"
})
export class CoursesOpPipe implements PipeTransform {
  //transform op. takes the course operation value and
  // returns its corresponding op. string to understand the output
  /*
          packagesOperation = [
            "اجتياز كل المجموعات معا", //and
            "اجتياز مجموعة متطلبات واحدة" //or
          ]; */
  /**coursesOperation = [
        "1", //and
      "2 " //or
      ];
  */
  transform(value: number): string {
    if (value == 1) {
      return "OR";
    } else {
      //2
      return "AND";
    }
  }
}
