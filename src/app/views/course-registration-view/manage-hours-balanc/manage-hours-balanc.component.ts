import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-manage-hours-balanc',
  templateUrl: './manage-hours-balanc.component.html',
  styleUrls: ['./manage-hours-balanc.component.scss']
})
export class ManageHoursBalancComponent implements OnInit {

  studentData;
  studentId: number;
  showSelectedCourses;
  allCourses = null; // used to save to arrays of courses objects and their regisateration details one for courses in the hours balance and the other is to save the retaken (courses outside the balance).
  outsideBalanceCourses = null;
  insideBalanceCourses = null;
  authorizedList;
  insideHolder = [0];
  outsideHolder = [0];
  hoursBalance: number = 12;
  constructor(
    private dataService: MainService,
    private actRoute: ActivatedRoute,
    private sharingService: SharingDataService,
    private router: Router,
    private storage: LocalStorageService,
    private flashMessage: FlashMessagesService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = +this.actRoute.snapshot.params.id; // take the student id to show his data
  }
  ngOnInit(): void {
    if (!this.authorizedList['student.manage-hours-balance']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getStudentData();
      this.getCourses();
    }
  }

  //getStudentData func. needed to show student's datato ensure his data
  async getStudentData() {
    this.dataService.pathName = "students/" + this.studentId;
    this.studentData = await this.dataService.show();
    //console.log(this.studentData);
    if (this.studentData) {
      this.sharingService.setData(this.studentData);
    }
    //console.log(this.studentData);
  }
  //getCourses function used to get all courses inside and outside the hours balance
  async getCourses() {
    this.dataService.pathName = 'students/' + this.studentId + '/courses-for-manage-hours-balance';
    this.allCourses = await this.dataService.index();
    //console.log(this.allCourses);
    if (this.allCourses) {// if there is data from server (student has retaken courses) then divide this data
      var inCourses = this.allCourses.coursesInHoursBalance;
      this.insideBalanceCourses = inCourses;
      // console.log(this.insideBalanceCourses);
      var outCourses = this.allCourses.retakenCourses;
      if (outCourses && outCourses?.length != 0) {
        let in_hours = 0;
        for (const in_course of this.insideBalanceCourses) {
          in_hours += in_course.course.hours;
        }
        this.hoursBalance = in_hours;
        this.outsideBalanceCourses = outCourses;
        // console.log(this.outsideBalanceCourses);
      } else {
        this.flashMessage.show("لا يوجد مقررات خارج الرصيد للاضافة والحذف", { cssClass: 'flash_danger', timeout: 5000 });
      }
    } else {// else display the not found page and an error message
      this.flashMessage.show('لا يوجد كورسات مسجلة اكثر من مرة', { cssClass: 'flash_danger', timeout: 5000 });
      //this.router.navigate(['/no-page-found/']);
    }
    // console.log("hours_balance = ", this.hoursBalance);
    // console.log("outside = ", this.outsideBalanceCourses);
  }

  // onChange func. catch the event on checking box and change the course position
  // generally, it takes the clicked course and checking action
  onChange(course: any) {
    var courseIndex = this.insideBalanceCourses.indexOf(course);
    if (courseIndex == -1) { // if checked course is not in inside the hours balance then it will be inside
      courseIndex = this.outsideBalanceCourses.indexOf(course);
      this.outsideBalanceCourses.splice(courseIndex, 1);
      if (this.outsideHolder.indexOf(course?.id) != -1) {
        this.outsideHolder.splice(this.outsideHolder.indexOf(course?.id), 1);
      }
      this.insideBalanceCourses.push(course);
      this.insideHolder.push(course?.id);
      this.hoursBalance += course.course.hours;
      // console.log(course.course.hours);
      // console.log(this.hoursBalance);
    }
    else { //if user check to delete the course from the hours balance courses
      this.insideBalanceCourses.splice(courseIndex, 1);
      if (this.insideHolder.indexOf(course?.id) != -1) {
        this.insideHolder.splice(this.insideHolder.indexOf(course?.id), 1);
      }
      this.hoursBalance -= course.course.hours;
      this.outsideBalanceCourses.push(course);
      this.outsideHolder.push(course?.id);
      // console.log(this.outsideHolder);
      // console.log(this.hoursBalance);
    }
    // console.log(this.hoursBalance);
    // console.log(course.course.hours);
    if (this.hoursBalance > 12) {
      this.flashMessage.show("لا يجب اضافة اكثر من 12 ساعة داخل رصيد الساعات", { cssClass: 'flash_danger', timeout: 2000 });
    }
  }

  async submit() {
    if (this.hoursBalance <= 12) {

      this.insideHolder.shift();
      this.outsideHolder.shift();
      this.dataService.pathName = 'students/' + this.studentId + '/manage-hours-balance';
      var format = {
        "added": this.insideHolder,
        "removed": this.outsideHolder
      }
      //console.log(format);
      await this.dataService.create(format);
    }
  }

  clear() {
    var outCourses = this.allCourses.retakenCourses;
    this.outsideBalanceCourses = outCourses;
    //console.log(this.outsideBalanceCourses);
    var inCourses = this.allCourses.coursesInHoursBalance;
    this.insideBalanceCourses = inCourses;
    //console.log(this.insideBalanceCourses);
    this.outsideHolder = [0];
    this.insideHolder = [0];
  }

}
