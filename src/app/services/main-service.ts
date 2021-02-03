import { Injectable } from '@angular/core';
//import { throwError, from } from 'rxjs';
//import { retry, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
//import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  domainName: string;
  public pathName: string;
  data; //of obj type
  authorizedList;
  headers;
  //currentTime;
  constructor(private http: HttpClient,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('userPermissions');
    // this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.domainName = "http://192.168.1.251:8001/api/";
  }
  resetIdleTime() {
    let currentTime = new Date();
    let hours = +currentTime.getHours();
    let minutes = +currentTime.getMinutes();
    let startTime = hours * 60 + minutes;
    this.storage.store('startTime', startTime);
  }
  async index() {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag', true);
    this.resetIdleTime();
    // let apiRequestName: string = this.pathName + '.index';
    // if (this.authorizedList[apiRequestName] || this.authorizedList['course-registrations.index']) {
    // console.log(this.domainName+this.pathName);
    return await this.http.get(this.domainName + this.pathName, { headers: this.headers }).toPromise()
      .then(
        (val: any) => {
          this.storage.store('loadingFireFlag', false);
          if ((this.pathName == 'departments' || this.pathName == 'programs') && (this.router.url.includes('show') || this.router.url.includes('internal'))) {
            val.shift();
            return val;
          } else {
            return val;
          }
        }
      )
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag', false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async create(obj) { // takes an object to save it
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag', true);
    this.resetIdleTime();
    // let apiRequestName: string = this.pathName + '.store';
    // if (this.authorizedList[apiRequestName] || this.authorizedList['student.add_bill'] || this.authorizedList['student.add-training'] || this.authorizedList['student.manage-hours-balance']) {
    return await this.http.post(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
      .then(
        () => {
          this.storage.store('loadingFireFlag', false);
          if (!this.pathName.includes('image')) {
            this.flashMessage.show("تم اضافة البيانات ", { cssClass: 'flash_success', timeout: 5000 });
            //return val;
          }
        }
      )
      .catch(
        (error: HttpErrorResponse) => {
          this.storage.store('loadingFireFlag', false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async delete() { // takes an Id to delete the corresponding record from pathName 
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.resetIdleTime();
    // let index: number = this.pathName.indexOf('/');
    // let apiRequestName: string = this.pathName.substr(0, index - 1) + '.destroy'; // to take only the api name from 'students/id'
    // if (this.authorizedList[apiRequestName] || this.authorizedList['student.delete_bill'] || this.authorizedList['student.delete-training']) {
      var v = confirm("هل تود مسح البيانات ؟");
      if (v == true) {
        this.storage.store('loadingFireFlag', true);
      //alert("ok");
      return await this.http.delete(this.domainName + this.pathName, { headers: this.headers }).toPromise()
        .then(
          () => {
            this.storage.store('loadingFireFlag', false);
            if (!this.pathName.includes('course-registrations/')) {
              this.router.navigate(['no-longer-available']);
            }
            this.flashMessage.show("تم مسح البيانات ", { cssClass: 'flash_success', timeout: 5000 });
          }
        )
        .catch(
          (error) => {
            this.storage.store('loadingFireFlag', false);
            this.handleError(error);
          }
        );
    }
    else {
      alert("الغاء المسح ؟");
    }
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async update(obj) {//takes an object of type any to save it
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag', true);
    this.resetIdleTime();
    return await this.http.put(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
      .then(
        (val) => {
          this.storage.store('loadingFireFlag', false);
          this.flashMessage.show("تم تحديث البيانات ", { cssClass: 'flash_success', timeout: 5000 });
        }
      )
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag', false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async show() {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag', true);
    this.resetIdleTime();
    if ((this.pathName == 'departments/1' || this.pathName == 'programs/1') && (this.router.url.includes('show') || this.router.url.includes('internal')) ) { //to force user not to show,update or delete virtual program and department
      this.router.navigate(['not-found-page']);// to force user navigate back to home      
    }
    return await this.http.get(this.domainName + this.pathName, { headers: this.headers }).toPromise()
      .then((value) => {
        this.storage.store('loadingFireFlag', false);
        return value;
      })
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag', false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async search() {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag', true);
    this.resetIdleTime();
    return await this.http.get(this.domainName + this.pathName, { headers: this.headers }).toPromise()
      .then((value) => {
        this.storage.store('loadingFireFlag', false);
        return value;
      }).catch(
        (error) => {
          this.storage.store('loadingFireFlag', false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  //  handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
  // to handle errors
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
      // this.router.navigate(['something-went-wrong']);// to force user navigate back to home       
    }
    else if (error.status == 401) {
      this.storage.clear();
      this.router.navigate(['/login/']);
      // this.flashMessage.show('غير مصرح القيام بهذه العمليه', { cssClass: 'flash_danger', timeout: 5000 });
    }
    else {
      //console.log(error);
      if (error.error.errors) {
        var jsonError: string = JSON.stringify(error.error.errors);
        this.flashMessage.show(jsonError, { cssClass: 'flash_danger', timeout: 5000 });
      } else {
        this.flashMessage.show(error.error.error, { cssClass: 'flash_danger', timeout: 5000 });
      }
    }
  }
}
