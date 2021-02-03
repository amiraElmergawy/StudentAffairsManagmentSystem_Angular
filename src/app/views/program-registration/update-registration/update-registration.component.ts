import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { SpecialServices } from 'src/app/services/special-services.service';

@Component({
  selector: 'app-update-registration',
  templateUrl: './update-registration.component.html',
  styleUrls: ['./update-registration.component.scss']
})
export class UpdateRegistrationComponent implements OnInit {
  semesters = [
    'الفصل الدراسي الاول',
    'الفصل الدراسي الثاني'
  ];
  levels = [
    'المستوي  الاول',
    'المستوي  الثاني',
    'المستوي  الثالث',
    'المستوي  الرابع'
  ];
  programs;
  academicYear:string;
  currentLevel:number = null;
  semester:number = null;
  studentId:number;
  programId:number = null;
  authorizedList;
  studentCurrentData;
  constructor(private service:MainService,
    private actRoute:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
    // private deleteService:SpecialServices,
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
      this.studentId = this.actRoute.snapshot.params.id.valueOf(); 
    }
    
    ngOnInit(): void {
    if (!this.authorizedList['program_registration.update']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getStudentData();
    }
  }
  
  async getStudentData(){
    this.service.pathName = 'students/'+this.studentId;
    this.studentCurrentData = await this.service.show();
    //console.log(this.studentCurrentData);
    this.getAllPrograms();
  }
  
  // getAllPrograms used to get all current programs to transfer student to
  async getAllPrograms(){
    var currentProgram:any;
    this.service.pathName = 'programs/'+this.studentCurrentData?.program?.Id;
    currentProgram = await this.service.show();
    if (currentProgram && currentProgram?.childs?.length != 0) {
      this.programs = currentProgram?.childs;
    } else {
      this.flashMessage.show("لا يوجد برامج متشعبة من  هذا البرنامج", { cssClass: 'flash_danger' });
    }
    //console.log(this.programs);
  }

  testInputsValidity():boolean{
    // console.log();
    // console.log(this.academicYear.length);
    if (this.academicYear.length == 9 && 
      this.academicYear.search('(20)[0-9]{2}\-(20)[0-9]{2}') == 0) {
        // if year is in the shape 2019/2020 then the the year is valid
        return true;
        //console.log('3aaaaash');
    } else {
      this.flashMessage.show('يجب ان تكون قيمة السنة الدراسية بهذا الشكل 2019-2020', { cssClass: 'flash_danger', timeout: 5000 });
      //console.log('else');
      return false;
    }
  }

  // register used to send the registration request by calling create function from service 
  // only if the user select program, semester & type the academic year in its valid shape
  async update(){
    if(this.authorizedList['program_registration.update']) {
    if (this.testInputsValidity() == true &&
     this.semester && this.programId){
      this.service.pathName = 'students/program/registration';
      var format = {
        "studentId":+this.studentId,
	      "programId":+this.programId,
        "academicYear": this.academicYear,
        "semester": +this.semester,
        "currentLevel": +this.currentLevel
      }
      //console.log(format);
      await this.service.update(format);
    }
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }

  // async delete(){
  //   if (this.authorizedList['program_registration.delete']) {      
  //     this.deleteService.pathName = 'students/program/registration';
  //     var format = {
  //       "studentId": this.studentId,
  //       "programId": this.studentCurrentData?.program?.Id
  //     }
  //     await this.deleteService.deleteWithParams(format);
  //   }
  //   else {
  //     this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
  //   }
  // }

}
