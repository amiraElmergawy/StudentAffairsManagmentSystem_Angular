import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LinkService } from 'src/app/services/link.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForbidenNamesService } from 'src/app/services/validation-services/forbiden-names.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-major-update',
  templateUrl: './major-update.component.html',
  styleUrls: ['./major-update.component.scss']
})
export class MajorUpdateComponent implements OnInit {
  //***** html variables */
  departments;
  divisions;
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
  //major = new Major (null,'','','','','',null,null,null,null,null,null);
  MajorId: number;
  data;
  updatedData;
  majorForm: FormGroup;
  currentMajorData;
  currentMajorArNames: string[];// to save all current exist majors Arabic Names
  currentMajorEnNames: string[];// to save all current exist majors English Names
  currentMajorCertArNames: string[];// to save all current exist majors Arabic cert Names
  currentMajorCertEnNames: string[];// to save all current exist majors English cert Names
  authorizedList;
  constructor(private service: MainService,
    private linkingService: LinkService,
    private actRoute: ActivatedRoute,
    private validationService: ForbidenNamesService,
    private storage: LocalStorageService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.currentMajorArNames = [""];
    this.currentMajorEnNames = [""];
    this.currentMajorCertArNames = [""];
    this.currentMajorCertEnNames = [""];

    this.MajorId = this.actRoute.snapshot.params.id.valueOf();
  }
  ngOnInit(): void {
    if (!this.authorizedList['major.unlinkDivision'] &&
      !this.authorizedList['major.unlinkDepartment'] &&
      !this.authorizedList['majors.update'] &&
      !this.authorizedList['majors.update-programs'] &&
      !this.authorizedList['majors.destroy']) {
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
          this.validationService.forbiddenNames(this.currentMajorArNames, this.MajorId) // to force user not to repeat names
        ]),
        'enName': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("[A-Z]([a-zA-Z]{2,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
          this.validationService.forbiddenNames(this.currentMajorEnNames, this.MajorId)
        ]),
        'desc': new FormControl(null),
        'certArName': new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("([\u0621-\u064A]{4,}(\u0020)?)+"), // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
          this.validationService.forbiddenNames(this.currentMajorCertArNames, this.MajorId)
        ]),
        'certEnName': new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("([a-zA-Z]{4,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
          this.validationService.forbiddenNames(this.currentMajorCertEnNames, this.MajorId)
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
      //  this.formInit();
      //this.formInit();
      // this.majorForm.valueChanges.subscribe(value =>
      //   console.log(this.majorForm)
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
    //console.log(this.divisions);
  }
  // getAllMajors used to get all current majors then extract thier names to compare the enterd program name with every current name to not repeat it again
  // then send it to validation service to do this comparison
  // save current major data to initilze the form with it
  async getAllMajors() {
    let majors = null;
    this.service.pathName = "majors";
    majors = await this.service.index();
    if (majors != []) {
      majors.forEach(element => {
        if (element.id == this.MajorId) {
          this.currentMajorData = element;// to take this data and initilize form with it
        }
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
    this.formInit(); // as current major data has been saved 
    // console.log(departments);
    //console.log(this.currentMajorArNames);
    //console.log(this.currentMajorEnNames);
  }
  // formInit fun used to set form values with current values to anable user view current data and change only wanted
  async formInit() {
    // this.service.pathName = 'majors/'+this.MajorId;
    // this.currentMajorData = await this.service.show();
    this.majorForm?.setValue({
      "type": +this.currentMajorData?.type,
      "arName": this.currentMajorData?.arName,
      "enName": this.currentMajorData?.enName,
      "desc": this.currentMajorData?.desc,
      "certArName": this.currentMajorData?.certArName,
      "certEnName": this.currentMajorData?.certEnName,
      "hoursToGraduate": +this.currentMajorData?.hoursToGraduate,
      "failHoursAllowed": +this.currentMajorData?.failHoursAllowed,
      "failGpa": +this.currentMajorData?.failGpa,
      "hSDept": +this.currentMajorData?.hSDept,
      "departmentId": +this.currentMajorData?.department?.id,
      "divisionId": +this.currentMajorData?.division?.id
    })

  }
  // update() take the input data from form and send it to the service
  async update() {
    if (this.authorizedList['majors.update']) {
      this.service.pathName = 'majors/' + this.MajorId;
      var major = {
        "id": this.MajorId,
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
      this.updatedData = await this.service.update(major);
      // console.log(this.updatedData);
      //this.flashMessage.show("تمت اضافة التخصص بنجاح", { timeout: 2000 });
      //console.clear();
      this.clear();
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العملية", { cssClass: 'flash_danger' });
    }
  }

  async delete() {
    if (this.authorizedList['majors.destroy']) {
      this.service.pathName = 'majors/' + this.MajorId;
      await this.service.delete();
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العملية", { cssClass: 'flash_danger' });
    }
  }
  async unLinkDivision() {
    if (this.authorizedList['major.unlinkDivision']) {
      this.linkingService.pathName = 'majors/' + this.MajorId + '/unlink/division';
      this.updatedData = await this.linkingService.unLink();
      //console.log(this.updatedData);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العملية", { cssClass: 'flash_danger' });
    }
  }
  async unLinkDepartment() {
    if (this.authorizedList['major.unlinkDepartment']) {
      this.linkingService.pathName = 'majors/' + this.MajorId + '/unlink/department';
      this.updatedData = await this.linkingService.unLink();
      //console.log(this.updatedData);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العملية", { cssClass: 'flash_danger' });
    }
  }
  // clear fun. to return to the original form data
  clear() {
    this.formInit();
    //this.majorForm.reset();
  }
}
