import { MenusJson } from './../models/menus-json';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFormService } from './../services/login/login-form.service';
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sdlc',
  templateUrl: './sdlc.component.html',
  styleUrls: ['./sdlc.component.css']
})
export class SdlcComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  screenname: string='Personal Tasks';
  resp: HttpErrorResponse;

  menus=new MenusJson();
  fillerNav: string[]=[];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private loginapiservice: LoginFormService,private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.fillerNav=this.menus.getMenus(localStorage.getItem('role'));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  setChildScreen(data: string): void {
    this.screenname=data;
  }

  signOutSdlc() {
    this.loginapiservice.signOut().subscribe(()=>{ },
    (err)=>{console.log(err);
            this.signOutOperation();})
  }

  signOutOperation() {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigateByUrl('/loginpage?logout');
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }

}
