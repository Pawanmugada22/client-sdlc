import {Component, Input, NgModule, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginerrormsg:String='';
  username:String='';
  password:String='';

  constructor() {

  }

  ngOnInit() {
  }
  public onSubmit(): void {
    if (this.username=='' || this.password=='') {
        this.loginerrormsg='Username and Password should not be empty';
        console.log(this.username);
        console.log(this.password);
        console.log(this.loginerrormsg);
        return;
    } if ((this.username.length) >10) {
        this.loginerrormsg='Username length should be less than 10 characters';
        console.log(this.username);
        console.log(this.password);
        console.log(this.loginerrormsg);
        return;
    } else {
        this.loginerrormsg='Username or Password is incorrect';
        console.log(this.username);
        console.log(this.password);
        console.log(this.loginerrormsg);
    }
  }

}
