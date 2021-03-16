import { Component, OnInit, Input } from "@angular/core";
import { MainService } from "src/app/services/main-service";
//import { Division } from 'src/app/classes/dbClasses/division/division';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ForbidenNamesService } from "src/app/services/validation-services/forbiden-names.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

//import { Subscription } from 'rxjs';

@Component({
  selector: "app-division",
  templateUrl: "./division.component.html",
  styleUrls: ["./division.component.scss"]
  // providers:[MainService] //to inform angular to create this service
})
export class DivisionComponent implements OnInit {
  createdData;
  departments;
  currentdivisionNames: string[];
  divisionForm: FormGroup;
  authorizedList;
  constructor(
    private service: MainService,
    private storage: LocalStorageService,
    private validationService: ForbidenNamesService,
    private flashMessage: FlashMessagesService,
    private router:Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.currentdivisionNames = [""];
  }
  ngOnInit(): void {
    if (!this.authorizedList['divisions.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    this.getDepartments();
    this.getDivisions();
    this.divisionForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("([a-zA-Z\u0621-\u064A ]{5,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        this.validationService.forbiddenNames(this.currentdivisionNames)
      ]),
      'departmentId': new FormControl(null, Validators.required)
    });
    //  this.divisionForm.valueChanges.subscribe(
    //    (value) => console.log(this.divisionForm)
    //  );
    // this.divisionForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );
  }
  // getDepartments used to get all departments to choose the wanted department
  async getDepartments() {
    this.service.pathName = "departments";
    this.departments = await this.service.index();
    // this.departments.shift();
  }
  // getDivisions used to get all current divisions then extract thier names to compare the enterd division name with every current name to not repeat it again
  // then send it to validation service to do this comparison
  async getDivisions() {
    let divisions = null;
    this.service.pathName = "divisions";
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
  async create() {
      this.service.pathName = "divisions";
      var div = {
        'name': this.divisionForm.get("name").value,
        'departmentId': this.divisionForm.get("departmentId").value
      };
      //console.log(div);
      this.createdData = await this.service.create(div);
  }
}
