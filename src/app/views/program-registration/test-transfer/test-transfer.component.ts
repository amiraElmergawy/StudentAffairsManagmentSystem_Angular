import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SpecialServices } from 'src/app/services/special-services.service';

@Component({
  selector: 'app-test-transfer',
  templateUrl: './test-transfer.component.html',
  styleUrls: ['./test-transfer.component.scss']
})
export class TestTransferComponent implements OnInit {
  studentData;
  studentId: number;
  addedCourses;
  deletedCourses;
  authorizedList;
  programId: number = null;
  programs;
  studentFlag = true;
  showingTransferDataFlag;
  constructor(
    private dataService: MainService,
    private storage: LocalStorageService,
    private actRoute: ActivatedRoute,
    private sharingService: SharingDataService,
    private transferingService: SpecialServices,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = +this.actRoute.snapshot.params.id; // take the student id to show his data
  }
  ngOnInit(): void {
    if (!this.authorizedList['student.test-transfer'] && !this.authorizedList['student.transfer']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    else {
      this.getStudentData();
      this.getAllPrograms();
    }
  }
  //getStudentData func. needed to show student's data to ensure his data
  //by sending the recived data from request and share it with show-ng component
  async getStudentData() {
    this.dataService.pathName = "students/" + this.studentId;
    this.studentData = await this.dataService.show();
    //console.log(this.studentData);
    if (this.studentData) {
      this.sharingService.setData(this.studentData);
    }
  }
  //getPrograms used to get all current exist programs to choose which program to transfer to.
  async getAllPrograms() {
    this.dataService.pathName = 'programs';
    this.programs = await this.dataService.index();
    for (let index = 0; index < this.programs?.length; index++) {
      if (this.programs[index]?.Id == this.studentData?.program?.Id) {
        delete this.programs[index];
        break;
      }
    }
    //console.log(this.programs);
  }
  // getCourses func. take the student id and give his available courses
  // redirct service pathName to api routing link the save the available courses of student(by id) in courses array
  async testTransfer() {
    this.studentFlag = false;
    var obj;
    if (this.programId && this.programId.toString() != 'null') {
      this.dataService.pathName = "students/" + this.studentId + "/" + this.programId + "/test-transfer";
      obj = await this.dataService.index();
      if (obj) {
        //console.log(obj);
        this.addedCourses = obj?.addedCourses;
        this.deletedCourses = obj?.deletedCourses;
        this.studentData = obj?.student;
        this.showingTransferDataFlag = true;
        this.sharingService.setData(this.studentData);
        //console.log(this.addedCourses);
        //console.log(this.deletedCourses);
      }
    }
    this.studentFlag = true;
  }
  // transfer used to send the transfering request by calling transferStudent function from transfering service only if the user select program
  async transfer() {
    if (this.authorizedList['student.transfer']) {
      if (this.programId && this.programId.toString() != 'null') {
        // console.log(this.programId);
        this.transferingService.pathName = 'students/' + this.studentId + '/' + this.programId + '/transfer';
        await this.transferingService.transferStudent();
      }
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العملية", { cssClass: 'flash_danger' });
    }
  }

}
