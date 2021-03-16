import { Component, OnInit } from "@angular/core";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { MainService } from "src/app/services/main-service";
import { ActivatedRoute } from "@angular/router";
import { LinkService } from "src/app/services/link.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-program-link-courses",
  templateUrl: "./program-link-courses.component.html",
  styleUrls: ["./program-link-courses.component.scss"]
})
export class ProgramLinkCoursesComponent implements OnInit {
  //*********** html variables declaration*/
  courses;
  courseStatus = ["المقرر غير مفعل", "المقرر مفعل"];
  dropdownSettings: IDropdownSettings = {};
  /****************** */
  coursesArray: [
    {
      courseId: number;
      semester: number;
      activeStatus: boolean;
    }
  ];
  programId: number;
  createdData;
 // packegesAddingFlag: boolean = false;
  programForm: FormGroup;
  selectedCourseId: number;
  constructor(
    private courseService: MainService,
    private lService: LinkService,
    private actRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {
    this.programId = this.actRoute.snapshot.params.id.valueOf();
  }
  // getCourses to get all exist courses to choose from 
  // it just redirct the service path name and get response (courses) from server
  async getCourses() {
    this.courseService.pathName = "courses";
    this.courses = await this.courseService.index();
  }

  ngOnInit(): void {
    this.getCourses();
    this.dropdownSettings = {
      singleSelection: true,
      idField: "id",
      textField: "arName",
      closeDropDownOnSelection: true,
      allowSearchFilter: true
    };
    this.coursesArray = [
      {
        courseId: null,
        semester: null,
        activeStatus: null
      }
    ];
    this.programForm = new FormGroup({
      'resetSelect': new FormControl('', Validators.required), //this form control only used to reset the selected course and to be sure that there is selected course
      'activeStatus': new FormControl(null, Validators.required),
      'semester': new FormControl(null, [
        Validators.required,
        Validators.pattern("[1-8]") // to force user type from 1 to 8 only and don't type any signs
      ])
    });
    // this.programForm.valueChanges.subscribe(value =>
    //   console.log(this.programForm)
    // );
    // this.programForm.statusChanges.subscribe(status => console.log(status));
  }

  onItemSelect(item: any) {
    this.selectedCourseId = item.id; //take course id
  }

  onItemDeSelect() {
    this.selectedCourseId = null; // as the it is single selection
  }
  // addCourse func. put enterd data into object (format it) then push it to courses array
  addCourse() {
    var course = {
      'courseId': this.selectedCourseId,
      'semester': this.programForm.get("semester").value,
      'activeStatus': this.programForm.get("activeStatus").value
    };
    this.coursesArray.push(course);
    this.coursesArray.shift();// to delete the initial dummy data
  }
  // linkCourses fun. used to send data to server
  // it redirects the service path name (url), put data into obj (format it) then send it to server and take the respons
  // finally fire a flash message to assure that data sent succcessfully 
  async linkCourses() {
    this.lService.pathName = "programs/" + this.programId + "/link/courses";
    this.addCourse();
    var format = {
      'courses': this.coursesArray
    };
    //console.log(format);
    this.createdData = await this.lService.link(format);
    //console.log(this.createdData);
    this.flashMessage.show("تمت اضافة مقررات بنجاح", { timeout: 2000 });
  }
 // addingAnotherCourse fun. call addCourse to take the enterd data and reset the form to enable user eneterd new
  addingAnotherCourse() {
    this.addCourse();
    this.clear();
  }
  // clear fun reset the form to enable user eneterd new
  clear() {
    this.programForm.reset();
    this.selectedCourseId = null;
  }
}
