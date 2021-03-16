import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main-service";
import { ActivatedRoute, Router } from "@angular/router";
import { SpecialServices } from "src/app/services/special-services.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { CoursePreRequest } from "src/app/classes/dbClasses/course/course-pre-request";
import { FlashMessagesService } from "angular2-flash-messages";
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: "app-course-prerequisites-show",
  templateUrl: "./course-prerequisites-show.component.html",
  styleUrls: ["./course-prerequisites-show.component.scss"],
})
export class CoursePrerequisitesShowComponent implements OnInit {
  data;
  packages: [{}];
  // variables for update form
  updateFlag: boolean = false;
  courses = null;
  coursesOperation = [
    "اجتياز متطلب واحد", //or
    "اجتياز جميع المتطلبات معا", //and
  ];
  packagesOperation = [
    "اجتياز مجموعة متطلبات واحدة", //or
    "اجتياز كل المجموعات معا", //and
  ];
  //dropdownList handling variables;
  selectedCourses = "";
  dropdownSettings: IDropdownSettings = {};

  /****************** */
  package = new CoursePreRequest(null, null, null);
  coursesIds = [{
    course_id: 0,
    package_id: 0
  }]; //for prerequisite courses
  updatedData;
  addingFlag: boolean = false;
  packageId: number;
  originalPackagesNumber: number;
  courseId: number; //id for course which we want to add this prequistes to
  programId: number; //id for program which the package of the course in
  coursePackageId: number; //id for package which the course in
  semesterNo: number; //id for semester of the course
  addingAnotherPackagesArray;
  authorizedList;
  constructor(
    private service: SpecialServices,
    private dataService: MainService,
    private actRoute: ActivatedRoute,
    private storage: LocalStorageService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
      //console.log(this.authorizedList);
    }
    ngOnInit(): void {
      if (!this.authorizedList['program.insert-prerequisites'] &&
      !this.authorizedList['program.get-prerequisites'] &&
      !this.authorizedList['programs.delete-prepackages']) {
        this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
        this.router.navigate(['/home']);
      } else{
        this.actRoute.params.subscribe(params => {
          //console.log(params);
          this.programId = +params.programId;
          this.courseId = +params.courseId;
          this.semesterNo = +params.semesterNo;
          this.coursePackageId = +params.coursePackageId;
        });
        this.show();
        this.getCourses();
      }
    }
    // show fun used to get all prerequisites of the course in a specific program
    // firstly get the program data, search for our course in this data by its id in each package of the program
    // then get its prePackages
    async show() {
    this.dataService.pathName = "programs/" + this.programId;
    let programData: any = await this.dataService.show();
    //console.log(programData);
    //var courseIndex: number;
    let packageIndex = programData?.packages.map(i => i?.id).indexOf(this.coursePackageId);
    //console.log(programData.packages);
    //console.log(packageIndex);
    let courseIndex = programData.packages[packageIndex]?.courses.map(i => i.id).indexOf(this.courseId);
    // console.log(programData.packages[packageIndex]?.courses);
    this.data = programData.packages[packageIndex].courses[courseIndex];
    // programData.packages.courses?.forEach(element => {
      //   if (element.id == this.courseId) {
        //   }
        //console.log(this.data?.prePackages);
        let temp = this.data?.prePackages;
        this.addingAnotherPackagesArray = temp;
    this.originalPackagesNumber = this.data?.prePackages.length;
  }

