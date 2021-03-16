import { Component, OnInit } from '@angular/core';
// import { SharingDataService } from 'src/app/services/sharing-data.service';
import { MainService } from 'src/app/services/main-service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LinkService } from 'src/app/services/link.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-program-link-parent',
  templateUrl: './program-link-parent.component.html',
  styleUrls: ['./program-link-parent.component.scss']
})
export class ProgramLinkParentComponent implements OnInit {

  parentId:number = null;
  data;// dept of program id
  programs;
  programId:number;
  authorizedList;
  constructor(
    // private sharingService:SharingDataService,
    private dataService:MainService,
    private linkServicve:LinkService,
    private flashMessage:FlashMessagesService,
    private actRoute:ActivatedRoute,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');

    this.programId = this.actRoute.snapshot.params.id;
    //console.log(this.programId);
   }

  ngOnInit(): void {
    if (!this.authorizedList['programs.linkParent']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    // this.data = this.sharingService.getData();
    this.flashMessage.show("تحذير قد تكون نتائج هذه العملية غير متوقعة",  { cssClass: 'flash_danger' })
    this.getPrograms();
    }
  }

  //getPrograms used to get all possible programs to be link as parent with the current created or updated program
  async getPrograms(){
    this.dataService.pathName = 'programs/'+this.programId;
    this.data = await this.dataService.show();
    //console.log(this.data);
    if (this.data) {
      this.dataService.pathName = 'departments/' + this.data.department.id;
      var departmentData = null;
      departmentData = await this.dataService.show();
      //console.log(departmentData);
      if (departmentData) {
        this.programs = departmentData.programs;
        //console.log(this.programs);
        if (!this.programs && this.programs?.length <= 0) {
          //this.router.navigate(['/no-page-found/']);
          this.flashMessage.show('لا يوجد برامج متاحة للربط', { cssClass: 'flash_danger', timeout: 5000 });
        }
      }
    }
  }

  //link used to link the selected program as a parent of the current program
  async link(){
     if(this.parentId){
       if (this.parentId == this.programId) {
         this.flashMessage.show('لا يسمح بربط البرنامج بنفسه', {cssClass:'flash_danger', timeout:5000});
       } else {
         this.linkServicve.pathName = 'programs/'+this.programId+'/parent/link';
         var format = {
           "parentId" : this.parentId
         };
         //console.log(this.parentId);
         await this.linkServicve.link(format);   
       }
     }
  }
}
