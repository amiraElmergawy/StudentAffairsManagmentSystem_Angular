import { Component, OnInit } from '@angular/core';
import { Major } from 'src/app/classes/dbClasses/major/major';
import { MainService } from 'src/app/services/main-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForbidenNamesService } from 'src/app/services/validation-services/forbiden-names.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss']
})
export class MajorComponent implements OnInit {
  //***** html variables */
  departments = null;
  divisions = null;
  majorTypes = [
    'تخصص منفرد',
    'تخصص مزدوج',
    'خاص'
  ];
  hSDept = [
    'علمي رياضة',
    'علمي رياضة وما يعادله',
    'علمي علوم',
    'علمي علوم وما يعادله',
    'علمي علوم او رياضة',
    'علمي علوم او علمي رياضة او ما يعادلهم'
  ];
  //****************** */
  //  major = new Major (null,'','','','','',null,null,null,null,null,null);
  data;
  majorId;
  createdData;
  majorForm: FormGroup;
  currentMajorArNames: string[];// to save all current exist majors Arabic Names
  currentMajorEnNames: string[];// to save all current exist majors English Names
  currentMajorCertArNames: string[];// to save all current exist majors Arabic cert Names
  currentMajorCertEnNames: string[];// to save all current exist majors English cert Names
  authorizedList;
  constructor(private service: MainService,
    private validationService: ForbidenNamesService,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.currentMajorArNames = [""];
    this.currentMajorEnNames = [""];
    this.currentMajorCertArNames = [""];
    this.currentMajorCertEnNames = [""];
  }

  ngOnInit(): void {
    if (!this.authorizedList['majors.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getDepartments();
      this.getDivisions();
      this.getAllMajors();
      this.majorForm = new FormGroup({
        'type': new FormControl(null, Validators.required),
        'arName': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("([\u0621-\u064A]{4,}(\u0020)?)+"), // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
          this.validationService.forbiddenNames(this.currentMajorArNames) // to force user not to repeat names
        ]),
        'enName': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("[A-Z]([a-zA-Z]{2,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
          this.validationService.forbiddenNames(this.currentMajorEnNames)
        ]),
        'desc': new FormControl(null),
        'certArName': new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+"), // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
          this.validationService.forbiddenNames(this.currentMajorCertArNames)
        ]),
        'certEnName': new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("([a-zA-Z]{2,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
          this.validationService.forbiddenNames(this.currentMajorCertEnNames)
        ]),
        'hoursToGraduate': new FormControl(null, [
          Validators.required,
          Validators.pattern('[1-9][0-9]*'),
          Validators.min(1)
        ]),
        'failHoursAllowed': new FormControl(null, [
          Validators.required,
          Validators.pattern('[1-9][0-9]*')
        ]),
        'failGpa': new FormControl(null, [
          Validators.required,
          Validators.pattern('([0-3]\.[0-9]+)|[0-4]')// as GPA value must be from 0.0 to 4.0
        ]),
        'hSDept': new FormControl(null, Validators.required),
        'departmentId': new FormControl(null, Validators.required),
        'divisionId': new FormControl(null, Validators.required),
      });
      // this.majorForm.valueChanges.subscribe(value =>
      //   //console.log(this.majorForm)
      // );
      // this.majorForm.statusChanges.subscribe(status => console.log(status));
    }
  }

  //to get all departments and choose form them to link with
  async getDepartments() {
    this.service.pathName = "departments";
    this.departments = await this.service.index();
    // this.departments.shift();
  }

  //to get all divisions and choose form them to link with
  async getDivisions() {
    this.service.pathName = "divisions";
    this.divisions = await this.service.index();
  }
  // getAllMajors used to get all current majors then extract thier names to compare the enterd program name with every current name to not repeat it again
  // then send it to validation service to do this comparison
  async getAllMajors() {
    let majors = null;
    this.service.pathName = "majors";
    majors = await this.service.index();
    if (majors != []) {
      majors.forEach(element => {
        this.currentMajorArNames.push(element.arName);
        this.currentMajorEnNames.push(element.enName);
        this.currentMajorCertArNames.push(element?.certArName);
        this.currentMajorCertEnNames.push(element?.certEnName);
      });
      // console.log(this.currentMajorArNames);
      this.currentMajorArNames.shift(); // to remove the first element (dummy-data)
      this.currentMajorEnNames.shift(); // to remove the first element (dummy-data)
      this.currentMajorCertArNames.shift(); // to remove the first element (dummy-data)
      this.currentMajorCertEnNames.shift(); // to remove the first element (dummy-data)
    }
    // console.log(departments);
    //console.log(this.currentMajorArNames);
    //console.log(this.currentMajorEnNames);
  }
  // create() take the input data from form and send it to the service

  async create() {
    this.service.pathName = "majors";
    var major = {
      "type": this.majorForm.get('type').value,
      "arName": this.majorForm.get('arName').value,
      "enName": this.majorForm.get('enName').value,
      "desc": this.majorForm.get('desc').value,
      "certArName": this.majorForm.get('certArName').value,
      "certEnName": this.majorForm.get('certEnName').value,
      "hoursToGraduate": this.majorForm.get('hoursToGraduate').value,
      "failHoursAllowed": this.majorForm.get('failHoursAllowed').value,
      "failGpa": this.majorForm.get('failGpa').value,
      "hSDept": this.majorForm.get('hSDept').value,
      "departmentId": this.majorForm.get('departmentId').value,
      "divisionId": this.majorForm.get('divisionId').value
    }

    this.createdData = await this.service.create(major);
    //console.log(this.createdData);
    if (this.createdData) {
      this.majorId = this.createdData?.id;
    }
    //  this.flashMessage.show("تمت اضافة التخصص بنجاح", { timeout: 2000 });
    //this.clear();
  }
  // clear fun. to reset all the form inputs
  clear() {
    this.majorForm.reset();
  }

}