  // deletion process:
  // redirct service path name (url) and send the id of deleted package to server
  async delete(packageId) {
    if (this.authorizedList['programs.delete-prepackages']) {
      this.service.pathName = "programs/" + this.courseId + "/prepackages";
      //console.log("packId from table: ");
      //console.log(packageId);
      var format = {
        ids: [packageId],
      };
      //console.log("var format: ");
      //console.table(format);
      await this.service.deleteProgramPackage(format);
      //console.log("going to excute show request.....");
      await this.show();
    } else {
      this.flashMessage.show('غير مصرح القيام بهذه العملية', { cssClass: 'flash_danger' });
    }
  }
  // deleteAll used to delete all current exist packages
  // push all ids of current data into an array then send this array to server
  async deleteAll() {
    if (this.authorizedList['programs.delete-prepackages']) {
      let allIds = [0];
      this.service.pathName = "programs/" + this.courseId + "/prepackages";
      this.data.prePackages.forEach((element) => {
        allIds.push(element?.id);
      });
      allIds.shift(); // to delete the initial data (dumy-data)
      var format = {
        ids: allIds,
      };
      await this.service.deleteProgramPackage(format);
      //this.flashMessage.show("تم مسح المتطلبات بنجاح", { timeout: 2000 });
      await this.show();
    } else {
      this.flashMessage.show('غير مصرح القيام بهذه العملية', { cssClass: 'flash_danger' });
    }
  }
  // handling the dropDown Selection List process
  //getCourses function to get our course data to access its prePackages
  async getCourses() {
    this.dataService.pathName = "programs/" + this.programId + "/" + this.semesterNo + "/prerequisites";
    this.courses = await this.dataService.index();
    //console.log(this.courses);
    //this.courses.splice(this.ownerCourseId - 1, 1); // to delete owner course so that user can't choose this course to be a prerequisite of itself
    this.dropdownSettings = {
      singleSelection: false,
      idField: "course_id",
      textField: "course_code",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
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
  }
  // onItemDeSelect func. to handle the event when deSelecting one item from the select list
  // it takes the event item(prerequisite-course) and delete its id from package courses
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
  // update Process:
  // updateFormAppearance func. take the package id to update it, make the form update appear
  // make the form of adding the other package to disappear if it exists
  updateFormAppearance(packageId) {
    this.clear(); //to make sure that there is no data
    // if (!this.courses) {
    //   this.getCourses();
    // }
    this.addingFlag = false;
    this.updateFlag = true;
    this.packageId = packageId;
  }
  // update func. take the data from update form and format it then send it to srever
  // update the data from server response to show the updated data
  // and reset the form inputs
  async update() {
    if (this.authorizedList['program.insert-prerequisites']) {
      this.service.pathName = 'programs/' + this.programId + '/' + this.semesterNo + '/' + this.courseId + '/prerequisites';
      this.coursesIds.shift(); // to delete the first element (dummy)
      var selectedPrerequisites = this.coursesIds; // to save fixed data of selected courses
      if (selectedPrerequisites.length == 1) { // if user select only one course the operation will be 1 OR
        this.package.coursesOperation = 1;
      }
      var package1 = {
        id: this.packageId,
        coursesOperation: this.package.coursesOperation,
        courses: selectedPrerequisites,
        operationWithNext: this.package.operationWithNext,
      };
      //var json = JSON.stringify([package1]);
      var format = {
        "package_id": this.coursePackageId,
        "packages": [package1]
      };
      //console.table(format);
      await this.service.coursePrerequisites(format);
      //this.flashMessage.show("تمت اضافة المتطلبات بنجاح", { timeout: 2000 });
      this.show();
      this.clear(); //to make sure that there is no data
      //this.selectedCourses = ' ';
    } else {
      this.flashMessage.show('غير مصرح القيام بهذه العملية', { cssClass: 'flash_danger' });
    }
  }
  // add another package process:
  // adding Another package func. reset the form inputs if exist
  // convert courses array of each package to array of ids(format)
  // appear the adding form and disappear the other form if exists
  addingAnotherPackage() {
    //if (this.authorizedList['program.insert-prerequisites']){
    this.clear(); //to make sure that there is no data
    if (this.courses == null) {
      //console.log("if-case");
      this.getCourses();
    }
    // to change all the courses from course-object into just array of ids
    // create a dummy array to save the ids then exchange it with the original array of courses
    this.addingAnotherPackagesArray.forEach((element) => {
      let coursesArray = [
        {
          package_id: 0,
          course_id: 0
        }
      ];
      //console.log(this.courses);
      for (let index = 0; index < element.courses?.length; index++) {
        let itemIndex = this.courses.map(i => i.course_id).indexOf(element.courses[index].id);
        coursesArray.push({
          package_id: this.courses[itemIndex].package_id,
          course_id: this.courses[itemIndex].course_id
        });
      }
      coursesArray.shift();//to delete dummy initial data
      element.courses = coursesArray;

    });
    //console.log(this.addingAnotherPackagesArray);
    this.updateFlag = false;
    this.addingFlag = true;
    // } else {
    //   this.flashMessage.show('غير مصرح القيام بهذه العملية',{cssClass:'flash_danger'});
    // }
  }
  // save package function redirct the service pathName to the specific api request
  // take data from adding form
  // send data to server and take server response to show the updated data
  async savePackage() {
    if (this.authorizedList['program.insert-prerequisites']) {
      this.service.pathName = 'programs/' + this.programId + '/' + this.semesterNo + '/' + this.courseId + '/prerequisites';
      this.coursesIds.shift(); // to delete the first element (dummy)
      var selectedPrerequisites = this.coursesIds; // to save fixed data of selected courses
      if (selectedPrerequisites.length == 1) { // if user select only one course the operation will be 1 OR
        this.package.coursesOperation = 1;
      }
      var package1 = {
        id: null,
        coursesOperation: this.package.coursesOperation,
        courses: selectedPrerequisites,
        operationWithNext: null,
      };
      this.addingAnotherPackagesArray[
        this.originalPackagesNumber - 1
      ].operationWithNext = this.package.operationWithNext;
      this.addingAnotherPackagesArray.push(package1);
      var format = {
        "package_id": this.coursePackageId,
        "packages": this.addingAnotherPackagesArray
      };
      //console.log(format);
      await this.service.coursePrerequisites(format);
      this.show();
      //console.log(this.updatedData);
      //this.flashMessage.show("تمت اضافة المتطلبات بنجاح", { timeout: 2000 });
      this.clear(); //to make sure that there is no data
    } else {
      this.flashMessage.show('غير مصرح القيام بهذه العملية', { cssClass: 'flash_danger' });
    }
  }
  //clear() fun to reset entered data
  clear() {
    this.selectedCourses = "";
    this.coursesIds = [{
      package_id: 0,
      course_id: 0
    }];
    this.package = new CoursePreRequest(null, null, null);
  }
}
