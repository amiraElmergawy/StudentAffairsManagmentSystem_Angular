import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SAMS';
  homeFlag:boolean = false;
  loginFlag:boolean = false;
  loadingFireFlag;
  authorizedList;
  constructor(private router: Router,
    private storage:LocalStorageService){    
      this.authorizedList = this.storage.retrieve('userPermissions');
      this.storage.store('loadingFireFlag',false);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.router.events.subscribe((value) => {
    //   if (this.router.url == '/home') {
    //     this.homeFlag = true;
    //   } else if (this.router.url == '/login') {
    //     this.loginFlag = true;
    //   }else {
    //     this.homeFlag = false;
    //     this.loginFlag = false;
    //   }
    // });
    this.storage.observe('loadingFireFlag').subscribe((value)=>{
      setTimeout(()=>{this.loadingFireFlag=value});
    });

  }
}
