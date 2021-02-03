import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.scss']
})
export class CourseStudentsComponent implements OnInit {
  courseID;
  data;
  course;
  students;
  authorizedList;
  constructor(private service: MainService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.courseID = this.actRoute.snapshot.params.id.valueOf();
    this.service.pathName = 'courses/' + this.courseID + '/students';
  }

  ngOnInit(): void {
    if (!this.authorizedList['course.students']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getData();
    }
  }
  async getData() {
    this.data = await this.service.show();
    // console.log(this.data);
    this.course = this.data.course;
    this.students = this.data.students;
    await this.cleanDegreeTemplate();
  }
  cleanDegreeTemplate() {
    delete this.course.degree_template.id;
    for (var property in this.course.degree_template) {
      if (this.course.degree_template[property] == 0)
        delete this.course.degree_template[property]
    }
  }
  getArabicNames(name) {
    if (name == 'activity') {
      return 'الأنشطة';
    }
    else if (name == 'oral') {
      return 'شفوى';
    }
    else if (name == 'practical') {
      return 'عملى';
    }
    else if (name == 'theory') {
      return 'نظرى';
    }
    else if (name == 'exercise') {
      return 'تمارين';
    }
  }
  print() {
    window.print();
  }

}
