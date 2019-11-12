import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PersonnalDetailsClass } from '../../models/PersonnalDetailsClass';
import { SettingsService } from '../../services/settings/settings.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  perDet: PersonnalDetailsClass=new PersonnalDetailsClass();
  oldPass: string='';
  newPass: string='';
  newPass2: string='';
  hide:boolean=true;
  hideo:boolean=true;

  constructor(private router: Router, private settings: SettingsService,private snackBar: MatSnackBar,private datapipe: DatePipe) {
    this.settings.getPersonnalDetails().subscribe((data: HttpResponse<PersonnalDetailsClass>)=>{
      if(data.status==200){
        this.perDet=data.body;
      }
    },(err)=>{console.log(err);});
   }

  ngOnInit() {
  }

  backToDashboard() {
    this.router.navigateByUrl('/home');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'cancel', {
      duration: 1 * 1000
    });
  }

  savePersonnalDetails() {
    this.perDet.dob=this.datapipe.transform(this.perDet.dob,'yyyy-MM-dd');
    this.settings.setPersonnalDetails(this.perDet).subscribe((data: HttpResponse<string>)=>{
      if(data.status==200 && data.body.toString()=='Success'){
        this.openSnackBar('Personnal Details are updated successfully');
      } else {
        this.openSnackBar('Error while updating personnal details');
      }
    },(err)=>{console.log(err);});
  }

  changePassword(hide: boolean) {
      if(this.oldPass.length==0 || this.newPass.length==0) {
        this.openSnackBar('Old password and new password should not be empty');
        return;
      } if (hide==true && this.newPass!=this.newPass2) {
        this.openSnackBar('New passwords are incorrect');
        return;
      }
      this.settings.setNewPassword(this.oldPass,this.newPass).subscribe((data: HttpResponse<string>)=>{
        if(data.status==200 && data.body.toString()=='Success'){
          this.openSnackBar('Password updated successfully');
        } else {
          this.openSnackBar('Error while updating the password');
        }
      },(err)=>{console.log(err);});
  }

}
