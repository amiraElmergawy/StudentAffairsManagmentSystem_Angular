import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForbidenNamesService } from 'src/app/services/validation-services/forbiden-names.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.scss']
})
export class DepartmentUpdateComponent implements OnInit {
  // vertuality=[
  //   'قسم موجود',
  //   'قسم غير موجود'
  // ];
  hSDept = [
    'علمي رياضة',
    'علمي رياضة وما يعادله',
    'علمي علوم',
    'علمي علوم وما يعادله',
    'علمي علوم او رياضة',
    'علمي علوم او علمي رياضة او ما يعادلهم'
  ];
  ////////////////////
  updatedData;
  currentDepartmentArNames: string[];
  currentDepartmentEnNames: string[];
  departmentForm: FormGroup;
  departmentId: number;
  currentDepartmentData;
  authorizedList;
  constructor(private service: MainService,
    private storage: LocalStorageService,
    private actRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private validationService: ForbidenNamesService,
    private router:Router) {
    this.departmentId = this.actRoute.snapshot.params.id.valueOf();
    this.currentDepartmentArNames = [""];
    this.currentDepartmentEnNames = [""];
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
  }
  ngOnInit(): void {
    if (!this.authorizedList['departments.update'] &&
    !this.authorizedList['departments.destroy']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    this.getDepartments();
    this.getCurrentDepartmentData();
    this.departmentForm = new FormGroup({
      'arName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("([\u0621-\u064A]{4,}(\u0020){0,1})+"),// this pattern to force user to just type arabic letters and spaces (at least 4 arabic letters then zero or one space)
        //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        this.validationService.forbiddenNames(this.currentDepartmentArNames, this.departmentId)// this validator to force user not to use name of another dept again
      ]),
      'enName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("[A-Z]([a-zA-Z]{4,}(\u0020){0,1})+"),// this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        this.validationService.forbiddenNames(this.currentDepartmentEnNames, this.departmentId)
      ]),
      // 'isVirtual': new FormControl(null),
      'hSDept': new FormControl(null)
    });
    // this.departmentForm.valueChanges.subscribe(value =>
    //   console.log(this.departmentForm)
    // );
    // this.departmentForm.statusChanges.subscribe(status => console.log(status));
  }
  // getCurrentDepartmentData func. used to get the current data of the specified dept to be shown so that user change only data needed to be change
  async getCurrentDepartmentData() {
    this.service.pathName = 'departments/' + this.departmentId;
    this.currentDepartmentData = await this.service.show();
    this.departmentForm.setValue({
      'arName': this.currentDepartmentData?.arName,
      'enName': this.currentDepartmentData?.enName,
      //'isVirtual': 0,
      'hSDept': +this.currentDepartmentData?.hSDept + 1
    });
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

  async update() {
    if (this.authorizedList['departments.update']) {

      this.service.pathName = 'departments/' + this.departmentId;
      var deptFormat = {
        "id": this.departmentId,
        'arName': this.departmentForm.get('arName').value,
        'enName': this.departmentForm.get('enName').value,
        'isVirtual': 0,
        'hSDept': +this.departmentForm.get('hSDept').value
      }
      //console.log(deptFormat);
      this.updatedData = await this.service.update(deptFormat);
      // console.log(this.updatedData);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  async delete() {
    if (this.authorizedList['departments.update']) {
      this.service.pathName = 'departments/' + this.departmentId;
      await this.service.delete();
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  clear() {
    this.departmentForm.setValue({
      'arName': this.currentDepartmentData?.arName,
      'enName': this.currentDepartmentData?.enName,
      //'isVirtual': 0,
      'hSDept': +this.currentDepartmentData?.hSDept + 1
    });
  }

}
