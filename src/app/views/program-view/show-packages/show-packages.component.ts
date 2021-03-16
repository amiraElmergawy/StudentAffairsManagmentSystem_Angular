import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { MainService } from 'src/app/services/main-service';

@Component({
  selector: 'app-show-packages',
  templateUrl: './show-packages.component.html',
  styleUrls: ['./show-packages.component.scss']
})
export class ShowPackagesComponent implements OnInit {

  semesterNo: number;
  programId: number;
  // countFirstKind:number = 0;
  // countSecondKind:number = 0;
  // countThirdKind:number = 0;
  countKinds: number[];//save number of packages in each kind 
  // as the first index will be # of first kind packages and so on...
  data = null;
  authorizedList;
  packages = [  //initialize packages array with dummy data it will be removed aster saving another data 
    {
      id: 5,
      hoursToReg: 2,
      kind: 3,
      orderOfShowing: 1,
      semester: 3,
      courses: [
        {
          arCode: "201 انج",
          arName: "لغة إنجليزية (2)",
          available: null,
          degree: 100,
          degreeTemplate: { id: 6, theory: 100, activity: 0, oral: 0, practical: 0, exercise: 0 },
          description: "English Language 2",
          enCode: "ENGL 201",
          enName: "English 2",
          hours: 2,
          id: 15,
          prePackages: [
            {
              arCode: "201 انج",
              arName: "لغة إنجليزية (2)",
              available: null,
              degree: 100,
              degreeTemplate: { id: 6, theory: 100, activity: 0, oral: 0, practical: 0, exercise: 0 },
              description: "English Language 2",
              enCode: "ENGL 201",
              enName: "English 2",
              hours: 2,
              id: 15,
              prePackages: [],
              weeklyHoursTemplate: { id: 18, theory: 2, exercise: 0, practical: 0 },
            }],
          weeklyHoursTemplate: { id: 18, theory: 2, exercise: 0, practical: 0 },
        }
      ]
    }
  ];
  constructor(private actRoute: ActivatedRoute,
    private sharingService: SharingDataService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
    private dataService: MainService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    // this.semesterNo = this.actRoute.snapshot.params.id.valueOf();    
  }

  ngOnInit(): void {
    if (!this.authorizedList['program.get-prerequisites'] &&
      !this.authorizedList['program.insert-prerequisites'] &&
      !this.authorizedList['programs.delete-prepackages'] &&
      !this.authorizedList['packages.index'] &&
      !this.authorizedList['packages.show']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.actRoute.params.subscribe(params => {
        //console.log(params);
        this.programId = +params.programId;
        this.semesterNo = +params.semesterNo;
      });
      this.countKinds = [0, 0, 0];
      this.data = this.sharingService.getData();
      if (this.data == null) {
        this.getProgram();
        //this.filteringData();
      } else {
        this.filteringData();
      }
      //console.log(this.data);
    }
  }
  async getProgram() {
    this.dataService.pathName = 'programs/' + this.programId;
    let program: any = await this.dataService.show();
    this.data = program?.packages;
    this.filteringData();
  }
  // filteringData used to only show the needed packages to the user
  // takes semester number and filter the data 
  filteringData() {
    //console.log(this.data);
    this.data.forEach(element => {
      if (element.semester == this.semesterNo) {
        this.packages?.push(element);
      }
    });
    //console.log(this.packages);
    this.packages?.shift(); // to delete the initial data (dummy)
    //console.log(this.packages);
    // to count each package kind of the selected packages to be shown
    this.packages.forEach(element => {
      if (element.kind == 1) {
        this.countKinds[0] = element.courses.length;
      }
      else if (element.kind == 2) {
        this.countKinds[1] = element.courses.length;
      }
      else { // kind = 3
        this.countKinds[2] = element.courses.length;
      }
    });
    //console.log(this.packages);
    //this.packages?.shift(); // to delete the initial data (dummy)
    //console.log(this.countKinds);
  }

}
