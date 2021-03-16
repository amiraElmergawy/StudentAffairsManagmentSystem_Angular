import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-major-show',
  templateUrl: './major-show.component.html',
  styleUrls: ['./major-show.component.scss']
})
export class MajorShowComponent implements OnInit {
  data;
  majorId:number;
  authorizedList;
  constructor(private service:MainService,
    private actRoute:ActivatedRoute,
    private storage: LocalStorageService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList'); 
      this.majorId = this.actRoute.snapshot.params.id.valueOf();    
    this.service.pathName = 'majors/'+this.majorId;
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
    this.show();
  }
  }

  async show(){
    this.data = await this.service.show();
  }
}
