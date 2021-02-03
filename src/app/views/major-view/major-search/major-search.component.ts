import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-major-search',
  templateUrl: './major-search.component.html',
  styleUrls: ['./major-search.component.scss']
})
export class MajorSearchComponent implements OnInit {
  searchWays=[
    'الاسم العربي',
    'الاسم الانجليزي'
    ];
  choiseIndex:number = null;
  //************** */ 
  searchingResult;
  authorizedList;
  // course= new CourseBase('','','','',null,null,'');
  searchValue:string;
  constructor(private service:MainService,
    private storage: LocalStorageService,
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList'); 
  }
  
  ngOnInit(): void {
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event);

    if (event.keyCode == 13) {// enter key code
      if (this.searchValue && this.choiseIndex ) {
        this.search();
      }
    }
  }
  //URL request must be : .../search?enName=&arName=تاني 
  async search(){
  //  console.log(this.choiseIndex);
    var divisionSearch:{};
    switch (+this.choiseIndex)
     {
     case 0:
       {
      this.service.pathName ='majors/search?arName='+this.searchValue ;
       divisionSearch={
        "arName":this.searchValue
       };
       //console.log("Hi from case 0");
       break;
      }
       case 1:
         {
          this.service.pathName ='majors/search?enName='+this.searchValue ;
       divisionSearch={
        "enName":this.searchValue
       };
      //console.log("Hi from case 1");     
       break;
      }
     default:
       {
     //console.log("hi from default");
     divisionSearch = null;
       break;
      } 
   }
  // console.log(this.service.pathName);
  // console.log(divisionSearch);
    this.searchingResult = await this.service.search();
    //console.log(this.searchingResult);
  }
}
