import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main-service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-show-all-available-trainnings',
  templateUrl: './show-all-available-trainnings.component.html',
  styleUrls: ['./show-all-available-trainnings.component.scss']
})
export class ShowAllAvailableTrainningsComponent implements OnInit {

  allAvailableTrainnings;
  authorizedList;
  constructor(
    private service: MainService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
  }

  ngOnInit(): void {
    if (!this.authorizedList['training.index']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getTraining();
    }
  }

  //getTraining func. used to get all avilable training for student to choose from
  async getTraining() {
    this.service.pathName = 'training';
    this.allAvailableTrainnings = await this.service.index();
    if (this.allAvailableTrainnings || this.allAvailableTrainnings.length > 0) {
      this.flashMessage.show('لا يوجد تدريبات للعرض', { cssClass: 'flash_danger', timeout: 5000 })
      //this.router.navigate(['/no-page-found/']);
    }
  }

}
