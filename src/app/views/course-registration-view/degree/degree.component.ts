import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {
  registrationId: number;
  degreeFlag: boolean = false;
  updatedData;
  degree: number;
  registredCourse;
  authorizedList;
  constructor(private flashMessage: FlashMessagesService,
    private dataService: MainService,
    private storage: LocalStorageService,
    private actRoute: ActivatedRoute,
    private router : Router) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.registrationId = +this.actRoute.snapshot.params.id;
  }
  ngOnInit(): void {
    if (!this.authorizedList['course-registrations.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    this.getRegistredCourse();
  }
  // getCourses func. take the student id and give his available courses
  // redirct service pathName to api routing link the save the available courses of student(by id) in courses array
  async getRegistredCourse() {
    //console.log("geting courses process is excuting....");
    this.dataService.pathName = "course-registrations/" + this.registrationId;
    this.registredCourse = await this.dataService.show();
    //console.log(this.registredCourse);
  }
  //calcTotalCourseDegree fun. sum all the degrees (degreeTemplate) of course and return the result
  // calcTotalCourseDegree():number{
  //   /**
  //    * "degreeTemplate": {
  //           "id": 1,
  //           "theory": 50,
  //           "activity": 0,
  //           "oral": 0,
  //           "practical": 0,
  //           "exercise": 0
  //       },
  //    */
  //   let sum:number;
  //   sum = this.registredCourse?.degreeTemplate?.theory + this.registredCourse?.degreeTemplate?.activity +
  //   this.registredCourse?.degreeTemplate?.oral + this.registredCourse?.degreeTemplate?.practical +
  //   this.registredCourse?.degreeTemplate?.exercise;
  //   return sum;

  // }
  checkDegreeValidation() {
    if (this.degree > this.registredCourse.course.degree) {
      this.flashMessage.show('غير مسموح وضع درجة اكبر من درجة المقرر', { cssClass: 'flash_danger', timeout: 2000 });
    } else if (this.registredCourse.isAccredited != 0) {
      this.flashMessage.show('غير مسموح بتغيير درجة معتمدة', { cssClass: 'flash_danger', timeout: 2000 });
    }
    else {//degree is valid
      this.saveDegree();
    }
  }
  async saveDegree() {
    if (this.authorizedList['course-registrations.degree']) {

      this.dataService.pathName = 'course-registrations/' + this.registrationId + '/degree';
      let format = {
        'degree': this.degree
      }
      this.updatedData = await this.dataService.update(format);
      //console.info(this.updatedData);
      //this.flashMessage.show("تم حفظ الدرجة بنجاح", { timeout: 2000 });
      this.degreeFlag = true;
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  // async AccrediteDegree(){
  //   this.service.pathName = 'course-registrations/'+this.registrationId+'/degree';
  //   this.updatedData = await this.service.addCourseDegree(this.degree);
  //   this.flashMessage.show("تم حفظ الدرجة بنجاح", { timeout: 2000 });
  //   this.degreeFlag = true;
  // }

}
