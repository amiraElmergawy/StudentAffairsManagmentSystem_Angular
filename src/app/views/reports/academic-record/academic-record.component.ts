import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-academic-record',
  templateUrl: './academic-record.component.html',
  styleUrls: ['./academic-record.component.scss']
})
export class AcademicRecordComponent implements OnInit {
  record;
  studentData;
  studentId;
  authorizedList;
  constructor(private service: MainService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = this.actRoute.snapshot.params.id.valueOf();
    this.service.pathName = 'students/' + this.studentId + '/academic-record';
  }

  ngOnInit(): void {
    if (!this.authorizedList['student.academic_record']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.studentRecord();
    }
  }

  async studentRecord() {
    this.record = await this.service.show();
    this.studentData = this.record.student;
    delete this.record.student;
    console.log(this.studentData);

  }

  getSemester(semester) {
    if (semester === '1')
      return 'Winter';
    else if (semester === '2')
      return 'Spring';
    else if (semester === '3')
      return 'Summer';
  }

  print() {
    window.print();
  }
}
