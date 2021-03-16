import { Component, OnInit, Input } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.scss']
})
export class CourseShowComponent implements OnInit {
courseId:number;
courseData;
authorizedList;
constructor(private service:MainService,
  private storage:LocalStorageService,
  private actRoute:ActivatedRoute,
  private router:Router,
  private flashMessage:FlashMessagesService) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    // console.log(this.authorizedList);
      this.courseId = this.actRoute.snapshot.params.id.valueOf(); 
      this.service.pathName = 'courses/'+this.courseId;
  }
  
  ngOnInit(): void {
    if (!this.authorizedList['courses.show'] &&
    !this.authorizedList['courses.update'] &&
    !this.authorizedList['courses.destroy']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    this.show();
  }
   async show( ){
    this.courseData = await this.service.show();
 // console.clear();
  //console.log(this.courseData);
 }
}
