import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForbidenNamesService } from 'src/app/services/validation-services/forbiden-names.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-program-update',
  templateUrl: './program-update.component.html',
  styleUrls: ['./program-update.component.scss']
})
export class ProgramUpdateComponent implements OnInit {
  //********following variables for html code*/
  ismajor=[
    'نعم',
    'لا'
  ];
  departments;
  programId:number;
  //******************** */
    updatedData;
    currentProgramArNames: string[];
    currentProgramEnNames: string[];
    programForm: FormGroup;
    currentProgramData;
    authorizedList;
    constructor(private service:MainService,
      private validationService: ForbidenNamesService,
      private flashMessage: FlashMessagesService,
      private actRoute:ActivatedRoute,
      private storage:LocalStorageService,
      private router:Router
      ) {
        this.authorizedList = this.storage.retrieve('backNamesList'); 
        this.programId = this.actRoute.snapshot.params.id.valueOf();
        this.currentProgramArNames = [""];
      this.currentProgramEnNames = [""];
    }
    ngOnInit(): void {
      if (!this.authorizedList['programs.linkParent'] &&
      !this.authorizedList['programs.update'] &&
      !this.authorizedList['programs.destroy']) {
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
          this.validationService.forbiddenNames(this.currentProgramArNames,this.programId) // to force user not to use the exist arNames except current arName
        ]),
        'enName': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("[A-Z]([a-zA-Z]{2,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
          this.validationService.forbiddenNames(this.currentProgramEnNames,this.programId)
        ]),
        'departmentId': new FormControl(null),
        'isMajor': new FormControl(null,Validators.required),
      });
      this.initForm();
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
    // getcurrentProgramData func. used to get the current data of the specified program to be shown so that user change only data needed
   async initForm(){
    this.service.pathName = 'programs/'+this.programId;
    this.currentProgramData = await this.service.show();
    //console.log(this.currentProgramData);
    this.programForm.setValue({
     'arName': this.currentProgramData?.arName,
     'enName': this.currentProgramData?.enName,
     'departmentId':this.currentProgramData?.department?.id,
     'isMajor': +this.currentProgramData?.isMajor,
   });
  }
    // create() take the input data from form and send it to the service
    async update(){
      if (this.authorizedList['programs.update']) {
        this.service.pathName = 'programs/'+this.programId;
        var program={
          "arName":this.programForm.get("arName").value,
          "enName":this.programForm.get("enName").value,
          "departmentId":this.programForm.get("departmentId").value,
          "isMajor":this.programForm.get("isMajor").value,
    };
    this.updatedData = await this.service.update(program);
    //console.log(this.updatedData);
      } else {
        this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
      }
      // this.flashMessage.show("تم تحديث البرنامج بنجاح", { timeout: 2000 });
    }
    async delete(){
      if (this.authorizedList['programs.destroy']) {
      this.service.pathName = 'programs/'+this.programId;// redirect service URL to delete the program with id 'programId'
      await this.service.delete();
      // this.flashMessage.show("تم مسح البرنامج بنجاح", { timeout: 2000 });
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
    }
    //clear fun used to return the form data to current original data 
    clear(){
      this.programForm.setValue({
        'arName': this.currentProgramData?.arName,
        'enName': this.currentProgramData?.enName,
        'departmentId':this.currentProgramData?.department?.id,
        'isMajor':+this.currentProgramData?.isMajor,
      });
    }
   

}
