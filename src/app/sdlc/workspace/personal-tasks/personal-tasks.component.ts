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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  pertask: PerTaskClass=new PerTaskClass();

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

}
