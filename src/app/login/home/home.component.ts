import { LoginFormService } from './../../services/login/login-form.service';
import { Component, OnInit } from '@angular/core';
import { LocalSessionKeys } from '../../models/local-session-keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionkeys: LocalSessionKeys;

  constructor(loginapiservice: LoginFormService,private router: Router) { 
    loginapiservice.getLocalKeys().subscribe((temp:LocalSessionKeys)=>{
      this.sessionkeys=temp;
      this.viewResponseData(this.sessionkeys);
},(err)=>{console.log(err);});
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
