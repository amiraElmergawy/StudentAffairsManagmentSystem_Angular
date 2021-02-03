import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';
import { async } from 'rxjs/internal/scheduler/async';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-program-show',
  templateUrl: './program-show.component.html',
  styleUrls: ['./program-show.component.scss']
})
export class ProgramShowComponent implements OnInit {
  data;
  programId:number;
  levels=[
    'المستوي الاول',
    'المستوي الثاني',
    'المستوي الثالث',
    'المستوي الرابع'
  ];
  semesters=[
    'الفصل الاول',
    'الفصل الثاني'
  ];
  showLinks: boolean[] = [ // used to save boolean data for all semesters if it contains courses in this program or not
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];
  uniqueMajors;
  authorizedList;
  constructor(private service:MainService,
    private actRoute:ActivatedRoute,
    private sharingService:SharingDataService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
    private linkingService:LinkService
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
      this.programId = this.actRoute.snapshot.params.id.valueOf();    
      this.service.pathName = 'programs/'+this.programId;
    }

  ngOnInit(): void {
    if (!this.authorizedList['program.get-prerequisites'] &&
    !this.authorizedList['program.insert-prerequisites'] &&
    !this.authorizedList['programs.delete-prepackages'] &&
    !this.authorizedList['packages.index'] &&
    !this.authorizedList['packages.show'] &&
    !this.authorizedList['packages.store']&&
    !this.authorizedList['packages.update']&&
      !this.authorizedList['packages.destroy']&&
      !this.authorizedList['program.students']&&
      !this.authorizedList['program.packages']&&
      !this.authorizedList['programs.store']&&
      !this.authorizedList['programs.update']&&
      !this.authorizedList['programs.show']&&
      !this.authorizedList['programs.destroy']&&
      !this.authorizedList['programs.unlinkParent']&&
      !this.authorizedList['programs.linkParent']&&
      !this.authorizedList['programs.linkCourses'] && 
      !this.authorizedList['programs.create-packages'] &&
      !this.authorizedList['programs.delete-packages']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.show();
    }
  }
 //show fun used to redirct the service pathName to send the show request
 // then send the program packages data to show-packages-component
  async show(){
    this.data = await this.service.show();
    //console.log(this.data);
    if (this.data?.majors.length != 0) {
      this.uniqueMajors = this.filterMajors(this.data?.majors);
      //console.log(this.uniqueMajors);
    }
    if (this.data?.packages.length != 0){
      this.sharingService.setData(this.data.packages);
      this.showSemestersLinks();
    }
  }
  //filterMajor fun used to filter all majors coming from the database
  //by adding the first element in tmp array and take only the unique values in the original array  then return the unique array
  filterMajors(arr){
    var tmp = [arr[0]];
    for(var i = 1; i < arr.length; i++){
      var itemIndex= tmp.map(i => i.id).indexOf(arr[i].id);
      //console.log(itemIndex);
      if(itemIndex == -1){
        //console.log(tmp.indexOf(arr[i]));
        tmp.push(arr[i]);
      }
    }
    //console.log(tmp);
    return tmp;
  }
  // showSemestersLinks fun used to fill showLinks array with 8 values
  // each index represent a semester and its value decide if the semester link will be shown or not
  showSemestersLinks(){
    //let semesterNo:number = 1;
    //this.showLinks[0] = false;
    if(this.authorizedList['program.get-prerequisites'] &&
       this.authorizedList['program.insert-prerequisites'] &&
       this.authorizedList['programs.delete-prepackages'] &&
       this.authorizedList['packages.index'] &&
       this.authorizedList['packages.show']) {
    for (let index1 = 1; index1 <= 8; index1++) {
      for (let index = 0; index < this.data.packages.length; index++) { {
        if(this.data.packages[index].semester == index1){
          //console.log("if");
          this.showLinks[index1] = true;
          break;
        }
        // else if(this.data.packages[index].semester > index1){
        //   //console.log("else if");
        //   //this.showLinks[index1] = false;
        //   break;
        // }
      }
    }
  }
  }
  this.showLinks.shift();
  //console.log(this.showLinks);
  }
  async unlinkParent(){
    if (this.authorizedList['programs.unlinkParent']) {
      this.linkingService.pathName = 'programs/'+this.programId+'/parent/unlink';
      await this.linkingService.unLinkDelete();
      this.show();
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
  }
}
