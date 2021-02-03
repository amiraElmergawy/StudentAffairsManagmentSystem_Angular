import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Component, OnInit } from "@angular/core";
import { SpecialServices } from "src/app/services/special-services.service";
import { CoursePreRequest } from "src/app/classes/dbClasses/course/course-pre-request";
import { MainService } from "src/app/services/main-service";
import { ActivatedRoute, Router } from "@angular/router";
// import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: "app-course-prerequisites-creation",
  templateUrl: "./course-prerequisites-creation.component.html",
  styleUrls: ["./course-prerequisites-creation.component.scss"]
})
export class CoursePrerequisitesCreationComponent implements OnInit {
  //*********** html variables declaration*/
  courses;
  coursesOperation = [
    "اجتياز متطلب واحد", //or
    "اجتياز جميع المتطلبات معا", //and
  ];
  packagesOperation = [
    "اجتياز مجموعة متطلبات واحدة", //or
    "اجتياز كل المجموعات معا", //and
  ];
  //dropdownList handling variables;
  selectedCourses = '';
  dropdownSettings: IDropdownSettings = {};

  /****************** */
  courseId: number; //id for course which we want to add this prequistes to
  programId: number; //id for program which the package of the course in
  coursePackageId: number; //id for package which the course in
  semesterNo: number; //id for semester of the course
  coursesIds = [{
    course_id: 0,
    package_id: 0
  }]; //for prerequisite courses
  package = new CoursePreRequest(null, null, null);
  packages = [];
  createdData;
  addAnotherFlag: boolean = false;
  enteredPackagesNo: number = 0;
  prerequisitesArray = [{ // initialize with dummy data
    id: null,
    coursesOperation: this.package.coursesOperation,
    courses: this.coursesIds,
    operationWithNext: this.package.operationWithNext
  }];
  authorizedList;
  constructor(
    private packageService: SpecialServices,
    private coursesService: MainService,
    private actRoute: ActivatedRoute,
    private storage: LocalStorageService,
    private flashMessage: FlashMessagesService,
    private router: Router
    //private flashMessage: FlashMessagesService

  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    //this.ownerCourseId = this.actRoute.snapshot.params.id.valueOf();
    // create a preRequisite package id must be null
  }

  ngOnInit(): void {
    if (!this.authorizedList['program.insert-prerequisites']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']); 
    }
    //this.actRoute.queryParams.subscribe(params => {
    this.actRoute.params.subscribe(params => {
      //console.log(params);
      this.programId = +params.programId;
      this.courseId = +params.courseId;
      this.semesterNo = +params.semesterNo;
      this.coursePackageId = +params.coursePackageId;
    });
    //console.log(this.programId);
    //console.log(this.courseId);
    //console.log(this.semesterNo);
    //console.log(this.coursePackageId);
    this.getCourses();
  }

