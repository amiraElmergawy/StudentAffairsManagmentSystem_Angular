import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-register-sutdent-to-program',
  templateUrl: './register-sutdent-to-program.component.html',
  styleUrls: ['./register-sutdent-to-program.component.scss']
})
export class RegisterSutdentToProgramComponent implements OnInit {
  semesters = [
    'الفصل الدراسي الاول',
    'الفصل الدراسي الثاني'
  ];
  programs;
  academicYear;
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
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = this.actRoute.snapshot.params.id.valueOf(); 
  }
  ngOnInit(): void {
    if (!this.authorizedList['student.programRegister']) {
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
      this.academicYear.search('(20)[0-9]{2}\/(20)[0-9]{2}') == 0) {
        // if year is in the shape 2019/2020 then the the year is valid
        return true;
        //console.log('3aaaaash');
    } else {
      this.flashMessage.show('يجب ان تكون قيمة السنة الدراسية بهذا الشكل 2019/2020', { cssClass: 'flash_danger', timeout: 5000 });
      //console.log('else');
      return false;
    }
  }

  // register used to send the registration request by calling create function from service 
  // only if the user select program, semester & type the academic year in its valid shape
  async register(){
    if (this.testInputsValidity() == true && this.semester && this.programId) {
      this.service.pathName = 'students/program/'+this.programId+'/registration';
      var format = {
        "academicYear": this.academicYear,
	      "students": [this.studentId],
	      "semester": this.semester
      }
      //console.log(format);
      await this.service.create(format);
    }
  }

}
