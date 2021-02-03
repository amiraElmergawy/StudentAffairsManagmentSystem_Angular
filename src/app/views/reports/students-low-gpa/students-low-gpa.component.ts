import { Component, OnInit } from '@angular/core';
import { MainService } from "src/app/services/main-service";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-students-low-gpa',
  templateUrl: './students-low-gpa.component.html',
  styleUrls: ['./students-low-gpa.component.scss']
})
export class StudentsLowGpaComponent implements OnInit {
  data;
  authorizedList;
  constructor(private services: MainService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.services.pathName = 'reports/get-gpa'
  }

  ngOnInit(): void {
    if (!this.authorizedList['reports.with-low-gpa']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getData();
    }
  }
  async getData() {
    this.data = await this.services.show();
    console.log(this.data);
  }
  getLevel(level) {
    if (level === '1') {
      return 'المستوى الاول ';
    }
    else if (level === '2') {
      return 'المستوى الثانى ';
    }
    else if (level === '3') {
      return 'المستوى الثالث ';
    }
    else if (level === '4') {
      return 'المستوى الرابع ';
    }
  }
  print() {
    window.print();
  }
}
