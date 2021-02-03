import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-update-bill',
  templateUrl: './update-bill.component.html',
  styleUrls: ['./update-bill.component.scss']
})
export class UpdateBillComponent implements OnInit {
  studentId:number;
  billForm:FormGroup;
  billId:number;
  currentData;
semesters = [
  "فصل الخريف",
  "فصل الربيع",
  "الفصل الصيفي"
];
paymentTypes = [
  "مصاريف الكلية",
  "مصاريف الفصل الصيفي",
  "مصاريف اعادة المقررات",
  "مصاريف قسم خاص",
];
authorizedList;
  constructor(
    private service:MainService,
    private actRoute:ActivatedRoute,
    private sharingService:SharingDataService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList'); 
    //this.studentId = this.actRoute.snapshot.params.id.valueOf();
  }

  ngOnInit(): void {
    if (!this.authorizedList['student.delete_bill'] &&
    !this.authorizedList['student.update_bill']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
    this.actRoute.params.subscribe(params=>{
      //console.log(params);
      this.studentId = +params.studentId;
      this.billId = +params.billId;
  });
    this.billForm = new FormGroup({
      'billNumber': new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]),
      // 'paymentDate': new FormControl(null, [
      //   Validators.required,
      // ]),
      'billTotal': new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9]+)?')
      ]),
      'billData': new FormControl(null, [
        Validators.required,
      ]),
      'academicYear': new FormControl(null, [
        Validators.required,
        Validators.pattern('20[0-9]{2}\/20[0-9]{2}')
      ]),
      'relativeSemester': new FormControl(null, [
        Validators.required,
      ]),
      'paymentType': new FormControl(null, [
        Validators.required,
      ]),
    });
    //  this.billForm.valueChanges.subscribe(
    //    (value) => console.log(this.billForm)
    //  );
    // this.billForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );
    this.initForm();
    }
  }
  async initForm(){
    this.currentData = this.sharingService.getData();
    //console.log(this.currentData);
    if (this.currentData) {
      this.billForm.setValue({
       'billNumber': this.currentData?.bill_number,
       'billTotal': this.currentData?.bill_total,
       'billData':this.currentData?.bill_data,
       'academicYear':this.currentData?.academic_year,
       'relativeSemester':+this.currentData?.relative_semester,
       //'majorId': this.currentData?.major?.id,
       'paymentType':+this.currentData?.payment_type,
     });
    }
  }

  //update used to submit the enterd data and send it to server with its service pathName and create func.
  async update(){
    if (this.authorizedList['student.update_bill']) {
      this.service.pathName = 'students/'+this.studentId+'/bill/';
    var format = {
      "billNumber": this.billForm.get('billNumber').value,
      // "paymentDate": this.billForm.get('paymentDate').value,
      "billTotal": this.billForm.get('billTotal').value,
      "billData": this.billForm.get('billData').value,
      "academicYear": this.billForm.get('academicYear').value,
      "relativeSemester": this.billForm.get('relativeSemester').value,
      "paymentType": this.billForm.get('paymentType').value,
      "id": this.billId
  };
    await this.service.update(format);
  } else {
    this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
  }
  }
  // delete function to delete the bill by its id
  async delete(){
    if (this.authorizedList['student.delete_bill']) {
      this.service.pathName ='students/bill/'+ this.billId;
    await this.service.delete();
  } else {
    this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
  }
  }
  //clear fun to reset all the form data
  clear(){
    if (this.currentData) {
      this.billForm.setValue({
       'billNumber': this.currentData?.bill_number,
       'billTotal': this.currentData?.bill_total,
       'billData':this.currentData?.bill_data,
       'academicYear':+this.currentData?.academic_year,
       'relativeSemester':+this.currentData?.relative_semester,
       //'majorId': this.currentData?.major?.id,
       'paymentType':+this.currentData?.payment_type,
     });
    }
    else
    this.billForm.reset();
  }

}
