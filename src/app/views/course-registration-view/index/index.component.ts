import { Component, OnInit, NgZone } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  studentData;
  studentId:number;
  registredCourses;
  popUpFlag:boolean = false;
  popUpLink:string;
  popUpDetailsLink:string;
  showingRegistrationFlag:boolean = false;
  authorizedList;
  constructor(
    private dataService: MainService,
    private storage:LocalStorageService,
    private actRoute: ActivatedRoute,
    private sharingService:SharingDataService,
    private flashMessage : FlashMessagesService,
    private router:Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.studentId = +this.actRoute.snapshot.params.id; // take the student id to show his data
    this.popUpLink = 'show-all-registered-courses-for-student/'+this.studentId+'#popup1';
    this.popUpDetailsLink = 'show-all-registered-courses-for-student/'+this.studentId+'#popup2';
  }
   ngOnInit(): void {
     if (!this.authorizedList['course-registrations.index'] && !this.authorizedList['course-registrations.destroy']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
     }
    this.getStudentData();
    this.getRegistredCourses();
  }
  // getCourses func. take the student id and give his available courses
  // redirct service pathName to api routing link the save the available courses of student(by id) in courses array
  async getRegistredCourses() {
    ////console.log("geting courses process is excuting....");
    this.dataService.pathName = "course-registrations/student-registrations/" + this.studentId;
    this.registredCourses = await this.dataService.index();
    //console.log(this.registredCourses);
    //console.log(this.registredCourses);
  }
  //getStudentData func. needed to show student's datato ensure his data
  async getStudentData() {
    this.dataService.pathName = "students/"+ this.studentId;
    this.studentData= await this.dataService.show();
    //console.log(this.studentData);
    if(this.studentData){
      this.sharingService.setData(this.studentData);

    }
    //console.log(this.studentData);
  }
   // showCourseDetails func. take course that needs to be shown
  // and show it in the pop-up window
  showCourseDetails(course:any){
    //fire pop-up window to show course details
    //this.courseData = course;
    if (this.authorizedList['courses.show']) {
      this.sharingService.setData(course);
      //console.table(course);
      this.popUpFlag = true;
    }
  }
  closePopUp(){
    this.popUpFlag = false;
    this.showingRegistrationFlag = false;
  }
    // delete func. take the course registred id , send it to backend
  // then show confirmation message to the user
  async delete(id:number){
    if (this.authorizedList['course-registrations.destroy']) {
      this.dataService.pathName = 'course-registrations/'+id;
      await this.dataService.delete();
      this.getRegistredCourses();
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  //showRegistrationDetails fun used to call showing details component
  // to show the registeration details in pop up window
  // it take the course data and send it by the sharing service to the component then make the showing flag true 
  showRegistrationDetails(course){
    if (this.authorizedList['course-registrations.show']) {
      this.sharingService.setData(course);
      this.showingRegistrationFlag = true;
    }
  }

}
