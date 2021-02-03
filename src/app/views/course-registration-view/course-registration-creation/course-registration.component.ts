import { Component, OnInit, NgZone } from "@angular/core";
import { CourseRegistration } from "src/app/classes/dbClasses/courseRegistration/course-registration";
import { MainService } from "src/app/services/main-service";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: "app-course-registration",
  templateUrl: "./course-registration.component.html",
  styleUrls: ["./course-registration.component.scss"]
})
export class CourseRegistrationComponent implements OnInit {
  //filteringWays to handling the filtering way that user prefer
  filteringWays = [
    'الاسم',
    'الكود'
  ];
  filteringWay: number = null;//used to catch the way of searching string and will be assgind to filtering pipe to filter only with the specified way
  // studentId: number; // student who register courses for
  courses = null; // the available courses for student
  registredCourses = new CourseRegistration(null, [{
    course: 0,
    package: 1
  }]);// registered courses declared with dummy data to can access it
  showSelectedCourses;
  createdRegistration;
  studentData;
  courseData;
  nationalities;// to save nationalities coming from get nationalities request
  studentNationality: string;
  filteredValue: string;//used to catch the value of searching string and will be assgind to filtering pipe to show only filtered courses
  unitsNo: number; // used to calculate total number of registered units
  // simply sum all units of registered courses
  restUnitsNo: number;
  popUpFlag: boolean = false;
  popUpLink: string;
  popUpCloseLink: string;
  checkBox: boolean = false;
  registrationStatus: boolean;
  authorizedList;
  constructor(
    private dataService: MainService,
    private actRoute: ActivatedRoute,
    private popUpDataService: SharingDataService,
    private ngZone: NgZone,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.registredCourses.studentId = +this.actRoute.snapshot.params.id; // take the student id to registr his courses
    this.popUpLink = 'register-courses-for-student/' + this.registredCourses.studentId + '#popup1';
    this.popUpCloseLink = 'register-courses-for-student/' + this.registredCourses.studentId;
  }
  //   showFlash(message:string) {
  //     // 1st parameter is a flash message text
  //     // 2nd parameter is optional. You can pass object with options.
  //     this.flashMessage.show(message, { cssClass: 'flash-success', timeout: 2000 });
  // }

