import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialServices } from 'src/app/services/special-services.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-registration-index',
  templateUrl: './registration-index.component.html',
  styleUrls: ['./registration-index.component.scss']
})
export class RegistrationIndexComponent implements OnInit {

  data;
  programId:number;
  backToHomeFlag:boolean = false;
  authorizedList;
  constructor(private service:MainService,
    private actRoute:ActivatedRoute,
    private deleteService:SpecialServices,
    private flashMessage:FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
      this.programId = this.actRoute.snapshot.params.id.valueOf(); 
    this.service.pathName = 'program/'+this.programId+'/students';
  }

  ngOnInit(): void {
    if (!this.authorizedList['program.students'] &&
    !this.authorizedList['program_registration.update'] &&
    !this.authorizedList['program_registration.delete']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.index();
    }
  }
  async index(){
    this.data = await this.service.index();
    //console.log(this.data);
    if (this.data.length == 0 || !this.data) {
      this.backToHomeFlag = true;
      this.flashMessage.show('لا يوجد طلاب مسجلين في هذا البرنامج',{ cssClass: "flash_danger", timeout:6000});
    } 
  }

  async delete(studentId:number){
    if (this.authorizedList['program_registration.delete']) {
      this.deleteService.pathName = 'students/program/registration';
      var format = {
        "studentId": studentId,
        "programId": +this.programId
      };
      //console.log(format);
      await this.deleteService.deleteWithParams(format);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }

}
