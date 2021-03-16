import { Component, OnInit } from '@angular/core';
import { MainService } from "src/app/services/main-service";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-students-report',
  templateUrl: './students-report.component.html',
  styleUrls: ['./students-report.component.scss']
})
export class StudentsReportComponent implements OnInit {
  data;
  authorizedList;
  constructor(private service: MainService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.service.pathName = 'reports/general-students-report';
  }

  ngOnInit(): void {
    if (!this.authorizedList['reports.general-report']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getData();
    }
  }
  async getData() {
    this.data = await this.service.show();
    console.log(this.data.by_department);
  }
  getLevel(level) {
    if (level === '1') {
      return 'المستوى الاول: ';
    }
    else if (level === '2') {
      return 'المستوى الثانى: ';
    }
    else if (level === '3') {
      return 'المستوى الثالث: ';
    }
    else if (level === '4') {
      return 'المستوى الرابع: ';
    }
  }
  print() {
    window.print();
  }
}
