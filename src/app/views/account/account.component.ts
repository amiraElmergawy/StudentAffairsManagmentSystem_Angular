import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth-services/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  changePassForm: FormGroup;
  constructor(
    private service:LoginService
  ) { }

  ngOnInit(): void {
    this.changePassForm = new FormGroup({
      'oldPassword': new FormControl(
        null, 
        [
          Validators.required,
          Validators.minLength(8)
        ]
        ),
        'password': new FormControl(
          null, 
          [
            Validators.required,
            Validators.minLength(8)
          ])
  });
  // this.changePassForm.valueChanges.subscribe(value =>
  //   //console.log(this.changePassForm)
  // );
  //this.changePassForm.statusChanges.subscribe(status => console.log(status));
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event);

    if (event.keyCode == 13) {// enter key code
      if (this.changePassForm.valid ) {
        this.changPass();
      }
    }
  }
  async changPass(){
    var format = {
      "oldPassword": this.changePassForm.get('oldPassword').value,
      "password": this.changePassForm.get('password').value
    }
    await this.service.resetPassword(format);
  }

}
