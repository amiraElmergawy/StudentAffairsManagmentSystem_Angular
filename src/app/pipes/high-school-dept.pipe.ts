import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highSchoolDeptPipe"
})
export class HighSchoolDeptPipe implements PipeTransform {
  /**
   * hSDept = [
    "علمي رياضة",
    "علمي رياضة وما يعادله",
    "علمي علوم",
    "علمي علوم وما يعادله",
    "علمي علوم او رياضة",
    "علمي علوم او علمي رياضة او ما يعادلهم"
  ];
   */
  transform(value: number): string {
    switch (+value) {
      case 1:
        return "علمي رياضة";
      case 2:
        return "علمي رياضة وما يعادله";
      case 3:
        return "علمي علوم";
      case 4:
        return "علمي علوم وما يعادله";
      case 5:
        return "علمي علوم او رياضة";
      case 6:
        return "علمي علوم او علمي رياضة او ما يعادلهم";

      default:
        return "";
        
    }
  }
}