  ngOnInit(): void {
    if (!this.authorizedList['course-registrations.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getRegistrationStatus();
      this.getStudentData();
      this.getNationalities();
      this.getCourses();
      //console.log(this.filteringWays);
      this.showSelectedCourses = [
        {
          id: 8,
          arCode: "102 انج",
          enCode: "ENGL 102",
          arName: "لغة إنجليزية (1)",
          enName: "English 1",
          hours: 2,
          degree: 100,
          description: "English 1",
          available: 1,
          packageId: 3,
          degreeTemplate: {
            id: 6,
            theory: 100,
            activity: 0,
            oral: 0,
            practical: 0,
            exercise: 0
          },
          weeklyHoursTemplate: {
            id: 18,
            theory: 2,
            exercise: 0,
            practical: 0
          },
          prePackages: []
        }
      ];
      this.unitsNo = 0;
      this.filteredValue = '';
      this.filteringWay = 0;
      //this.calcRestUnitsNo(0);
      this.courses?.subscribe(
        () => {
          this.ngZone.run(() => {
          });
        }
      );
    }
  }
  //getRegistrationStatus function used to check if the student registration is stoped or not
  async getRegistrationStatus() {
    this.dataService.pathName = 'students/' + this.registredCourses.studentId + '/registration/status';
    var statusResponse = null;
    statusResponse = await this.dataService.show();
    //console.log(statusResponse);
    if (statusResponse) {
      this.registrationStatus = statusResponse.reg_status;
      //console.log(this.registrationStatus);
    }
  }
  // getNationalities function used to get all current nationalities to send them to the pipe 
  // and convert the nationality id into the country name
  async getNationalities() {
    this.dataService.pathName = "nationalities";
    this.nationalities = await this.dataService.index();
    this.nationalities.forEach(element => {
      if (element.id == this.studentData?.additionalInfo?.nationalitiesId) {
        this.studentNationality = element.countryArName;
      }
    });
    if (this.studentNationality) {
      this.studentNationality += 'ي';
    } else {
      this.studentNationality = '';      
    }
    //console.log(this.nationalities);
  }
  // getCourses func. take the student id and give his available courses
  // redirct service pathName to api routing link the save the available courses of student(by id) in courses array
  async getCourses() {
    //console.log("geting courses process is excuting....");
    this.dataService.pathName =
      "students/" + this.registredCourses.studentId + "/available-courses";
    this.courses = await this.dataService.index();
    //console.log(this.courses);
    if (this.courses == null || this.courses.length == 0) {
      this.flashMessage.show("لا يوجد مقررات متاحة للتسجيل", { cssClass: 'flash_danger', timeout: 5000 });
      this.router.navigate(['/no-longer-page/']);
    }
    console.log(this.courses);
  }
  //getStudentData func. needed to show student's datato ensure his data
  async getStudentData() {
    this.dataService.pathName = "students/" + this.registredCourses.studentId;
    this.studentData = await this.dataService.show();
    //console.log(this.studentData);
    this.popUpDataService.setData(this.studentData);
    await this.calcRestUnitsNo(0);
  }
  // calcRestUnitsNo func. used to calculate the remain units to be rgistered
  calcRestUnitsNo(units: number) {
    if (this.restUnitsNo == null) {
      if ((this.studentData?.currentTotalQP / this.studentData?.currentTotalHours) >= 2 || this.studentData?.currentTotalHours <= 19) { // calc. student and check to know the student's vailable units
        this.restUnitsNo = 19;
      } else { // student GPA less than 2
        this.restUnitsNo = 12;
      }
    } else {
      this.restUnitsNo -= units; // to sub. the registered course units from the total units available for student
    }
  }
  // onChange func. catch the event on checking box and select or unSelected course
  // generally it takes the clicked course and check
  // if the course selected push it in registredCourses array else (unchecked) remove the couse from the array
  onChange(course: any, isChecked: boolean) {
    var selectedCourse = {
      course: 0,
      package: 1
    };
    selectedCourse.course = course.id;
    selectedCourse.package = course.packageId;
    //console.log(selectedCourse);
    if (isChecked) {
      this.registredCourses.courses.push(selectedCourse);
      //this.showSelectedCourses.shift();
      this.showSelectedCourses.push(course);
      //console.log(course.hours);
      this.unitsNo += course.hours;
      this.calcRestUnitsNo(course.hours);
      //console.log("selected courses: ");
      // console.table(selectedCourse);
      // console.log("registerd courses after checking: ");
      // console.table(this.registredCourses);
    } else {
      let index = this.registredCourses.courses.indexOf(selectedCourse);
      this.registredCourses.courses.splice(index, 1);
      let index1 = this.showSelectedCourses.indexOf(course);
      this.showSelectedCourses.splice(index1, 1);
      this.unitsNo -= course.hours;
      this.calcRestUnitsNo(-course.hours);// to sum that value to total again
      // console.log("selected courses: ");
      // console.table(selectedCourse);
      // console.log("registerd courses after deleting: ");
      // console.table(this.registredCourses);
    }
    if (this.restUnitsNo < 0) {
      this.flashMessage.show("لا يجب اضافة مقررات تفوق الحد الاقصي من عدد الساعات", { cssClass: 'flash_danger', timeout: 2000 } );
    }
  }
  // showCourseDetails func. take course that needs to be shown
  // and show it in the pop-up window
  showCourseDetails(course: any) {
    //fire pop-up window to show course details
    //this.courseData = course;
    this.popUpDataService.setData(course);
    //console.table(course);
    this.popUpFlag = true;
  }
  closePopUp() {
    this.popUpFlag = false;
  }
  // saveRegistration func. redirect service pathName to excute the request
  // convert the registration to JSON object , send request and save its response
  saveRegistration() {
    if (this.authorizedList['course-registrations.store']) {
      this.dataService.pathName = 'course-registrations';
      this.registredCourses.courses.shift(); // remove the dummy data in the first declaration
      // var json = JSON. (this.registredCourses);
      // console.log(json);
      //console.log(this.registredCourses);
      this.createdRegistration = this.dataService.create(this.registredCourses);
      this.getCourses();
      this.showSelectedCourses = [
        {
          id: 8,
          arCode: "102 انج",
          enCode: "ENGL 102",
          arName: "لغة إنجليزية (1)",
          enName: "English 1",
          hours: 2,
          degree: 100,
          description: "English 1",
          available: 1,
          packageId: 3,
          degreeTemplate: {
            id: 6,
            theory: 100,
            activity: 0,
            oral: 0,
            practical: 0,
            exercise: 0
          },
          weeklyHoursTemplate: {
            id: 18,
            theory: 2,
            exercise: 0,
            practical: 0
          },
          prePackages: []
        }
      ];
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  // clear func. is used to reset all the selected courses
  // clear(){
  //   this.checkBox = false;
  // }
}
