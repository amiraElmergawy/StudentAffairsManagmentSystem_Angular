import { Component, OnInit } from '@angular/core';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { MainService } from 'src/app/services/main-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-student-assential-data',
  templateUrl: './show-student-assential-data.component.html',
  styleUrls: ['./show-student-assential-data.component.scss']
})
export class ShowStudentAssentialDataComponent implements OnInit {

  nationalities;// to save nationalities coming from get nationalities request
  studentNationality:string;
  studentData;
  constructor(
    private dataService:SharingDataService,
    private nationalitiesService: MainService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.studentData =  this.dataService.getData();
    if (this.studentData) {
      this.dataService.setData(this.studentData);

    } else {
      this.router.navigate(['/no-page-found/']);
    }
    this.getNationalities();
  }
  // getNationalities function used to get all current nationalities to send them to the pipe 
    // and convert the nationality id into the country name
    async getNationalities(){
      this.nationalitiesService.pathName = "nationalities";
      this.nationalities = await this.nationalitiesService.index();
      this.nationalities.forEach(element => {
        if (element.id == this.studentData?.additionalInfo?.nationalitiesId) {
          this.studentNationality = element.countryArName;
        }
      });
      this.studentNationality+='ي';
      //console.log(this.nationalities);
    }

}
