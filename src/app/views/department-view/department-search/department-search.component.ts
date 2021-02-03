import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-department-search',
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.scss']
})
export class DepartmentSearchComponent implements OnInit {
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
  if (this.authorizedList['department.search']) {
    
    var deptSearch:{};
    switch (+this.choiseIndex)
    {
      case 0:
        {
          this.service.pathName ='departments/search?arName='+this.searchValue ;
          deptSearch={
            "arName":this.searchValue
          };
          //console.log("Hi from case 0");
          break;
        }
        case 1:
          {
            this.service.pathName ='departments/search?enName='+this.searchValue ;
            deptSearch={
              "enName":this.searchValue
            };
            //console.log("Hi from case 1");     
            break;
          }
          default:
            {
              //console.log("hi from default");
              deptSearch = null;
              break;
      } 
    }
    // console.log(this.service.pathName);
    // console.log(deptSearch);
    this.searchingResult = await this.service.search();
    //console.log(this.searchingResult);
  }
  }
}
