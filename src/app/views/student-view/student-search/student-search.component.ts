import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {
  searchWays=[
      'الرقم القومي',
      'الاسم العربي',
      'الاسم الانجليزي',
      'القسم',
      'البرنامج',
      'التخصص',
      'الكود الاكاديمي'
    ];
    choiseIndex : string;
    //************** */ 
    searchingResults = null;
    // student= new studentBase('','','','',null,null,'');
    searchValue:string = null;
    selectFlag:boolean = false;
    selectData;
    authorizedList;
    dropdownSettings :IDropdownSettings= {};
    studentLinkFlag = false;
  constructor(private service:MainService,
    private storage: LocalStorageService) { 
    // this.service.pathName = 'students/search';
    this.authorizedList = this.storage.retrieve('backNamesList');
  }
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField:'id',
      textField: 'arName',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };
    this.studentInfoLink();
    // this.searchingResults?.suscribe(
    //   ()=>{
    //     if (this.searchingResults == null) {
    //       console.log('from if stat');
    //       this.showingFlag = false;
    //     }
    //     else
    //     console.log('from else stat');
    //   }
    // );
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
  studentInfoLink(){
    if (this.authorizedList['students.show'] ||
    this.authorizedList['students.destroy'] ||
    this.authorizedList['student.bills'] ||
    this.authorizedList['student.transfer'] ||
    this.authorizedList['students.update'] ||
    this.authorizedList['student.delete_bill'] ||
    this.authorizedList['student.programRegister'] ||
    this.authorizedList['student.update_bill'] ||
    this.authorizedList['student.add_bill'] ||
    this.authorizedList['student.manage-hours-balance'] ||
    this.authorizedList['student.military-service'] ||
    this.authorizedList['student.delete-training'] ||
    this.authorizedList['student.add-training'] ||
    this.authorizedList['student.trainings'] ||
    this.authorizedList['course-registrations.store'] ||
    this.authorizedList['course-registrations.index'] ||
    this.authorizedList['course-registrations.show'] ||
    this.authorizedList['course-registrations.destroy'] || 
    this.authorizedList['course-registrations.degree']) {
      this.studentLinkFlag = true;
    }
  }
  async getDepts(){
    this.service.pathName = 'departments';
    this.selectData = await this.service.index();
    // this.selectData.shift();
    // console.log("data from depts: ");
    //   console.table(this.selectData);
  }
  async getPrograms(){
    this.service.pathName = 'programs';
    this.selectData = await this.service.index();
    // this.selectData.shift();
  }
  async getMajors(){
    this.service.pathName = 'majors';
    this.selectData = await this.service.index();
  }
  onItemSelect(item){
    // console.log("selected item is: ");
    // console.log(item);
    switch (item) {
      case 'القسم':{// selected item is department
       //console.log("hello from dept case: ");
       this.getDepts();
        this.selectFlag = true;
        break;
      }
      case 'البرنامج':{// selected item is program
        this.getPrograms();
        this.selectFlag = true;
        break;
      }
      case 'التخصص':{// selected item is major
        this.getMajors();
        this.selectFlag = true;
        break;
      }
      default:
        this.selectFlag = false;
        this.searchValue = null;
        break;
      }
      //console.log("selected data: ");
      //console.table(this.selectData);
  }
  onItemDeSelect(){
    this.selectFlag = false;
    this.selectData = null;
    this.choiseIndex='';
    this.searchingResults = null;
    this.searchValue = null;
  }
  /**
  'الرقم القومي',
      'الاسم العربي',
      'الاسم الانجليزي',
      'القسم',
      'البرنامج',
      'التخصص',
      'الكود الاكاديمي' */
 async search(){
  // console.log("choice: ");
  //console.log(this.choiseIndex[0]);
  //console.log(this.choiseIndex);

  // console.log("value: ");
 //console.log(this.searchValue);
  
    switch (this.choiseIndex[0])
     {
     case 'الرقم القومي':
       {
      this.service.pathName ='students/search?ssn='+this.searchValue ;
       
       //console.log("Hi from case 0");
       break;
      }
       case 'الاسم العربي':
         {
          this.service.pathName ='students/search?fullArName='+this.searchValue ;
       
      //console.log("Hi from case 1");     
       break;
      }
       case 'الاسم الانجليزي':
         {
          this.service.pathName ='students/search?fullEnName='+this.searchValue ;

     //  console.log("Hi from case 2");
       break;
      }
       case 'القسم':
         {
          this.service.pathName ='students/search? currentDepartment='+this.searchValue ;
       
     //  console.log("Hi from case 3");     
       break;
      }
      case 'البرنامج':
       {
      this.service.pathName ='students/search?currentProgram='+this.searchValue ;
       
       //console.log("Hi from case 0");
       break;
      }
       case 'التخصص':
         {
          this.service.pathName ='students/search?currentMajor='+this.searchValue ;
       
     //console.log("Hi from case 1");     
       break;
      }
       case 'الكود الاكاديمي':
         {
          this.service.pathName ='students/search?academicCode='+this.searchValue ;

     //  console.log("Hi from case 2");
       break;
      }
     default:
       {
     //console.log("hi from default");
     //console.log(this.service.pathName);
        this.service.pathName ='';
       break;
      } 
   }
  //  console.log("path name: ");
  //  console.log(this.service.pathName);
  if (this.service.pathName != '') {
    this.searchingResults = await this.service.search();
  }
   //console.log("results: ");
   //console.table(this.searchingResults);
}

}
