import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {
  //*** html variables declaration section */
  searchWays=[
    'الاسم العربي',
    'الاسم الانجليزي',
    'كود المقرر العربي',
    'كود المقرر الانجليزي'
  ];
  choiseIndex:number = null;
  //************** */ 
  searchingResult = null;
  // course= new CourseBase('','','','',null,null,'');
  searchValue:string = null;
  authorizedList;
  constructor(
    private storage:LocalStorageService,
    private service:MainService) { 
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
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
    var courseSearch:{};
    switch (+this.choiseIndex)
     {
     case 0:
       {
      this.service.pathName ='courses/search?arName='+this.searchValue ;
       courseSearch={
        "arName":this.searchValue
       };
       //console.log("Hi from case 0");
       break;
      }
       case 1:
         {
          this.service.pathName ='courses/search?enName='+this.searchValue ;
       courseSearch={
        "enName":this.searchValue
       };
      //console.log("Hi from case 1");     
       break;
      }
       case 2:
         {
          this.service.pathName ='courses/search?arCode='+this.searchValue ;

       courseSearch={
        "arCode":this.searchValue
       };
     //  console.log("Hi from case 2");
       break;
      }
       case 3:
         {
          this.service.pathName ='courses/search? enCode='+this.searchValue ;
       courseSearch={
        "enCode":this.searchValue
       };
     //  console.log("Hi from case 3");     
       break;
      }
     default:
       {
     //console.log("hi from default");
     courseSearch = null;
       break;
      } 
   }
   //console.log(this.service.pathName);
   //console.log(courseSearch);
    this.searchingResult = await this.service.search();
    //console.log(this.searchingResult);
  }
}
