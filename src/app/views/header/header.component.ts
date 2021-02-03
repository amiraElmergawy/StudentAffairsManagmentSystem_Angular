import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  internalRegulationFlag = false;
  studentSearchFlag = false;
  addStudentFlag = false;
  authorizedList;
  authList;
  constructor(private storage: LocalStorageService,
    private router: Router,
    private loginService: LoginService) {
      this.authorizedList = this.storage.retrieve('userPermissions');
        this.authList = this.storage.retrieve('backNamesList');
    // this.authorizedList = this.storage.retrieve('backNamesList');

  }

  ngOnInit(): void {
    if (this.authorizedList) {
      this.autherizationUrls();
    }
    // this.router.events.subscribe((value) => {
    //   if (this.router.url == '/') {
    //     this.homeFlag = true;
    //   } else if (this.router.url == '/login') {
    //     this.loginFlag = true;
    //   }else {
    //     this.homeFlag = false;
    //     this.loginFlag = false;
    //   }
    // });
    // this.storage.observe('userPermissions').subscribe((value)=>{
    // });
    this.storage.observe('userPermissions').subscribe(() => {
      this.authorizedList = this.storage.retrieve('userPermissions');
      if (this.authorizedList) {
        this.authList = this.storage.retrieve('backNamesList');
        this.autherizationUrls();
      } else {
        this.internalRegulationFlag = false;
        this.studentSearchFlag = false;
        this.addStudentFlag = false;
        this.authorizedList = null;
        this.authList = null;
      }
      // console.log('hmada');
    });

  }

  autherizationUrls() {
    //console.log(this.authorizedList);
    this.authorizedList.forEach(element => {
      if (
        element.includes('department') ||
        element.includes('program') ||
        element.includes('package') ||
        element.includes('division') ||
        element.includes('major') ||
        (
          element.includes('course') &&
          !element.includes('course-registrations.store') &&
          !element.includes('course-registrations.index') &&
          !element.includes('course-registrations.destroy') &&
          !element.includes('course-registrations.show') &&
          !element.includes('course-registrations.degree')
        )
      ) {
        this.internalRegulationFlag = true;
      }
      else if (
        element.includes('student')
      ) {
        this.studentSearchFlag = true;
        // if(element.includes('search')){
        // }
        if (element.includes('store')) {
          this.addStudentFlag = true;
        }
      }
      else if (
        element.includes('course-registrations.store') ||
        element.includes('course-registrations.index') ||
        element.includes('course-registrations.destroy') ||
        element.includes('course-registrations.show') ||
        element.includes('course-registrations.degree')
      ) {
        this.studentSearchFlag = true;
      }
    });
  }
  async logout() {
    await this.loginService.logout();
  }
  // async refresh(){
  //   await this.loginService.refresh();
  // }


}
