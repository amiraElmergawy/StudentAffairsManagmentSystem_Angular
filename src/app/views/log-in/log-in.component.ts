import { Component, OnInit, HostListener } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
// import { MainService } from 'src/app/services/main-service';
import { LoginService } from 'src/app/services/auth-services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  logInForm: FormGroup;
  constructor(
    private service:LoginService
  ) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      'email': new FormControl(
        null, 
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[a-z A-Z]+(\_)[0-9]{7}@chp.com')
        ]
        ),
        'password': new FormControl(
          null, 
          [
            Validators.required,
            Validators.minLength(8)
          ])
  });
  // this.logInForm.valueChanges.subscribe(value =>
  //   console.log(this.logInForm)
  // );
  //this.logInForm.statusChanges.subscribe(status => console.log(status));
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event);

    if (event.keyCode == 13) {// enter key code
      if (this.logInForm.valid ) {
        this.logIn();
      }
    }
  }
  async logIn(){
    //this.service.pathName = 'auth/login';
    var logIn = {
      "email":this.logInForm.get('email').value,
      "password":this.logInForm.get('password').value
    }
    //console.log(logIn);
    await this.service.login(logIn);
  }

}
