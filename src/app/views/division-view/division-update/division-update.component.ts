import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LinkService } from 'src/app/services/link.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Division } from 'src/app/classes/dbClasses/division/division';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForbidenNamesService } from 'src/app/services/validation-services/forbiden-names.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-division-update',
  templateUrl: './division-update.component.html',
  styleUrls: ['./division-update.component.scss']
})
export class DivisionUpdateComponent implements OnInit {
  divisionId: number;
  updatedData;
  departments;
  currentdivisionNames: string[];
  divisionForm: FormGroup;
  wantedDivision;
  authorizedList;
  constructor(
    private service: MainService,
    private lService: LinkService,
    private actRoute: ActivatedRoute,
    private storage:LocalStorageService,
    private validationService: ForbidenNamesService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.currentdivisionNames = [''];
    this.divisionId = this.actRoute.snapshot.params.id.valueOf();
  }
  ngOnInit(): void {
    if (!this.authorizedList['divisions.update'] &&
    !this.authorizedList['divisions.unlink_department'] &&
    !this.authorizedList['divisions.destroy']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.getDepartments();
    this.getDivisions();
    //if (this.divisionForm?.get('name').value) {
      this.divisionForm = new FormGroup({
        'name': new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("([a-zA-Z\u0621-\u064A ]{5,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
          this.validationService.forbiddenNames(
            this.currentdivisionNames,
            this.divisionId
            )
          ]),
          'departmentId': new FormControl(null, Validators.required)
        });
        // this.divisionForm.valueChanges.subscribe(value =>
        //   console.log(this.divisionForm)
        //   );
          this.getWantedDivision();
        }
    // this.divisionForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );
  }
  // getDepartments used to get all departments to choose the wanted department
  async getDepartments() {
    this.service.pathName = 'departments';
    this.departments = await this.service.index();
    // this.departments.shift();
  }
  // getDivisions used to get all current divisions then extract thier names to compare the enterd division name with every current name to not repeat it again
  // then send it to validation service to do this comparison
  async getDivisions() {
    let divisions = null;
    this.service.pathName = 'divisions';
    divisions = await this.service.index();
    if (divisions != []) {
      divisions.forEach(element => {
        this.currentdivisionNames.push(element.name);
      });
      //console.log(this.currentdivisionNames);
      this.currentdivisionNames.shift(); // to remove the first element (dummy-data)
    }
    //console.log(divisions);
    //console.log(this.currentdivisionNames);
    //this.validationService.forbiddenNames(name,this.currentdivisionNames);
  }
  // getWantedDivision used to get the wanted to update division to show its current data in the form
  // and user change only the value needed to.
  async getWantedDivision() {
   // let wantedDivision; // used to save the coming data from service
    this.service.pathName = 'divisions/' + this.divisionId;
    this.wantedDivision = await this.service.show();
    // this.division.name = wantedDivision?.name;
    // this.division.departmentId = wantedDivision?.department.id;
    this.divisionForm.setValue({
      'name': this.wantedDivision?.name,
      'departmentId': +this.wantedDivision?.department?.id
    });
  }
  async update() {
    if (this.authorizedList['divisions.update']) {

      this.service.pathName = 'divisions/' + this.divisionId;
      var div = {
        'name': this.divisionForm.get('name').value,
        'departmentId': this.divisionForm.get('departmentId').value
      };
      this.updatedData = await this.service.update(div);
      //console.log(this.updatedData);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
  async delete() {
    if (this.authorizedList['divisions.destroy']) {
      this.service.pathName = 'divisions/' + this.divisionId;
    await this.service.delete();
  } else {
    this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
  }
  }
  async unLink() {
    if (this.authorizedList['division.unlink_department']) {
    this.lService.pathName =
      'divisions/' + this.divisionId + '/unlink/department';
    await this.lService.unLink();
    //console.log(this.updatedData);
  } else {
    this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
  }
  }
}
