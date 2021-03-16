import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { SpecialServices } from 'src/app/services/special-services.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accreditation-cancel',
  templateUrl: './accreditation-cancel.component.html',
  styleUrls: ['./accreditation-cancel.component.scss']
})
export class AccreditationCancelComponent implements OnInit {
  //accreditationWays to handling the way that user prefer
  // accreditationWays = ["اعتماد الاقسام", "اعتماد البرامج", "اعتماد التخصصات"];
  // accreditationWay: number = null; //used to catch the acrediation wanted
  resultedWay; // used to data coming from service
  accreditationIds: number[]; // to save ids of accredit object(department, program or major)
  academicYear: string = null;
  authorizedList;
  constructor(
    private dataService: MainService,
    private accreditationService: SpecialServices,
    private storage: LocalStorageService,
    private flashMessage: FlashMessagesService,
    private router : Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
  }
  
  ngOnInit(): void {
    if (!this.authorizedList['course-registrations.accredit']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else{
      this.getDepartments();
      this.accreditationIds = [0]; // initialize the array with dummy data to enable us traet with
    }
  }
  async getDepartments(){
    this.dataService.pathName = "departments";
    this.resultedWay = await this.dataService.index();
  }
  // onChange func. take the event of check-boxes to take id of checked objects and remove unchecked ones 
  onChange(way, isChecked: boolean) {
    if (this.accreditationIds.length >= this.resultedWay.length - 1) {
      this.accreditationIds = [0];
    }
    if (isChecked) {
      this.accreditationIds.push(way?.id);
    } else {
      var itemIndex = this.accreditationIds.map(i => i).indexOf(way.id);
      //console.log(itemIndex);
      //let index = this.accreditationIds.indexOf(way?.id);
      this.accreditationIds.splice(itemIndex, 1);
      // if (+this.accreditationWay == 0 || +this.accreditationWay == 2) { // selected way is depts or majors
    }
    //console.log(this.accreditationIds);
  }
  testInputsValidity(): boolean {
    // console.log();
    // console.log(this.academicYear.length);
    if (this.academicYear.length == 9 &&
      this.academicYear.search('[0-9]{4}\/[0-9]{4}') == 0) {
      // if year is in the shape 2019/2020 then the the year is valid
      return true;
      //console.log('3aaaaash');
    } else {
      this.flashMessage.show('يجب ان تكون قيمة السنة الدراسية بهذا الشكل 2019/2020', { cssClass: 'flash_danger', timeout: 5000 });
      //console.log('else');
      return false;
    }
  }
  // accredit func. used to take the checed objects ids then send them to be accredited
  async unAccredit() {
    if (this.testInputsValidity() == true && this.accreditationIds.length > 0 && this.authorizedList['course-registrations.unaccredit']) {
      this.accreditationService.pathName = "course-registrations/unaccredit";
      this.accreditationIds.shift(); // to remove the initialization(dummy-data);
      var format = {
        "academicYear": this.academicYear,
        "ids": this.accreditationIds
      }
      //console.log(format);
      await this.accreditationService.degreeAccreditation(format);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger'});
    }
  }
  // accreditAll func. used to take all ids of objects shown and send them to be accredited
  async unAccreditAll() {
    if (this.testInputsValidity() == true && this.authorizedList['course-registrations.unaccredit']) {

      this.accreditationIds = [0];

        this.resultedWay.forEach(element => {
          this.accreditationIds.push(element?.id);
        });
      this.accreditationIds.shift();
      //console.log(this.accreditationIds);
      this.accreditationService.pathName = "course-registrations/unaccredit";
      //this.accreditationIds.shift(); // to remove the initialization(dummy-data);
      var format = {
        "academicYear": this.academicYear,
        "ids": this.accreditationIds
      }
      //console.log(format);
      await this.accreditationService.degreeAccreditation(format);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger'});
    }
  }
}
