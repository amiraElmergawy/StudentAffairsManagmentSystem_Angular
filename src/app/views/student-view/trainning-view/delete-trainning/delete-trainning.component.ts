import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialServices } from 'src/app/services/special-services.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-delete-trainning',
  templateUrl: './delete-trainning.component.html',
  styleUrls: ['./delete-trainning.component.scss']
})
export class DeleteTrainningComponent implements OnInit {

  studentId:number;
  authorizedList;
  currentTrainings = null;
  constructor(
    private service:SpecialServices,
    private dataService : MainService,
    private actRoute:ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.studentId = this.actRoute.snapshot.params.id.valueOf();
  }

  ngOnInit(): void {
    if (!this.authorizedList['student.delete-training'] &&
    !this.authorizedList['student.trainings']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else{
      this.getStudentTrainings();
    }
  }
  async getStudentTrainings(){
    this.dataService.pathName = 'students/'+this.studentId+'/trainings';
    this.currentTrainings = await this.dataService.show();
    //console.log(this.currentTrainings);
  }
  
  //delete fun take the trainnings ids to delete them
  async delete(id:number){
    if (this.authorizedList['student.trainings']) { 
      this.service.pathName = 'students/'+this.studentId+'/delete-training';
      var format = {
        "ids": [id]
      }
      await this.service.deleteWithParams(format);
      this.getStudentTrainings();
    }
  }

}
