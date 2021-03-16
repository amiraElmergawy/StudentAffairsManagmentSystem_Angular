import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division-index',
  templateUrl: './division-index.component.html',
  styleUrls: ['./division-index.component.scss']
})
export class DivisionIndexComponent implements OnInit {
  data;
  authorizedList;
 // currentPermissions;
  constructor(
    private service:MainService,
     private storage:LocalStorageService,
     private flashMessage:FlashMessagesService,
     private router:Router
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
      //console.log(this.authorizedList);
     this.service.pathName = "divisions";  
  }

  ngOnInit(): void {
    if (!this.authorizedList['divisions.show'] && 
    !this.authorizedList['divisions.destroy'] && 
    !this.authorizedList['divisions.update'] && 
    !this.authorizedList['divisions.index'] &&
    !this.authorizedList['division.unlink_department']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else this.index();
  }
  async index(){
    this.data = await this.service.index();
  }

}
