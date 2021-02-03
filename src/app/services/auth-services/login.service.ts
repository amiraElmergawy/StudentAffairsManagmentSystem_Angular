import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as jwt_decode from 'jwt-decode';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //public pathName:string;
  //data; //of obj type
  domainName: string = "http://192.168.1.251:8001/api/";
  backNamesList;
  headers;
  resetPassFlag = 0;
  constructor(
    private http: HttpClient,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService
  ) {
    // this.headers = new HttpHeaders()
  }

  userName: string;
  initializeList() {
    this.backNamesList = {
      'auth.login': true,
      'auth.logout': true,
      'auth.me': true,
      'auth.refresh': true,
      'course-registrations.store': false,
      'course-registrations.accredit': false,
      'course-registrations.index': false,
      'course-registrations.unaccredit': false,
      'course-registrations.show': false,
      'course-registrations.destroy': false,
      'course-registrations.degree': false,
      'courses.store': false,
      'courses.index': false,
      'courses.update': false,
      'courses.show': false,
      'courses.destroy': false,
      'course.search': false,
      'departments.store': false,
      'departments.index': false,
      'departments.update': false,
      'departments.show': false,
      'departments.destroy': false,
      'department.search': false,
      'divisions.store': false,
      'divisions.index': false,
      'divisions.update': false,
      'divisions.show': false,
      'divisions.destroy': false,
      'division.search': false,
      'division.unlink_department': false,
      'majors.store': false,
      'majors.index': false,
      'majors.update': false,
      'majors.show': false,
      'majors.destroy': false,
      'majors.update-programs': false,
      'majors.get-programs': false,
      'major.search': false,
      'major.unlinkDepartment': false,
      'major.unlinkDivision': false,
      'packages.store': false,
      'packages.index': false,
      'packages.update': false,
      'packages.show': false,
      'packages.destroy': false,
      'program.children': false,
      'program.students': false,
      'program.packages': false,
      'program.get-prerequisites': false,
      'program.insert-prerequisites': false,
      'program.search': false,
      'programs.store': false,
      'programs.index': false,
      'programs.update': false,
      'programs.show': false,
      'programs.destroy': false,
      'programs.unlinkCourses': false,
      'programs.unlinkParent': false,
      'programs.linkParent': false,
      'programs.linkMajor': false,
      'programs.linkCourses': false,
      'programs.create-packages': false,
      'programs.delete-packages': false,
      'programs.delete-prepackages': false,
      //'index'*:false,
      'student.bills': false,
      'students.store': false,
      'students.update': false,
      'students.show': false,
      'students.destroy': false,
      'student.delete_bill': false,
      'student.programRegister': false,
      'student.search': false,
      'student.available_courses': false,
      'student.update_bill': false,
      'student.add_bill': false,
      'student.courses': false,
      'student.image': false,
      'student.manage-hours-balance': false,
      'student.military-service': false,
      'student.reg-status': false,
      'student.delete-training': false,
      'student.add-training': false,
      'program_registration.update': false,
      'program_registration.delete': false,
      'student.transfer': false,
      'training.index': false,
      'student.trainings': false,
      'reports.general-report': false,
      'reports.with-low-gpa': false,
      'student.academic_record': false,
      'course.students': false,
      'student.test-transfer': false
    }
  }
  resetIdleTime() {
    let currentTime = new Date();
    let hours = +currentTime.getHours();
    let minutes = +currentTime.getMinutes();
    let startTime = hours * 60 + minutes;
    this.storage.store('startTime', startTime);
  }
  async login(obj) {
    this.storage.store('loadingFireFlag', true);
    this.userName = obj?.email.slice(0, 6);
    return await this.http.post(this.domainName + "auth/login", obj).toPromise()
      .then(
        (response: any) => {
          this.storage.store('loadingFireFlag', false);
          if (response) {//operation success
            this.resetIdleTime();
            this.initializeList();
            this.flashMessage.show("welcome " + this.userName, { cssClass: 'flash_success', timeout: 5000 });
            //return val;
            // console.log(response);
            var token = response?.access_token;
            this.storage.store('token', token);
            var tokenType = response?.token_type;
            this.storage.store('tokenType', tokenType);
            var decodedToken = jwt_decode(token);
            // console.log(token);
            // console.log(tokenType);
            // console.log(decodedToken);
            var userPermissions;
            userPermissions = decodedToken['claims'];
            // console.log(userPermissions);
            for (let index = 0; index < userPermissions.length; index++) {
              Object.keys(this.backNamesList).forEach(element => {
                if (userPermissions[index] == element) {
                  this.backNamesList[element] = true;
                }
              });
            }
            // console.log(this.backNamesList);
            this.storage.store('backNamesList', this.backNamesList);
            this.storage.store('userPermissions', userPermissions);
            // console.log(this.storage.retrieve('backNamesList'));
            setTimeout(()=>{
              this.authMe();
              if (this.resetPassFlag == 1) {
                this.router.navigate(['/home/']);
              } else {
                this.router.navigate(['/change-password']);
              }
            });
          }
        }
        )
        .catch(
          (error: HttpErrorResponse) => {
            this.storage.store('loadingFireFlag', false);
          this.handleError(error);
        }
      );
    }
    async authMe(){
      this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
      // this.http.options({'Authorization':this.storage.retrieve(token)})
      await this.http.post(this.domainName + "auth/me", null, { headers: this.headers }).toPromise()
      .then((value:any)=>{
        // console.log(value);
          this.resetPassFlag = value?.password_reset;
      });
      
  }
  async refresh(){
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    // this.http.options({'Authorization':this.storage.retrieve(token)})
    await this.http.post(this.domainName + "auth/refresh", null, { headers: this.headers }).toPromise()
    .then((value:any)=>{
      // console.log(value);
      this.resetPassFlag = value?.password_reset;
    });
    
}
  async logout() {
    this.storage.store('loadingFireFlag', true);
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    // this.http.options({'Authorization':this.storage.retrieve(token)})
    return await this.http.post(this.domainName + "auth/logout", null, { headers: this.headers }).toPromise()
      .then(
        () => {
          this.storage.store('loadingFireFlag', false);
          this.storage.clear();
          this.flashMessage.show("تم تسجيل الخروج بنجاح", { cssClass: 'flash_success', timeout: 5000 });
          // // console.log(this.storage.retrieve('backNamesList'));
          // // console.log(this.backNamesList);
          this.router.navigate(['/login/']);
        }
      )
      .catch(
        (error: HttpErrorResponse) => {
          this.storage.store('loadingFireFlag', false);
          this.storage.clear();
          // // console.log(this.storage.retrieve('backNamesList'));
          this.flashMessage.show("تم تسجيل الخروج بنجاح", { cssClass: 'flash_success', timeout: 5000 });
          this.router.navigate(['/login/']);
          // // console.clear();
          // // console.log(this.backNamesList);
          // this.handleError(error);
        }
      );
  }

  async resetPassword(obj) {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    // this.http.options({'Authorization':this.storage.retrieve(token)})
    return await this.http.post(this.domainName + "auth/reset", obj, { headers: this.headers }).toPromise()
      .then(
        () => {
          this.flashMessage.show(" تم تغيير كلمة المرور بنجاح ", { cssClass: 'flash_success', timeout: 5000 });
          //this.storage.clear();
          //// console.log(this.storage.retrieve('backNamesList'));
          this.router.navigate(['/home']);
        }
      )
      .catch(
        (error: HttpErrorResponse) => {
          // console.log(error);
          this.handleError(error);
        }
      );
  }

  handleError(error: HttpErrorResponse) {
    //let errorMessage = 'Unknown error!';
    if (error.status == 404) {
      //this.flashMessage.show( "هذه البيانات غير موجودة", { timeout: 5000 });
      this.router.navigate(['no-longer-available']);// to force user navigate back to home
    }
    else if (error.status == 500) {
      this.storage.clear();
      this.router.navigate(['/login/']);
      console.clear();
      //this.router.navigate(['something-went-wrong']);// to force user navigate back to home       
    }
    else if (error.status == 401) {// to handle unauthorized access error
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger', timeout: 5000 });
      //this.router.navigate(['something-went-wrong']);// to force user navigate back to home       
    }
    else {
      // console.log(error);
      if (error.error.errors) {
        var jsonError: string = JSON.stringify(error.error.errors);
        this.flashMessage.show(jsonError, { cssClass: 'flash_danger', timeout: 5000 });
      } else {
        this.flashMessage.show(error.error.error, { cssClass: 'flash_danger', timeout: 5000 });
      }
    }
  }
}
