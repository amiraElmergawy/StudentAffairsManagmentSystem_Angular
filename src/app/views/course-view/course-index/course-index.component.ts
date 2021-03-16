import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent implements OnInit {
data;
authorizedList;
constructor(
  private storage:LocalStorageService,
  private service:MainService,
  private router:Router,
  private flashMessage:FlashMessagesService) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.service.pathName = 'courses';
  }
  ngOnInit(): void {
    if (!this.authorizedList['courses.index'] &&
    !this.authorizedList['courses.update'] && 
    !this.authorizedList['courses.show'] &&
    !this.authorizedList['courses.destroy']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    this.index();
  }
  
  async index(){
   // console.log("before request");
    this.data = await this.service.index();
   // console.log(this.data);
 // console.log("after request");

}


}
