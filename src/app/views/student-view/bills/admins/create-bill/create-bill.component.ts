import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {
  
  studentId:number;
  billForm:FormGroup;
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
  /**
   *  if (value == 1) {
      return "فصل الخريف";
    } else if (value == 2) {
      return "فصل الربيع";
    } else { // == 3
      return "الفصل الصيفي";
    }{
    "billNumber": "21313",
    "paymentDate": 545,
    "billTotal": 150.55,
    "billData": "Heloo",
    "academicYear": "2019-2001",
    "relativeSemester": 2,
    "paymentType": 2,
    "id": 7
} 
1=> collage/university expences
2=> summer courses
3=> faild retaken courses
4=> special program
*/
authorizedList;
  constructor(
    private service:MainService,
    private actRoute:ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = this.actRoute.snapshot.params.id.valueOf();
  }

  ngOnInit(): void {
    if (!this.authorizedList['student.add_bill']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
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
    }
  }

  //create used to submit the enterd data and send it to server with its service pathName and create func.
  async create(){
    if (this.authorizedList['student.add_bill']) {
      this.service.pathName = 'students/'+this.studentId+'/bill/';
    var format = {
      "billNumber": this.billForm.get('billNumber').value,
      // "paymentDate": this.billForm.get('paymentDate').value,
      "billTotal": this.billForm.get('billTotal').value,
      "billData": this.billForm.get('billData').value,
      "academicYear": this.billForm.get('academicYear').value,
      "relativeSemester": this.billForm.get('relativeSemester').value,
      "paymentType": this.billForm.get('paymentType').value,
      "id": null
  };
    await this.service.create(format);
  } else {
    this.flashMessage.show("غير مصرح القيام بهذه العمليه", { cssClass: 'flash_danger' });
  }
  }
  //clear fun to reset all the form data
  clear(){
    this.billForm.reset();
  }

}
