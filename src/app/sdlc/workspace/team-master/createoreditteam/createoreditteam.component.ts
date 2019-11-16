import { HttpResponse } from '@angular/common/http';
import { TeamMaster } from './../../../../models/team-master';
import { TeammasterService } from './../../../../services/team-master/teammaster.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamDialogInterface } from '../../../../models/TeamDialogInterface';
import { StatusClass } from '../../../../models/util/statusClass';

@Component({
  selector: 'app-createoreditteam',
  templateUrl: './createoreditteam.component.html',
  styleUrls: ['./createoreditteam.component.css']
})
export class CreateoreditteamComponent implements OnInit {

  teamState: StatusClass[]=[{ status: 'A', statusName: 'Active'},{ status: 'D', statusName: 'Desolved'},{ status: 'I', statusName: 'Removed'}];
  teamDet: TeamMaster=new TeamMaster();
  type: boolean=true;
  edit: boolean=true;

  constructor(public dialogRef: MatDialogRef<CreateoreditteamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamDialogInterface,private snackBar: MatSnackBar,private teamApi: TeammasterService) {
      this.teamDet=data.team;
      this.type=data.type;
     }

  ngOnInit() {
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

  saveButton(){
    if(this.teamDet.teamName.length==0){
      this.openSnackBar('Please enter team name');
    } if (this.teamDet.teamShortName.length==0){
      this.openSnackBar('Please enter the team short name');
    }
    if(this.type){
      this.updateTeam();
    } else {
      this.createTeam();
    }
  }

  createTeam() {
    this.teamApi.createNewTeam(this.teamDet).subscribe((data: HttpResponse<string>)=>{
      if(data.status==200 && data.body.toString()=='Success'){
        this.openSnackBar('Team created successfully');
        this.onClose();
      } if(data.body.toString()=='Failure'){
        this.openSnackBar('Error while creating team');
      } else {
        this.openSnackBar(data.body.toString());
      }
    },(err)=>{console.log(err);});
  }

  updateTeam() {
    this.teamApi.updateTeam(this.teamDet).subscribe((data: HttpResponse<string>)=>{
      if(data.status==200 && data.body.toString()=='Success'){
        this.openSnackBar('Team updated successfully');
        this.onClose();
      } if(data.body.toString()=='Failure'){
        this.openSnackBar('Error while updating team');
      } else {
        this.openSnackBar(data.body.toString());
      }
    },(err)=>{console.log(err);});
  }
}
