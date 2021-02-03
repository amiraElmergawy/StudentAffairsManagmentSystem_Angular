import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-department-show',
  templateUrl: './department-show.component.html',
  styleUrls: ['./department-show.component.scss']
})
export class DepartmentShowComponent implements OnInit {
  deptId:number;
  data;
  authorizedList;
  constructor(
    private service:MainService,
    private storage:LocalStorageService,
    private actRoute:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private router:Router
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
      //console.log(this.authorizedList);
      this.deptId = this.actRoute.snapshot.params.id.valueOf();   
      this.service.pathName = 'departments/'+this.deptId;
  }
  ngOnInit(): void {
    if (!this.authorizedList['departments.show'] &&
    !this.authorizedList['departments.destroy'] &&
    !this.authorizedList['departments.update']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    else 
    this.show();
  }
  async show(){
    this.data = await this.service.show();
  }
 
}
