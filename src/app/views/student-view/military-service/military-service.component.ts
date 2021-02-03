import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-military-service',
  templateUrl: './military-service.component.html',
  styleUrls: ['./military-service.component.scss']
})
export class MilitaryServiceComponent implements OnInit {

  status = ["لا يوجد", "لم يحدد الموقف", "مطلوب", "اعفاء مؤقت", "مؤجل", "لم يصبه الدور", "اعفاء نهائي", "انهي الخدمة",];
  wanted = ["معفي", "غير معفي"];
  collageService = ["ادي", "لم يؤدي"];
  studentForm: FormGroup;
  authorizedList;
  studentId;
  constructor(private service: MainService,
    private actRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = this.actRoute.snapshot.params.id.valueOf();
 }

  ngOnInit(): void {
    if (!this.authorizedList['student.military-service']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.studentForm = new FormGroup({
          'status': new FormControl(null,[
            Validators.required
          ]),
          'wanted': new FormControl(null),
          'note': new FormControl(null,[
            Validators.pattern("([\u0621-\u064A]{1,}(\u0020)?)+"),
          ]),
          'trinaryNumber': new FormControl(null,[
            Validators.pattern("[0-9]+\/[0-9]+\/[0-9]+"),
            Validators.maxLength(20)
          ]),
          'postponedNumber': new FormControl(null,[
            Validators.pattern("([0-9]+\/){2}[0-9]+"),
            Validators.maxLength(25)
          ]),
          'issuingParty': new FormControl(null,[
            Validators.maxLength(100),
            Validators.pattern("([\u0621-\u064A]{1,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          ]),
          'collageService': new FormControl(null,[
            Validators.required
          ])
      });
      // this.studentForm.valueChanges.subscribe(value =>
      //   console.log(this.studentForm)
      // );
    }
  }
  async create(){
    if (this.authorizedList['student.military-service']) {
      var militaryCollageService = {
        "isWanted": this.studentForm.get(
          "wanted"
        ).value,
        "status": this.studentForm.get(
          "status"
        ).value,
        "note": this.studentForm.get(
          "note"
        ).value,
        "trinaryNumber": this.studentForm.get(
          "trinaryNumber"
        ).value,
        "postponedNumber": this.studentForm.get(
          "postponedNumber"
        ).value,
        "issuingParty": this.studentForm.get(
          "issuingParty"
        ).value,
        "collageService": this.studentForm.get(
          "collageService"
        ).value
      }
      this.service.pathName = "students/" + this.studentId + "/military";
      await this.service.create(militaryCollageService);
    }
  }
  clear(){
    this.studentForm.reset();
  }
}
