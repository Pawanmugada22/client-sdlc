import { LoginFormService } from './../../services/login/login-form.service';
import { Component, OnInit } from '@angular/core';
import { LocalSessionKeys } from '../../models/local-session-keys';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionkeys: LocalSessionKeys;
  resphead:HttpErrorResponse;

  constructor(loginapiservice: LoginFormService,private router: Router) { 
    loginapiservice.getLocalKeys().subscribe((temp:LocalSessionKeys)=>{
      this.sessionkeys=temp;
      this.viewResponseData(this.sessionkeys);
},(err)=>{console.log(err);
          this.resphead=err;
          if(this.resphead.status!=200){this.router.navigateByUrl('/loginpage?sessioninvalid');}});
   }

   viewResponseData(temp: LocalSessionKeys){
    localStorage.removeItem('user');
    localStorage.setItem('user',temp.username);
    localStorage.removeItem('role');
    localStorage.setItem('role',temp.role);
    if(temp.isauthorized) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/loginpage?sessioninvalid');
    }
}
  ngOnInit() {
  }

}
