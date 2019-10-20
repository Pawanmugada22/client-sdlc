import {Component, Input, NgModule, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginerrormsg:String='';
  username:String='';
  password:String='';
  statuscolor:Boolean=false;

  constructor(private activatedroute:ActivatedRoute) {
    this.activatedroute.queryParams.subscribe(
      (params: Params) => {
          if (params.hasOwnProperty('error')) { this.loginerrormsg='Username or Password is incorrect';
            this.statuscolor=false; }
          if (params.hasOwnProperty('logout')) { this.loginerrormsg='You have been logged out successfully';
            this.statuscolor=true; }
      }
  );
  }

  ngOnInit() {
  }
  public onSubmit(): void {
    if (this.username=='' || this.password=='') {
        this.loginerrormsg='Username and Password should not be empty';
        this.statuscolor=false;
        console.log(this.username);
        console.log(this.password);
        console.log(this.loginerrormsg);
        return;
    } if ((this.username.length) >10) {
        this.loginerrormsg='Username length should be less than 10 characters';
        this.statuscolor=false;
        console.log(this.username);
        console.log(this.password);
        console.log(this.loginerrormsg);
        return;
    } else {
        this.loginerrormsg='Username or Password is incorrect';
        this.statuscolor=false;
        console.log(this.username);
        console.log(this.password);
        console.log(this.loginerrormsg);
    }
  }

}
