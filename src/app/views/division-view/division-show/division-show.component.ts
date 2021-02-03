import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-division-show',
  templateUrl: './division-show.component.html',
  styleUrls: ['./division-show.component.scss']
})
export class DivisionShowComponent implements OnInit {
  data;
  divisionId:number;
  authorizedList;
  constructor(
    private storage:LocalStorageService,
    private service:MainService,
    private actRoute:ActivatedRoute,
    private router:Router,
    private flashMessage:FlashMessagesService) {
      this.divisionId = this.actRoute.snapshot.params.id.valueOf();   
      this.service.pathName = 'divisions/'+this.divisionId;
      this.authorizedList = this.storage.retrieve('backNamesList');
      //console.log(this.authorizedList);
   }

  ngOnInit(): void {
    if (!this.authorizedList['divisions.update'] &&
     !this.authorizedList['divisions.destroy'] &&
     !this.authorizedList['divisions.show'] &&
     !this.authorizedList['division.unlink_department']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.show();
    }
  }
  async show(){
    this.data = await this.service.show();
  }

}
