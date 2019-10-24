import { HttpErrorResponse } from '@angular/common/http';
import { LoginFormService } from './../services/login/login-form.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginerrormsg:string='';
  username:string='';
  password:string='';
  statuscolor:boolean=false;
  loginapi:boolean;
  resphead:HttpErrorResponse;

  constructor(private activatedroute:ActivatedRoute,private router: Router,private loginapiservice: LoginFormService) {
    this.activatedroute.queryParams.subscribe(
      (params: Params) => {
          if (params.hasOwnProperty('error')) { this.loginerrormsg='Username or Password is incorrect';
            this.statuscolor=false; }
          if (params.hasOwnProperty('sessioninvalid')) { this.loginerrormsg='User session invalidated';
            this.statuscolor=false; }
          if (params.hasOwnProperty('logout')) { this.loginerrormsg='You have been logged out successfully';
            this.statuscolor=true; }
          if (params.hasOwnProperty('success')) { this.loginerrormsg='Logged in successfully';
            this.statuscolor=true;
            setTimeout(()=>{ this.router.navigateByUrl('/staging'); },1000); }
      }
  );
  }

  ngOnInit() {}

  public onSubmit(): void {
    if (this.username=='' || this.password=='') {
        this.loginerrormsg='Username and Password should not be empty';
        this.statuscolor=false;
        return;
    } if ((this.username.length) >10) {
        this.loginerrormsg='Username length should be less than 10 characters';
        this.statuscolor=false;
        return;
    } else {
        this.loginapiservice.submitForm(this.username,this.password)
            .subscribe(( )=>{ },(err)=>{console.log(err);
              this.resphead=err;
              console.log(this.resphead.url);
              this.redirectUrl(this.resphead.url)
            });
        return;
  }

}
  public redirectUrl(url : string): void {
    if (url==null || url==undefined ){
      this.router.navigateByUrl('/loginpage');
    } if (url.endsWith('?error')) {
      this.router.navigateByUrl('/loginpage?error');
    } if (url.endsWith('?success')) {
      this.router.navigateByUrl('/loginpage?success');
    }
  }

}
