import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  registredCourse;
  //id:number;
  authorizedList;
  constructor(
    // private dataService: MainService,
    private sharingService: SharingDataService,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
    private router: Router
    //private actRoute: ActivatedRoute
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    //this.id = +this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.registredCourse = this.sharingService.getData();
    if (this.registredCourse == null) {
      this.flashMessage.show(" لا يوجد مقررات مسجلة", { cssClass: 'flash_danger' });
      //this.router.navigate(['/no-longer-page/']);
    }
  }
  // getCourses func. take the student id and give his available courses
  // redirct service pathName to api routing link the save the available courses of student(by id) in courses array
  // async getRegistredCourse() {
  //   //console.log("geting courses process is excuting....");
  //   this.dataService.pathName = "course-registrations/" + this.id;
  //   this.registredCourse = await this.dataService.show();
  //   console.log(this.registredCourse);
  //   this.sharingService.setData(this.registredCourse);
  // }
}
