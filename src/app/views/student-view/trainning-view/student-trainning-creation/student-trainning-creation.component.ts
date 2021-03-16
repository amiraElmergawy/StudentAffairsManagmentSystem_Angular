import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-student-trainning-creation',
  templateUrl: './student-trainning-creation.component.html',
  styleUrls: ['./student-trainning-creation.component.scss']
})
export class StudentTrainningCreationComponent implements OnInit {

  studentId: number;
  trainningForm: FormGroup;
  authorizedList;
  constructor(
    private service: MainService,
    private actRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = this.actRoute.snapshot.params.id.valueOf();
  }

  ngOnInit(): void {
    if (!this.authorizedList['student.add-training']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.trainningForm = new FormGroup({
        'place': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        ]),
        'topic': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+"), // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        ]),
        'durationInDays': new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9]+')
        ])
      });
      // this.trainningForm.valueChanges.subscribe(
      //   (value) => console.log(this.trainningForm)
      // );
      // this.trainningForm.statusChanges.subscribe(
      //   (status) => console.log(status)
      // );
    }
  }


  //create used to submit the enterd data and send it to server with its service pathName and create func.
  async create() {
    this.service.pathName = 'students/' + this.studentId + '/training';
    var format = {
      "data": [
        {
          "id": 2,
          "pivot": {
            "level": 5
          }
        },
        {
          "id": 21,
          "place": "Plexa",
          "topic": "AAAAA",
          "duration_in_days": 15,
          "pivot": {
            "level": 3
          }
        },
        {
          "id": 23,
          "place": "Vitol 222",
          "topic": "AAAAA",
          "duration_in_days": 15,
          "pivot": {
            "level": 2
          }
        }
      ]
    }
    await this.service.create(format);
  }
  //clear fun to reset all the form data
  clear() {
    this.trainningForm.reset();
  }

}
