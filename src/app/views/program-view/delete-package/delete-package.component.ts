import { Component, OnInit, NgZone } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { SpecialServices } from 'src/app/services/special-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { LocalStorageService } from 'ngx-webstorage';
// import { PrePackage } from 'src/app/classes/dbClasses/program/prepackage';

@Component({
  selector: 'app-delete-package',
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.scss']
})
export class DeletePackageComponent implements OnInit {
  data;
  programId:number;
  authorizedList;
  constructor(
    private dataService:MainService,
    private deleteService:SpecialServices,
    private actRoute:ActivatedRoute,
    private sharingService:SharingDataService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
    private ngZone: NgZone) {
      this.authorizedList = this.storage.retrieve('backNamesList');
      this.programId = this.actRoute.snapshot.params.id.valueOf();
    }

  ngOnInit(): void {
    if (!this.authorizedList['packages.destroy'] &&
    !this.authorizedList['packages.update'] &&
    !this.authorizedList['packages.index'] &&
    !this.authorizedList['packages.show']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.getProgram();
    this.data?.subscribe(
      () => //console.log('success'),
      (error) => //console.log('error', error),
      () => {
        this.ngZone.run( () => {});
        }
      );
    }
  }
  
  async getProgram(){
    this.dataService.pathName = "programs/"+this.programId;
    this.data = await this.dataService.show();
    //console.table(this.data);
    this.sharingService.setData(this.data.packages);
  }
  async delete(packageId:number){
    if (this.authorizedList['packages.destroy']) {  
      //console.log(packageId);
      this.deleteService.pathName = "programs/packages";
      var format = {
        "ids": [
          packageId
        ]
      }
      //console.log(format);
      await this.deleteService.deleteProgramPackage(format);
    } else {
      this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
    }
    }
    async deleteAll(){
      if (this.authorizedList['packages.destroy']) {
      //console.log(packageId);
      this.deleteService.pathName = "programs/packages";
      let allIds = [0];
      this.data?.packages .forEach(element => {
        allIds.push(element.id);
      });
      allIds.shift();
      //console.log(allIds);
      var format = {
        "ids": allIds
      }
      //console.log(format);
    await this.deleteService.deleteProgramPackage(format);
  } else {
    this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
  }
    }  
}
