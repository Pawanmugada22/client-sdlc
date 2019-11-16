import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TeamMaster } from '../../../models/team-master';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeammasterService } from '../../../services/team-master/teammaster.service';
import { CreateoreditteamComponent } from './createoreditteam/createoreditteam.component';

@Component({
  selector: 'app-team-master',
  templateUrl: './team-master.component.html',
  styleUrls: ['./team-master.component.css']
})
export class TeamMasterComponent implements OnInit {

  displayedColumns: string[] = ['teamCode', 'teamName', 'teamShortName', 'status', 'edit'];
  teamList: TeamMaster[] = new Array();
  tableDisp: boolean = false;
  searchDet: TeamMaster = new TeamMaster();
  teamDet: TeamMaster = new TeamMaster();

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private teamApi: TeammasterService) {
    this.teamDet.teamCode = null;
    this.teamDet.teamName = '';
    this.teamDet.teamShortName = '';
  }

  ngOnInit() {
  }

  openSnackBar(resp: string) {
    this.snackBar.open(resp, 'cancel', {
      duration: 3 * 1000
    });
  }

  searchTeam() {
    this.teamList = [];
    if (this.searchDet.teamCode == null) {
      this.searchDet.teamCode = 0;
    } if (this.searchDet.teamName == null) {
      this.searchDet.teamName='';
    } if (this.searchDet.teamShortName== null){
      this.searchDet.teamShortName='';
    }
    this.teamApi.getTeamList(this.teamDet).subscribe((data: HttpResponse<TeamMaster[]>)=>{
      if(data.status==200){
        this.teamList=data.body;
        if(this.teamList.length==0){
          this.openSnackBar('Search not found');
          this.tableDisp=false;
        } else {
          this.tableDisp=true;
        }
      } else {
        this.openSnackBar('Error while fetching team details');
        this.tableDisp=false;
      }
    },(err)=>{console.log(err);});
  }

  updateTeam(team: TeamMaster) {
    const dialogref = this.dialog.open(CreateoreditteamComponent, {
      width: '700px',
      height: 'auto',
      maxHeight: '75%',
      data: { team: team, type: true }
    });
  }

  createTeam() {
    this.teamDet.status = 'A';
    this.teamDet.teamName = '';
    this.teamDet.teamShortName = '';
    this.teamDet.remarks = '';
    const dialogref = this.dialog.open(CreateoreditteamComponent, {
      width: '700px',
      height: 'auto',
      maxHeight: '75%',
      data: { team: this.teamDet, type: false }
    });
  }

  getStatus(status: string): string {
    switch (status) {
      case 'A': {
        return 'Active';
      }
      case 'D': {
        return 'Desolved';
      }
      case 'I': {
        return 'Removed';
      }
    }
  }

}