  // handling the dropDown Selection List process
  //getCourses function to get available prerequisites to our course
  async getCourses() {
    this.coursesService.pathName = "programs/" + this.programId + "/" + this.semesterNo + "/prerequisites";
    this.courses = await this.coursesService.index();
    //console.log(this.courses);
    //this.courses.splice(this.courseId-1,1); // to delete owner course so that user can't choose this course to be a prerequisite of itself
    this.dropdownSettings = {
      singleSelection: false,
      idField: "course_id",
      textField: "course_code",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  // onItemSelect func. to handle the event when selecting one item from the select list
  // it takes the event item(prerequisite-course) and push its id to package 
  onItemSelect(item: any) {
    //console.log(item);
    if (this.coursesIds.length >= this.courses.length) { //if user choose deselect all after choose select all then choose one course
      //then reinitialize array to remove dublications then take selection
      this.coursesIds = [{
        course_id: 0,
        package_id: 0
      }]; // to avoid duplication when user click more than on time "selectAll"  
      this.courses.forEach(element => {
        if (element.course_id == item.course_id) {
          //console.log(element);
          //console.log(item.package_id);
          this.coursesIds.push({
            course_id: element.course_id,
            package_id: element.package_id
          });
        }
      });
    } else { //their is no dublication and just take the selection
      this.courses.forEach(element => {
        if (element.course_id == item.course_id) {
          //console.log(element);
          //console.log(item.package_id);
          this.coursesIds.push({
            course_id: element.course_id,
            package_id: element.package_id
          });
        }
      });
    }
    //this.coursesIds.shift();// to delete the first element (dummy)
    //console.log(this.coursesIds);
    //this.package.courses = this.coursesIds;
  }
  // onSelectAll func. to handle the event when select all items from the select list
  // it takes the event items(prerequisite-courses) and save its ids 
  onSelectAll() {
    this.coursesIds = [{
      course_id: 0,
      package_id: 0
    }]; // to avoid duplication when user click more than on time "selectAll"
    for (let index = 0; index < this.courses.length; index++) {
      this.coursesIds.push({
        course_id: this.courses[index].course_id,
        package_id: this.courses[index].package_id
      });
    }
    //this.coursesIds.shift(); // to delete the first element (dummy)
    //console.log(this.coursesIds);
    //this.package.courses = this.coursesIds;
  }
  // onItemDeSelect func. to handle the event when deSelecting one item from the select list
  // it takes the event item(prerequisite-course) and delete its object by check the position of its id from package courses 
  onItemDeSelect(item: any) {
    var itemIndex: number;
    itemIndex = this.coursesIds.map(i => i.course_id).indexOf(item.course_id);
    //console.log(itemIndex);
    if (itemIndex != -1) {
      this.coursesIds.splice(itemIndex, 1);
    }
    //console.log(this.coursesIds);
    //this.package.courses = this.coursesIds;
  }
  //savepackage fun used to save the data entered in the form to be add as a prerequisite or to be saved in prequisites array 
  //untill user submit all the prerequisites
  // define a variable to save data then push it in prerequisites array 
  savePackage() { 
    this.coursesIds.shift(); // to delete the first element (dummy)
      var selectedPrerequisites = this.coursesIds; // to save fixed data of selected courses
      if (selectedPrerequisites.length == 1) { // if user select only one course the operation will be 1 OR
        this.package.coursesOperation = 1;
      }
      //console.log(this.prerequisitesArray);
      if (this.prerequisitesArray.length == 1) {
        //console.log('if case');
        var package1 = {
          id: null,
          coursesOperation: this.package.coursesOperation,
          courses: selectedPrerequisites,
          operationWithNext: null // will be null in first package
        };
        this.prerequisitesArray.push(package1);
        this.enteredPackagesNo = 1;
      } else if (this.prerequisitesArray.length > 1) {
        //console.log('if-else case');
        var package2 = {
          id: null,
          coursesOperation: this.package.coursesOperation,
          courses: selectedPrerequisites,
          operationWithNext: null // as it is the last package entered so its operation with next must be null
        };
        //console.log(this.prerequisitesArray[this.enteredPackagesNo]);
        this.prerequisitesArray[this.enteredPackagesNo].operationWithNext = this.package.operationWithNext;
        this.prerequisitesArray.push(package2);
        this.enteredPackagesNo++;
      }
      // else console.log('else case');
      //console.log(this.prerequisitesArray);
   
  }
  // addAnotherPackage fun used to save current entered data (call savePackage fun) , clear the form to add another package
  // (call clear fun) and appear the field of operation with previous package
  addAnotherPackage() {
    this.savePackage();
    this.clear();
    this.addAnotherFlag = true;
  }
  // addPrerequisites function redirct the service pathName to the specific api request
  // take data from adding form
  // send data to server and take server response to show the updated data
  async addPrerequisites() {
    if (this.authorizedList['program.insert-prerequisites']) {
    this.savePackage();
    //if (this.prerequisitesArray.length == 1) { // if user choose to add only one package
    //}
    this.prerequisitesArray.shift();
    this.packageService.pathName = 'programs/' + this.programId + '/' + this.semesterNo + '/' + this.courseId + '/prerequisites';
    // console.table(json);
    var format = {
      "package_id": this.coursePackageId,
      "packages": this.prerequisitesArray
    };
    //console.log(format);
    await this.packageService.coursePrerequisites(format);
    
    //console.log(this.createdData);
    //this.flashMessage.show("تمت اضافة المتطلبات بنجاح", { timeout: 2000 });
    this.clear()
  }
  }
  //clear() fun to reset entered data 
  clear() {
    this.selectedCourses = '';
    this.package = new CoursePreRequest(null, null, null);
    this.coursesIds = [{
      course_id: 0,
      package_id: 0
    }]; //for prerequisite courses
  }
}
