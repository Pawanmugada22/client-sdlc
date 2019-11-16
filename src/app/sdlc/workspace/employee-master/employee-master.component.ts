import { TeammasterService } from './../../../services/team-master/teammaster.service';
import { HttpResponse } from '@angular/common/http';
import { TeamMaster } from './../../../models/team-master';
import { Component, OnInit } from '@angular/core';
import { PersonnalDetailsClass } from '../../../models/PersonnalDetailsClass';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateoreditemployeeComponent } from './createoreditemployee/createoreditemployee.component';
import { RoleMaster } from '../../../models/RoleMaster';
import { EmployeemasterService } from '../../../services/employee-master/employeemaster.service';


@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})

export class EmployeeMasterComponent implements OnInit {

  empMast: PersonnalDetailsClass = new PersonnalDetailsClass();
  searchMast: PersonnalDetailsClass = new PersonnalDetailsClass();

  displayedColumns: string[] = ['empId', 'firstName', 'teamCode', 'status', 'edit'];
  roleList: RoleMaster[] = new Array();
  teamList: TeamMaster[] = new Array();
  empList: PersonnalDetailsClass[] = new Array();
  tableDisp: boolean = false;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private empApi: EmployeemasterService, private teamApi: TeammasterService) {
    this.empApi.getRoleList().subscribe((data: HttpResponse<RoleMaster[]>) => {
      if (data.status == 200) {
        this.roleList = data.body;
        console.log(data.body);
      } else {
        this.openSnackBar('Error getting role list');
      }
    },(err)=>{console.log(err)});
    this.teamApi.getAllTeams().subscribe((data: HttpResponse<TeamMaster[]>) => {
      if (data.status == 200) {
        this.teamList = data.body;
      } else {
        this.openSnackBar('Error getting team list');
      }
    },(err)=>{console.log(err)});
    this.searchMast.empId = null;
    this.searchMast.firstName = '';
    this.searchMast.roleCode = '';
    this.searchMast.teamCode = null;
  }


  ngOnInit() {
  }

  openSnackBar(resp: string) {
    this.snackBar.open(resp, 'cancel', {
      duration: 3 * 1000
    });
  }

  searchEmployee() {
    this.empList = [];
    if (this.searchMast.empId == null) {
      this.searchMast.empId = 0;
    } if (this.searchMast.teamCode == null) {
      this.searchMast.teamCode = 0;
    }
    this.empApi.getEmployeeList(this.searchMast).subscribe((data: HttpResponse<PersonnalDetailsClass[]>) => {
      if (data.status == 200) {
        this.empList = data.body;
        if(this.empList.length == 0){
          this.openSnackBar('Search not found');
          this.tableDisp = false;
        } else {
          this.tableDisp = true;
        }
      } else {
        this.openSnackBar('Error while fetching employee details');
        this.tableDisp = false;
      }
    },(err)=>{console.log(err)});
  }

  updateEmployee(employee: PersonnalDetailsClass) {
    employee.resetPass = false;
    const dialogref = this.dialog.open(CreateoreditemployeeComponent, {
      width: '700px',
      height: 'auto',
      maxHeight: '75%',
      data: { empMast: employee, roleList: this.roleList, teamList: this.teamList, type: true }
    });
  }
  createEmployee() {
    this.empMast.resetPass = true;
    this.empMast.status = 'A';
    const dialogref = this.dialog.open(CreateoreditemployeeComponent, {
      width: '700px',
      height: 'auto',
      maxHeight: '75%',
      data: { empMast: this.empMast, roleList: this.roleList, teamList: this.teamList, type: false }
    });
  }

  getStatus(status: string): string {
    switch (status) {
      case 'A': {
        return 'Active';
      }
      case 'U': {
        return 'Long Leave';
      }
      case 'I': {
        return 'Relieved';
      }
      default: {
        return 'Undefined';
      }
    }
  }

  getTeamName(teamcode: number): string {
    if(teamcode==null){
      return 'Bench';
    }
    for(let team of this.teamList){
      if(team.teamCode==teamcode){
        return team.teamName;
      }
    }
    return 'Invalid Team';
  }
}
