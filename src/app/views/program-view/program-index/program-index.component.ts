import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-index',
  templateUrl: './program-index.component.html',
  styleUrls: ['./program-index.component.scss']
})
export class ProgramIndexComponent implements OnInit {

  data;
  authorizedList;
  constructor(private service:MainService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
      this.authorizedList = this.storage.retrieve('backNamesList'); 
      this.service.pathName = "programs";  
  }

  ngOnInit(): void {
    if (!this.authorizedList['program.get-prerequisites'] &&
    !this.authorizedList['program.insert-prerequisites'] &&
    !this.authorizedList['programs.delete-prepackages'] &&
    !this.authorizedList['packages.index'] &&
    !this.authorizedList['programs.index'] &&
    !this.authorizedList['packages.show'] &&
    !this.authorizedList['packages.store']&&
    !this.authorizedList['packages.update']&&
      !this.authorizedList['packages.destroy']&&
      !this.authorizedList['program.students']&&
      !this.authorizedList['program.packages']&&
      !this.authorizedList['programs.store']&&
      !this.authorizedList['programs.update']&&
      !this.authorizedList['programs.show']&&
      !this.authorizedList['programs.destroy']&&
      !this.authorizedList['programs.unlinkParent']&&
      !this.authorizedList['programs.linkParent']&&
      !this.authorizedList['programs.linkCourses'] && 
      !this.authorizedList['programs.create-packages'] &&
      !this.authorizedList['programs.delete-packages']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.index();
    }
  }
  async index(){
    this.data = await this.service.index();
    //this.data.shift();
  }

}
