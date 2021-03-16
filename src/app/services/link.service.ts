import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  public pathName: string;
  domainName: string;
  authorizedList;
  headers;
  //currentTime;
  constructor(private http: HttpClient,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.domainName = "http://192.168.1.251:8001/api/";
  }
  resetIdleTime(){
    let currentTime = new Date();
    let hours = +currentTime.getHours();
    let minutes = +currentTime.getMinutes();
    let startTime = hours*60 + minutes;
    this.storage.store('startTime',startTime);
  }
  async unLink() {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.resetIdleTime();
    // if (this.authorizedList['division.unlink_department'] || this.authorizedList['major.unlinkDepartment'] || this.authorizedList['major.unlinkDivision'] || this.authorizedList['programs.unlinkCourses'] || this.authorizedList['programs.unlinkParent'] || this.authorizedList['student.unlinkParent']) {
      var v = confirm("هل تريد الغاء الربط ؟");
      if (v == true) {
        this.storage.store('loadingFireFlag',true);
      return await this.http.post(this.domainName + this.pathName, null, { headers: this.headers }).toPromise().then(
        () => {
          this.storage.store('loadingFireFlag',false);
          //this.router.navigate(['no-longer-available']);
          this.flashMessage.show("تمت العملية بنجاح ", { cssClass: 'flash_success', timeout: 5000 });
        }
      )
        .catch(
          (error) => {
            this.storage.store('loadingFireFlag',false);
            this.handleError(error);
          }
        );
    }
    else {
      alert("تم الغاء العملية");
    }
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' })
    // }
  }
  async unLinkDelete() {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.resetIdleTime();
    // if (this.authorizedList['division.unlink_department'] || this.authorizedList['major.unlinkDepartment'] || this.authorizedList['major.unlinkDivision'] || this.authorizedList['programs.unlinkCourses'] || this.authorizedList['programs.unlinkParent'] || this.authorizedList['student.unlinkParent']) {
      var v = confirm("هل تريد الغاء الربط ؟");
      if (v == true) {
        this.storage.store('loadingFireFlag',true);
      // console.log(this.domainName+this.pathName);
      return await this.http.delete(this.domainName + this.pathName, { headers: this.headers }).toPromise().then(
        () => {
          this.storage.store('loadingFireFlag',false);
          //this.router.navigate(['no-longer-available']);
          this.flashMessage.show("تمت العملية بنجاح ", { cssClass: 'flash_success', timeout: 5000 });
        }
      )
        .catch(
          (error) => {
            this.storage.store('loadingFireFlag',false);
            this.handleError(error);
          }
        );
    }
    else {
      alert("تم الغاءالربط");
    }
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' })
    // }
  }
  async link(obj) {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag',true);
    this.resetIdleTime();
    // console.log(this.domainName+this.pathName);
    // if (this.authorizedList['programs.linkParent'] || this.authorizedList['programs.linkMajor'] || this.authorizedList['programs.linkCourses']) {
    return await this.http.post(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
      .then(
        () => {
          this.storage.store('loadingFireFlag',false);
          this.flashMessage.show("تمت العملية بنجاح ", { cssClass: 'flash_success', timeout: 5000 });
        }
      )
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag',false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' })
    // }
    // will return the data when it's called
  }
  async linkMajorPrograms(obj) {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag',true);
    this.resetIdleTime();
    //if (this.authorizedList['majors.update-programs']) {
    // console.log(this.domainName+this.pathName);
    return await this.http.put(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
      .then(
        () => {
          this.storage.store('loadingFireFlag',false);
          this.flashMessage.show("تمت العملية بنجاح ", { cssClass: 'flash_success', timeout: 5000 });
        }
      )
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag',false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' })
    // }
    // will return the data when it's called
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
      // this.router.navigate(['something-went-wrong']);// to force user navigate back to home       
    }
    else if (error.status == 401) {
      this.storage.clear();
      this.router.navigate(['/login/']);
      // this.flashMessage.show('غير مصرح القيام بهذه العمليه', { cssClass: 'flash_danger', timeout: 5000 });
    }
    else {
      if (error?.error?.errors) {
        var jsonError: string = JSON.stringify(error?.error?.errors);
        this.flashMessage.show(jsonError, { cssClass: 'flash_danger', timeout: 5000 });
      } else {
        this.flashMessage.show(error?.error?.error, { cssClass: 'flash_danger', timeout: 5000 });
      }
      //console.log(error);
    }
  }
}
