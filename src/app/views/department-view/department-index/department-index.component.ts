import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-index',
  templateUrl: './department-index.component.html',
  styleUrls: ['./department-index.component.scss']
})
export class DepartmentIndexComponent implements OnInit {

  data;
  authorizedList;
  constructor(
    private storage:LocalStorageService,
    private service:MainService,
    private flashMessage:FlashMessagesService,
    private router:Router) { 
      this.authorizedList = this.storage.retrieve('backNamesList');
      //console.log(this.authorizedList);
      this.service.pathName = "departments";  
  }
  ngOnInit(): void {
    if (!this.authorizedList['departments.show'] &&
     !this.authorizedList['departments.update'] &&
      !this.authorizedList['departments.destroy'] &&
      !this.authorizedList['departments.index']) {
        this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
        this.router.navigate(['/home']);
    }
    else{
    this.index();
  }
  }
  
  async index(){
    this.data = await this.service.index();
    // this.data.shift();
  }
}
