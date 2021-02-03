import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import { Prepackage } from 'src/app/classes/dbClasses/program/prepackage';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from 'src/app/services/link.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: "app-create-package",
  templateUrl: "./create-package.component.html",
  styleUrls: ["./create-package.component.scss"]
})
export class CreatePackageComponent implements OnInit {
  courses;
  kinds = [
    "تحوي المقررات الاجبارية فقط",
    "تحوي المقررات الاختيارية ",
    "تحوي المتطلبات الجامعية"
  ];
  //dropdownList handling variables;
  //selectedCourses = null;
  dropdownSettings: IDropdownSettings = {};
  /****************** */
  programForm: FormGroup;
  programId: number; //id for program to add this prequistes to
  coursesIds: number[] = [0]; //for collecting prerequisite courses
  // package= new Prepackage(null,null,null,null,null);
  packages = [];
  createdData;
  authorizedList;
  constructor(
    private courseService: MainService,
    private lService: LinkService,
    private actRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.programId = this.actRoute.snapshot.params.id.valueOf();
  }

  ngOnInit(): void {
    if (!this.authorizedList['packages.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.lService.pathName = "programs/" + this.programId + "/create-packages";
    this.getCourses();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "arName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.programForm = new FormGroup({
      'selectedCourses': new FormControl('', Validators.required),
      'kind': new FormControl(null, Validators.required),
      'hoursToReg': new FormControl(null, [
        Validators.required,
        Validators.pattern("[1-9][0-9]*")
      ]),
      'semester': new FormControl(null, [
        Validators.required,
        Validators.pattern("[1-8]")
      ]),
      'orderOfShowing': new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]+")
      ])
    });
    // this.programForm.valueChanges.subscribe(value =>
    //   //console.log(this.programForm)
    // );
    // this.programForm.statusChanges.subscribe(status => console.log(status));
  }
}
// getCourses to get all exist courses to choose from
  // it just redirct the service path name and get response (courses) from server
  async getCourses() {
    this.courseService.pathName = "courses";
    this.courses = await this.courseService.index();
  }

  onItemSelect(item: any) {
    if (this.coursesIds.length <= this.courses.length) {
      this.coursesIds.push(item.id);
    } else {
      this.coursesIds = [0];
      this.coursesIds.push(item.id);
    }
    //console.log(this.coursesIds);
    //this.coursesIds.shift();
    //this.selectedCourses = this.coursesIds;
    //console.log(this.selectedCourses);
  }
  onSelectAll(items: any) {
    this.coursesIds = [0]; // to avoid duplication when user click more than on time "selectAll"
    for (let index = 0; index < items.length; index++) {
      this.coursesIds.push(items[index].id);
    }
    //this.coursesIds.shift(); // as we declare the first element with a dummy data so must delete it.
    //this.selectedCourses = this.coursesIds;

    //console.log(this.selectedCourses);
    //console.log(this.coursesIds);
    //console.log(this.selectedCourses);
  }
  onItemDeSelect(item: any) {
    var itemIndex: number = this.coursesIds.indexOf(item.id);
    if (itemIndex != -1) {
      this.coursesIds.splice(itemIndex, 1); // delete the item that user deselect
    }
    //this.coursesIds.shift();
    //this.selectedCourses = this.coursesIds;
    //this.coursesIds = [0];
    //console.log(this.coursesIds);
  }
    // savePackage func. put enterd data into object (format it) then push it to packages array
  savePackage() {
    this.coursesIds.shift();
    //console.log(this.selectedCourses);
    var package1 = {
      'id': null,
      'kind': +this.programForm.get("kind").value,
      'hoursToReg': this.programForm.get("hoursToReg").value,
      'semester': this.programForm.get("semester").value,
      'orderOfShowing': this.programForm.get("orderOfShowing").value,
      'courses': this.coursesIds
    };
    this.packages.push(package1);
    // this.package = new Prepackage(null,null,null,null,null);
    // this.selectedCourses = null;
    // this.coursesIds = [0];
  }
  // createPackage fun. used to send data to server
  // it puts data into obj (format it) then send it to server and take the response
  // fire a flash message to assure that data sent succcessfully
  // finally, call clear fun. to clear form
  async createPackage() {
    this.savePackage();
    var format = {
      "packages": this.packages
    };
    //console.log(format);
    this.createdData = await this.lService.link(format);
    //console.log(this.createdData);
    //this.flashMessage.show("تمت اضافة المتطلبات بنجاح", { timeout: 2000 });
    // this.clear();
  }
  // clear fun reset all form-inputs
  clear() {
    this.programForm.reset();
    //this.selectedCourses = null;
    this.coursesIds = [0];
    this.packages = [];
  }
}
