import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-student-show',
  templateUrl: './student-show.component.html',
  styleUrls: ['./student-show.component.scss']
})
export class StudentShowComponent implements OnInit {
  studentData;
  studentId:number;
  authorizedList;
  constructor(private service:MainService,
    private actRoute:ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = this.actRoute.snapshot.params.id.valueOf(); 
    this.service.pathName = 'students/'+this.studentId;
  }
  
  ngOnInit(): void {
    if (!this.authorizedList['students.show'] &&
    !this.authorizedList['students.destroy'] &&
    !this.authorizedList['student.transfer'] &&
    !this.authorizedList['student.bills'] &&
    !this.authorizedList['students.update'] &&
    !this.authorizedList['student.delete_bill'] &&
    !this.authorizedList['student.programRegister'] &&
    !this.authorizedList['student.update_bill'] &&
    !this.authorizedList['student.add_bill'] &&
    !this.authorizedList['student.manage-hours-balance'] &&
    !this.authorizedList['student.military-service'] &&
    !this.authorizedList['student.delete-training'] &&
    !this.authorizedList['student.add-training'] &&
    !this.authorizedList['course-registrations.store'] &&
    !this.authorizedList['course-registrations.index'] &&
    !this.authorizedList['course-registrations.show'] &&
    !this.authorizedList['course-registrations.destroy'] && 
    !this.authorizedList['course-registrations.degree']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      // console.log(this.authorizedList);
      // console.log(this.authorizedList['student.bills']);
    this.show();
  }
}
  async show(){
    this.studentData = await this.service.show();
    //console.log(this.studentData);
    
  }

}
