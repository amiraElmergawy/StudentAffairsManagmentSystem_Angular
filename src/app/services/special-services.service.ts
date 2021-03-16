import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SpecialServices {
  public pathName: string;
  domainName: string;
  authorizedList;
  headers;
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
  async coursePrerequisites(obj) {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag',true);
    this.resetIdleTime();
    //if (this.authorizedList['program.insert-prerequisites']) {
    return await this.http.post(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
      .then(
        (response) => {
          this.storage.store('loadingFireFlag',false);
          this.flashMessage.show(' تمت اضافة البيانات بنجاح ', { cssClass: 'flash_success', timeout: 5000 });
        }
      )
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag',false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async deleteProgramPackage(obj) {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.resetIdleTime();
    //if (this.authorizedList['programs.delete-prepackages'] || this.authorizedList['programs.delete-packages']) {
      var v = confirm("هل تود مسح البيانات ؟");
      if (v == true) {
        this.storage.store('loadingFireFlag',true);
      //al
      return await this.http.post(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
        .then(
          (response) => {
            this.storage.store('loadingFireFlag',false);
            this.flashMessage.show('تم مسح البيانات', { cssClass: 'flash_success', timeout: 5000 });
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
      alert("الغاء المسح ؟");
    }
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async degreeAccreditation(obj) {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag',true);
    this.resetIdleTime();
    //if (this.authorizedList['course-registrations.accredit'] || this.authorizedList['course-registrations.unaccredit']) {
    return await this.http.post(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
      .then(
        (response) => {
          this.storage.store('loadingFireFlag',false);
          if (this.pathName == 'course-registrations/unaccredit') { //sent request is to unaccredit degrees
            this.flashMessage.show(' تم الغاء اعتماد النتيجة ', { cssClass: 'flash_success', timeout: 5000 });
          } else {// sent request is to accredit degrees
            this.flashMessage.show(' تم اعتماد النتيجة بنجاح', { cssClass: 'flash_success', timeout: 5000 });
          }
        }
      )
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag',false);
          this.handleError(error);
        }
      );
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async deleteWithParams(obj) {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag',true);
    this.resetIdleTime();
    // if (this.authorizedList['program_registration.delete'] || this.authorizedList['student.delete-training']) {
    var v = confirm("هل تود مسح البيانات ؟");
    if (v == true) {
      return await this.http.post(this.domainName + this.pathName, obj, { headers: this.headers }).toPromise()
        .then(
          (response) => {
            this.storage.store('loadingFireFlag',false);
            this.flashMessage.show('تم مسح البيانات', { cssClass: 'flash_success', timeout: 5000 });
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
      alert("الغاء المسح ؟");
    }
    // } else {
    //   this.flashMessage.show("غير مصرح للقيام بهذه العمليه", { cssClass: 'flash_danger' });
    // }
  }
  async transferStudent() {
    this.headers = new HttpHeaders({ 'Authorization': this.storage.retrieve('tokenType') + " " + this.storage.retrieve('token') });
    this.storage.store('loadingFireFlag',true);
    this.resetIdleTime();
    return await this.http.get(this.domainName + this.pathName, { headers: this.headers }).toPromise()
      .then(
        (response) => {
          this.storage.store('loadingFireFlag',false);
          this.flashMessage.show('تم تحويل الطالب بنجاح', { cssClass: 'flash_success', timeout: 5000 });
        }
      )
      .catch(
        (error) => {
          this.storage.store('loadingFireFlag',false);
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
      // this.router.navigate(['something-went-wrong']);// to force user navigate back to home       
    }
    else if (error.status == 401) {
      this.storage.clear();
      this.router.navigate(['/login/']);
      // this.flashMessage.show('غير مصرح القيام بهذه العمليه', { cssClass: 'flash_danger', timeout: 5000 });
    }
    else {
      if (error.error.errors) {
        var jsonError: string = JSON.stringify(error.error.errors);
        this.flashMessage.show(jsonError, { cssClass: 'flash_danger', timeout: 5000 });
      } else {
        this.flashMessage.show(error.error.error, { cssClass: 'flash_danger', timeout: 5000 });
      }
    }
  }

}
