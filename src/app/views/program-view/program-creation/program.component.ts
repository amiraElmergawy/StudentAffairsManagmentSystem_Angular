import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/classes/dbClasses/program/program';
import { MainService } from 'src/app/services/main-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForbidenNamesService } from 'src/app/services/validation-services/forbiden-names.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  //********following variables for html code*/
ismajor=[
  'نعم',
  'لا'
];
departments;
currentDeptMajors=null;
// programParents=null;
//******************** */
  // program = new Program ('','',null,null,null,null,null,null);
  createdData;
  currentProgramArNames: string[];
  currentProgramEnNames: string[];
  programForm: FormGroup;
  programId:number;
  authorizedList;
  constructor(private service:MainService,
    private validationService: ForbidenNamesService,
    private flashMessage: FlashMessagesService,
    private storage:LocalStorageService,
    private router:Router
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList'); 
      this.currentProgramArNames = [""];
    this.currentProgramEnNames = [""];
  }
  ngOnInit(): void {
    if (!this.authorizedList['programs.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.getDepartments();
    this.programForm = new FormGroup({
      'arName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("([\u0621-\u064A]{4,}(\u0020)?)+"), // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
        //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        this.validationService.forbiddenNames(this.currentProgramArNames)
      ]),
      'enName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("[A-Z]([a-zA-Z]{2,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        this.validationService.forbiddenNames(this.currentProgramEnNames)
      ]),
      'departmentId': new FormControl(null),
      'isMajor': new FormControl(null,Validators.required),
    });
    // this.programForm.valueChanges.subscribe(value =>
    //   console.log(this.programForm)
    // );
    // this.programForm.statusChanges.subscribe(status => console.log(status));
  }
}
  async getDepartments(){
    this.service.pathName = "departments";
    this.departments = await this.service.index();
  }

  // create() take the input data from form and send it to the service

  async create(){
    this.service.pathName = "programs";  
   var program={
    "arName":this.programForm.get("arName").value,
    "enName":this.programForm.get("enName").value,
    "departmentId":this.programForm.get("departmentId").value,
    "isMajor":this.programForm.get("isMajor").value,
   };
    this.createdData = await this.service.create(program);
    //console.log(program);
    //console.log(this.createdData);
    if(this.createdData){
      this.programId = +this.createdData.Id;
    }
    //this.flashMessage.show("تمت اضافة البرنامج بنجاح", { timeout: 2000 });
  }
 // clear fun. to reset all the form inputs
 clear(){
   this.programForm.reset();
 }
}
