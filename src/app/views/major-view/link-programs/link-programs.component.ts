import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main-service';
import { LinkService } from 'src/app/services/link.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-link-programs',
  templateUrl: './link-programs.component.html',
  styleUrls: ['./link-programs.component.scss']
})
export class LinkProgramsComponent implements OnInit {

  majorId: number;
  availablePrograms = null;
  programId: number;
  displayFlag: boolean = false;
  linkForm: FormGroup;
  // linkPackage = {
  //   semesterNo:1,
  //   semesterHours:16,
  //   programId : 1
  // };
  linkPrograms = {
    "": {
      "": "",
      " ": ""
    }
  };
  programsCount: number = 0;
  currentPrograms = null;
  authorizedList;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private dataService: MainService,
    private linkService: LinkService,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.majorId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    if (!this.authorizedList['majors.update-programs'] &&
      !this.authorizedList['majors.get-programs']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.flashMessage.show("تحذير قد تكون نتائج هذه العملية غير متوقعة",  { cssClass: 'flash_danger' })
      this.getPrograms();
      this.getCurrentPrograms();
      this.linkForm = new FormGroup({
        'semesterNo': new FormControl(null, [
          Validators.required,
          Validators.pattern('[1-8]')
        ]),
        'semesterHours': new FormControl(null, [
          Validators.required,
          Validators.pattern('1[6-9]')
        ]),
        'programId': new FormControl(null, Validators.required)
      });
    }
  }
  //getCurrentPrograms() to get current programs' data that already linked with the major
  async getCurrentPrograms() {
    this.dataService.pathName = 'majors/' + this.majorId + '/programs';
    this.currentPrograms = await this.dataService.index();
   // this.currentPrograms.sort((p1,p2)=> {p1.semester<p2.semester?1:-1});
    //console.log(this.currentPrograms);
  }

  // getPrograms to get all programs to be link with the major from their current dept
  async getPrograms() {
    this.dataService.pathName = 'majors/' + this.majorId;
    var majorData = null;
    majorData = await this.dataService.show();
    if (majorData) {
      this.dataService.pathName = 'departments/' + majorData?.department.id;
      var departmentData = null;
      departmentData = await this.dataService.show();
      if (departmentData) {
        this.availablePrograms = departmentData.programs;
        if (!this.availablePrograms) {
          this.flashMessage.show('لا يوجد برامج متاحة للربط', { cssClass: 'flash_danger', timeout: 5000 });
        }
      }
    }
  }
  // save dataLink to save each semester link
  saveProgram() {
    this.linkPrograms[this.linkForm.get('semesterNo').value] = {
      "program_id": this.linkForm.get('programId').value,
      "semester_hours": this.linkForm.get('semesterHours').value
    }
    this.clear();
    //console.log(this.linkPrograms);
  }

  // link take the program id and turn on the flag to display the semester hours and semester no.
  async link() {
    if (this.authorizedList['majors.update-programs']) {
      delete this.linkPrograms[""];
      if (this.linkForm.valid) {
        this.saveProgram();
        //console.log('else if');
        //console.log(this.linkPrograms);
        this.linkService.pathName = 'majors/' + this.majorId + '/programs';
        var format = {
          "programs": this.linkPrograms
        };
        //console.log(format);
        await this.linkService.linkMajorPrograms(format);
      }
      this.getCurrentPrograms();
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  //clear to reset the form data
  clear() {
    this.linkForm.reset();
  }
}
