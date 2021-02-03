import { Component, OnInit } from "@angular/core";
import { SharingDataService } from "src/app/services/sharing-data.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-course-details-pop-up",
  templateUrl: "./course-details-pop-up.component.html",
  styleUrls: ["./course-details-pop-up.component.scss"],
})
export class CourseDetailsPopUpComponent implements OnInit {
  courseData = null; // to save course data coming from dataService to be shown in popUp window

  constructor(
    private dataService: SharingDataService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.courseData = this.dataService.getData();
     if (this.courseData == null) {
       this.router.navigate(['no-longer-available']);// to force user navigate back to home 
     }
  }
}
