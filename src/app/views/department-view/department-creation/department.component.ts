import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main-service";
import { ForbidenNamesService } from "src/app/services/validation-services/forbiden-names.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"]
})
export class DepartmentComponent implements OnInit {
  // html variables
  //vertuality = ["قسم موجود", "قسم غير موجود"];
  hSDept = [
    "علمي رياضة",
    "علمي رياضة وما يعادله",
    "علمي علوم",
    "علمي علوم وما يعادله",
    "علمي علوم او رياضة",
    "علمي علوم او علمي رياضة او ما يعادلهم"
  ];
  ////////////////////
  data;
  createdData;
  currentDepartmentArNames: string[];
  currentDepartmentEnNames: string[];
  departmentForm: FormGroup;
  authorizedList;
  constructor(
    private service: MainService,
    private storage: LocalStorageService,
    private validationService: ForbidenNamesService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.service.pathName = "departments";
    this.currentDepartmentArNames = [""];
    this.currentDepartmentEnNames = [""];
  }
  ngOnInit(): void {
    if (!this.authorizedList['departments.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    this.getDepartments();
    this.departmentForm = new FormGroup({
      'arName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("([\u0621-\u064A]{4,}(\u0020)?)+"), // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
        //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        this.validationService.forbiddenNames(this.currentDepartmentArNames)
      ]),
      'enName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("[A-Z]([a-zA-Z]{4,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        this.validationService.forbiddenNames(this.currentDepartmentEnNames)
      ]),
      // 'isVirtual': new FormControl(null),
      'hSDept': new FormControl(null)
    });
    // this.departmentForm.valueChanges.subscribe(value =>
    //   //console.log(this.departmentForm)
    // );
    // this.departmentForm.statusChanges.subscribe(status => console.log(status));
  }
  // getDepartments used to get all current departments then extract thier names to compare the enterd department name with every current name to not repeat it again
  // then send it to validation service to do this comparison
  async getDepartments() {
    let departments = null;
    this.service.pathName = "departments";
    departments = await this.service.index();
    if (departments != []) {
      departments.forEach(element => {
        this.currentDepartmentArNames.push(element.arName);
        this.currentDepartmentEnNames.push(element.enName);
      });
      // console.log(this.currentDepartmentArNames);
      this.currentDepartmentArNames.shift(); // to remove the first element (dummy-data)
      this.currentDepartmentEnNames.shift(); // to remove the first element (dummy-data)
    }
    // console.log(departments);
    //console.log(this.currentDepartmentArNames);
    //console.log(this.currentDepartmentEnNames);
  }
  // create() take the input data from form and send it to the service
  async create() {
    //this.div.emit()
    var deptFormat = {
      'arName': this.departmentForm.get("arName").value,
      'enName': this.departmentForm.get("enName").value,
      'isVirtual': 0,
      'hSDept': +this.departmentForm.get("hSDept").value
    };
    this.createdData = await this.service.create(deptFormat);
    //console.log(this.createdData);
    // this.flashMessage.show("تمت اضافة القسم بنجاح", { timeout: 2000 });
  }
}
