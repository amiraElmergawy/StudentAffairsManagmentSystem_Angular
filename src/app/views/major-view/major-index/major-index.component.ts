import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-major-index',
  templateUrl: './major-index.component.html',
  styleUrls: ['./major-index.component.scss']
})
export class MajorIndexComponent implements OnInit {
  data;
  authorizedList;
  constructor(private service: MainService,
    private storage: LocalStorageService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.service.pathName = 'majors';
  }
  ngOnInit(): void {
    if (!this.authorizedList['majors.show'] &&
      !this.authorizedList['majors.destroy'] &&
      !this.authorizedList['majors.update'] &&
      !this.authorizedList['major.unlinkDepartment'] &&
      !this.authorizedList['major.unlinkDivision'] &&
      !this.authorizedList['majors.update-programs'] &&
      !this.authorizedList['majors.get-programs']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.index();
    }
  }
  async index() {
    this.data = await this.service.index();
  }

  discShorthand(str){
    if(!str){
      return;
    }
    if(str.length > 30){
      return (str.slice(0,20) + "...");
    }
    else return str;
  }

}
