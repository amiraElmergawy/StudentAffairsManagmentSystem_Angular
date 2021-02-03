import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main-service";
import { SpecialServices } from "src/app/services/special-services.service";
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: "app-accreditation-of-grades",
  templateUrl: "./accreditation-of-grades.component.html",
  styleUrls: ["./accreditation-of-grades.component.scss"]
})
export class AccreditationOfGradesComponent implements OnInit {
  //accreditationWays to handling the way that user prefer
  // accreditationWays = ["اعتماد الاقسام", "اعتماد البرامج", "اعتماد التخصصات"];
  // accreditationWay: number = null; //used to catch the acrediation wanted
  resultedWay; // used to data coming from service
  accreditationIds: number[]; // to save ids of accredit object(department, program or major)
  authorizedList;
  constructor(
    private dataService: MainService,
    private storage: LocalStorageService,
    private accreditationService: SpecialServices,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
  }

  ngOnInit(): void {
    if (!this.authorizedList['course-registrations.accredit']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getDepartments();
      this.accreditationIds = [0]; // initialize the array with dummy data to enable us traet with
    }
  }
  async getDepartments() {
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
    }
    //console.log(this.accreditationIds);
  }
  // accredit func. used to take the checed objects ids then send them to be accredited
  async accredit() {
    if (this.authorizedList['course-registrations.unaccredit']) {
      this.accreditationService.pathName = "course-registrations/accredit";
      this.accreditationIds.shift(); // to remove the initialization(dummy-data);
      var format = {
        "ids": this.accreditationIds
      }
      //console.log(format);
      await this.accreditationService.degreeAccreditation(format);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  // accreditAll func. used to take all ids of objects shown and send them to be accredited
  async accreditAll() {
    if (this.authorizedList['course-registrations.unaccredit']) {
      this.accreditationIds = [0];
      this.resultedWay.forEach(element => {
        this.accreditationIds.push(element?.id)
      });
      this.accreditationIds.shift();
      //console.log(this.accreditationIds);
      this.accreditationService.pathName = "course-registrations/accredit";
      //this.accreditationIds.shift(); // to remove the initialization(dummy-data);
      var format = {
        "ids": this.accreditationIds
      }
      //console.log(format);
      await this.accreditationService.degreeAccreditation(format);
    }
    else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
}
