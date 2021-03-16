import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForbidenNamesService } from 'src/app/services/validation-services/forbiden-names.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.scss']
})
export class CourseUpdateComponent implements OnInit {
  data;
  updatedData;
  courseId: number;
  courseForm: FormGroup;
  currentCourseData;// to save current course data
  currentCourseArCodes: string[]; // to save all current exist courses Arabic codes
  currentCourseEnCodes: string[]; // to save all current exist courses English codes
  authorizedList;
  constructor(private service: MainService,
    private actRoute: ActivatedRoute,
    private validationService: ForbidenNamesService,
    private storage: LocalStorageService,
    private flashMessage: FlashMessagesService,
    private router:Router
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.currentCourseArCodes = [""];
    this.currentCourseEnCodes = [""];
    this.courseId = this.actRoute.snapshot.params.id.valueOf();
  }
  ngOnInit(): void {
    if (!this.authorizedList['courses.update'] &&
    !this.authorizedList['courses.destroy']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    }
    this.getAllcourses();
    this.courseForm = new FormGroup({
      'arCode': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^[0-9]+(\u0020)?[\u0621-\u064A]{1,}$"), // this pattern to force user to only type arabic letters and spaces (at least 2 arabic letters then zero or one space) and code number
        //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        this.validationService.forbiddenNames(this.currentCourseArCodes, this.courseId) // to force user not to repeat names
      ]),
      'enCode': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^[A-Z]{3,}(\u0020)?[0-9]+$"), // this pattern to force user to just type english letters and spaces (at least 3 english letters then zero or one space) and code number
        this.validationService.forbiddenNames(this.currentCourseEnCodes,this.courseId)
      ]),
      'arName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^([\u0621-\u064A \\\(\)\-\+\_0-9]{1,}(\u0020)?)+$") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
        //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
      ]),
      'enName': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^([a-zA-Z \\\(\)\-\+\_\.0-9]{1,}(\u0020)?)+$") // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
      ]),
      'hours': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$") // to reject '0001' case and signs
      ]),
      'degree': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'description': new FormControl(null, Validators.required),
      'hTheory': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'hExercise': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'hPractical': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'theory': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'activity': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'oral': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'practical': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      'exercise': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ])
    });
    // this.courseForm.valueChanges.subscribe(value =>
    //   //console.log(this.courseForm)
    // );
    // this.courseForm.statusChanges.subscribe(status => console.log(status));
  }
  // getAllcourses used to get all current courses then extract thier names to compare the enterd program name with every current name to not repeat it again
  // then send it to validation service to do this comparison
  // save current course data to initilze the form with it and extract the current codes from the comparison
  async getAllcourses() {
    let courses = null;
    this.service.pathName = "courses";
    courses = await this.service.index();
    if (courses != []) {
      courses.forEach(element => {
        if (element.id == this.courseId) {
          this.currentCourseData = element;// to take this data and initilize form with it
        }
        this.currentCourseArCodes.push(element.arCode);
        this.currentCourseEnCodes.push(element.enCode);
      });
      // console.log(this.currentCourseArCodes);
      this.currentCourseArCodes.shift(); // to remove the first element (dummy-data)
      this.currentCourseEnCodes.shift(); // to remove the first element (dummy-data)
    }
    this.formInit(); // as current course data has been saved
  }
  // formInit fun used to set form values with current values to anable user view current data and change only wanted
  async formInit() {
    // this.service.pathName = 'courses/'+this.courseId;
    // this.currentCourseData = await this.service.show();
    this.courseForm?.setValue({
      "arCode": this.currentCourseData?.arCode,
      "enCode": this.currentCourseData?.enCode,
      "arName": this.currentCourseData?.arName,
      "enName": this.currentCourseData?.enName,
      "hours": this.currentCourseData?.hours,
      "degree": this.currentCourseData?.degree,
      "description": this.currentCourseData?.description,
      "theory": +this.currentCourseData?.degreeTemplate?.theory,
      "activity": +this.currentCourseData?.degreeTemplate?.activity,
      "oral": +this.currentCourseData?.degreeTemplate?.oral,
      "practical": +this.currentCourseData?.degreeTemplate?.practical,
      "exercise": +this.currentCourseData?.degreeTemplate?.exercise,
      "hTheory": +this.currentCourseData?.weeklyHoursTemplate?.theory,
      "hExercise": +this.currentCourseData?.weeklyHoursTemplate?.exercise,
      "hPractical": +this.currentCourseData?.weeklyHoursTemplate?.practical
    })

  }
  // update() take the input data from form and send it to the service
  // then pop a flash message and clear form data
  async update() {
    if (this.authorizedList['courses.update']) {      
      this.service.pathName = 'courses/' + this.courseId;
      var course = {
        'arCode': this.courseForm.get("arCode").value,
        'enCode': this.courseForm.get("enCode").value,
        'arName': this.courseForm.get("arName").value,
        'enName': this.courseForm.get("enName").value,
        'hours': this.courseForm.get("hours").value,
        'degree': this.courseForm.get("degree").value,
        'description': this.courseForm.get("description").value,
        'degreeTemplate': {
          'theory': this.courseForm.get("theory").value,
          'activity': this.courseForm.get("activity").value,
          'oral': this.courseForm.get("oral").value,
          'practical': this.courseForm.get("practical").value,
          'exercise': this.courseForm.get("exercise").value
        },
        'weeklyHoursTemplate': {
          'theory': this.courseForm.get("hTheory").value,
          'exercise': this.courseForm.get("hExercise").value,
          'practical': this.courseForm.get("hPractical").value
        }
      };
      this.flashMessage.show("تم تعديل المقرر بنجاح", { timeout: 2000 });
      this.updatedData = await this.service.update(course);
      //console.log(this.updatedData);
      this.clear();
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
    // clear fun. to reset all the form inputs
  clear() {
    this.formInit();
    //this.courseForm.reset();
  }
  async delete() {
    if (this.authorizedList['courses.destroy']) {      
      this.service.pathName = 'courses/' + this.courseId;
      await this.service.delete();
      //this.flashMessage.show("تم مسح المقرر بنجاح", { timeout: 2000 });
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
}
