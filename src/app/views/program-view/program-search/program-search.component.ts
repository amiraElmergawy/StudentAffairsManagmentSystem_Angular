import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-program-search',
  templateUrl: './program-search.component.html',
  styleUrls: ['./program-search.component.scss']
})
export class ProgramSearchComponent implements OnInit {
  searchWays=[
    'الاسم العربي',
    'الاسم الانجليزي'
    ];
  choiseIndex:number = null;
  //************** */ 
  searchingResult = null;
  // course= new CourseBase('','','','',null,null,'');
  searchValue:string;
  authorizedList;
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
    var programSearch:{};
    switch (+this.choiseIndex)
     {
     case 0:
       {
      this.service.pathName ='programs/search?arName='+this.searchValue ;
       programSearch={
        "arName":this.searchValue
       };
       //console.log("Hi from case 0");
       break;
      }
       case 1:
         {
          this.service.pathName ='programs/search?enName='+this.searchValue ;
       programSearch={
        "enName":this.searchValue
       };
      //console.log("Hi from case 1");     
       break;
      }
     default:
       {
     ////console.log("hi from default");
     programSearch = null;
       break;
      } 
   }
  // //console.log(this.service.pathName);
  // //console.log(programSearch);
    this.searchingResult = await this.service.search();
    //console.log(this.searchingResult);
  }
}
