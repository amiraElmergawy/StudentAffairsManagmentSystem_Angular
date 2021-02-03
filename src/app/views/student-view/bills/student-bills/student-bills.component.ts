import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-student-bills',
  templateUrl: './student-bills.component.html',
  styleUrls: ['./student-bills.component.scss']
})
export class StudentBillsComponent implements OnInit {

  studentId:number;
  bills;
  authorizedList;
  constructor(
    private service:MainService,
    private actRoute:ActivatedRoute,
    private router : Router,
    private flashMessage:FlashMessagesService,
    private sharingService:SharingDataService,
    private storage: LocalStorageService,
    ) {
      this.authorizedList = this.storage.retrieve('backNamesList');
      this.studentId = this.actRoute.snapshot.params.id.valueOf();
   }

  ngOnInit(): void {
    if (!this.authorizedList['student.bills'] &&
    !this.authorizedList['student.update_bill'] &&
    !this.authorizedList['student.delete_bill'] &&
    !this.authorizedList['student.add_bill']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.index();
    }
  }

  async index(){
    this.service.pathName = 'students/'+this.studentId+'/bill';
    this.bills = await this.service.index();
    //console.log(this.bills);
    if (!this.bills || this.bills.length == 0) {
      //this.router.navigate(['/no-page-found/']);
      this.flashMessage.show('لا توجد بيانات للعرض',{cssClass:'flash_danger', timeout:5000});
    }
  }

  onUpdate(bill){
    if (this.authorizedList['student.update_bill'] ||
    this.authorizedList['student.delete_bill']) {
      this.sharingService.setData(bill);
      this.router.navigate(['/update-bill-for-student/'+ this.studentId+'/'+bill.id]);  
    }
  }

}
