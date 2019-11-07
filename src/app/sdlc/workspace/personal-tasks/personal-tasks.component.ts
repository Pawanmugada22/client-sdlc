import { PerTaskDialog } from './../../../models/per-task-dialog';
import { PerTask } from './../../../models/per-task';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPersonnalTaskComponent } from './new-personnal-task/new-personnal-task.component';
import { PerTaskClass } from '../../../models/per-task-class';

@Component({
  selector: 'app-personal-tasks',
  templateUrl: './personal-tasks.component.html',
  styleUrls: ['./personal-tasks.component.css']
})
export class PersonalTasksComponent implements OnInit {

  tasklist: number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  
  perTaskList: PerTaskClass[]=new Array();

  constructor(public dialog: MatDialog) {
    this.perTaskList=[]
    for(let num=1;num<23;num++) {
      this.task.taskCode=num;
      this.task.taskContext='C';
      this.task.taskDescription='task description';
      this.task.taskName='task name';
      this.task.taskRemarks='task remarks';
      this.task.taskStatus='P';
      this.task.taskSummary='task summary';
      this.perTaskList.push(this.task);
    }
   }

  ngOnInit() {
  }

  pertask: PerTaskClass=new PerTaskClass();
  task: PerTaskClass=new PerTaskClass();

  createTask(): void {
    this.pertask.taskCode=22;
    this.pertask.taskRemarks='NoRemarks';
    this.pertask.taskDescription='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    this.pertask.taskName='NoName';
    this.pertask.taskSummary='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const dialogref=this.dialog.open(NewPersonnalTaskComponent,{
      width : '500px',
      height : 'auto',
      maxHeight : '75%',
      data: { perTask: this.pertask, taskOp: false }
    });

  }

  getStatusList(status: string): string[] {
    var statusList: string[]=['P','I','B','C','D'];
    statusList.splice(statusList.indexOf(status,0),1);
    return statusList;
  }

  getStatusName(status: string): string {
    switch(status) {
      case 'C': {
        return 'Completed';
      }
      case 'P': {
        return 'Pending';
      }
      case 'I': {
        return 'In-Progress';
      }
      case 'D': {
        return 'Delete';
      }
      default : {
        return 'invalid';
      }
    }
  }

  getStatusDot(status: string): any {
    switch(status) {
      case 'C': {
        let dotStyle={
          backgroundColor: 'green'
        }
        return dotStyle;
      }
      case 'P': {
        let dotStyle={
          backgroundColor: 'red'
        }
        return dotStyle;
      }
      case 'I': {
        let dotStyle={
          backgroundColor: 'orange'
        }
        return dotStyle;
      }
      case 'D': {
        let dotStyle={
          backgroundColor: 'purple'
        }
        return dotStyle;
      }
      default : {
        let dotStyle={
          backgroundColor: 'brown'
        }
        return dotStyle;
      }
    }
  }

}
