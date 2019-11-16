import { HttpResponse } from '@angular/common/http';
import { PersonnalDetailsClass } from './../../../../models/PersonnalDetailsClass';
import { Employeemasterinterface } from './../../../../models/employeemasterinterface';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerTaskCreateService } from '../../../../services/per-task/per-task-create.service';
import { EmployeemasterService } from '../../../../services/employee-master/employeemaster.service';
import { RoleMaster } from '../../../../models/RoleMaster';
import { TeamMaster } from '../../../../models/team-master';
import { StatusClass } from '../../../../models/util/statusClass';

@Component({
  selector: 'app-createoreditemployee',
  templateUrl: './createoreditemployee.component.html',
  styleUrls: ['./createoreditemployee.component.css']
})
export class CreateoreditemployeeComponent{

  empState: StatusClass[]=[{ status: 'A', statusName: 'Active'},{ status: 'U', statusName: 'Long Leave'},{ status: 'I', statusName: 'Relieved'}];
  perDet: PersonnalDetailsClass=new PersonnalDetailsClass();
  roleList: RoleMaster[]=new Array();
  teamList: TeamMaster[]=new Array();
  type: boolean=true;
  edit: boolean=true;

  constructor(public dialogRef: MatDialogRef<CreateoreditemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employeemasterinterface,private snackBar: MatSnackBar,private empApi: EmployeemasterService) { 
        this.perDet=data.empMast;
        this.roleList=data.roleList;
        this.teamList=data.teamList;
        this.type=data.type;
    }
  onEdit(){
    this.edit=(!this.edit);
  }

  onClose() {
    this.dialogRef.close();
  }

  openSnackBar(resp: string) {
    this.snackBar.open(resp,'cancel',{
      duration: 1 * 1000
    });
  }

  saveButton() {
    if(this.perDet.joiningDate.length==0){
      this.openSnackBar('Please enter date of joining');
    } if (this.perDet.resetPass && this.type && (this.perDet.newPassword.length==0)){
      this.openSnackBar('Please enter new password');
    } if (this.perDet.resetPass && !this.type && (this.perDet.newPassword.length==0 || this.perDet.userName.length==0)){
      this.openSnackBar('Please enter new username and password');
    }
    if(this.type){
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  createEmployee() {
    this.empApi.createNewEmployee(this.perDet).subscribe((data: HttpResponse<string>)=>{
      if(data.status==200 && data.body.toString()=='Success') {
        this.openSnackBar('Employee created successfully');
        this.onClose();
      } if (data.body.toString()=='Failure') {
        this.openSnackBar('Error while creating new employee');
      } else {
        this.openSnackBar(data.body.toString());
      }
    },(err)=>{console.log(err);});
  }

  updateEmployee() {
    this.empApi.updateEmployee(this.perDet).subscribe((data: HttpResponse<string>)=>{
      if(data.status==200 && data.body.toString()=='Success') {
        this.openSnackBar('Employee updated successfully');
        this.onClose();
      } if (data.body.toString()=='Failure') {
        this.openSnackBar('Error while updating employee');
      } else {
        this.openSnackBar(data.body.toString());
      }
    },(err)=>{console.log(err);});
  }

}
