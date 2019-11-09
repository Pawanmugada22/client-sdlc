import { PerTaskDialog } from './../../../models/per-task-dialog';
import { PerTask } from './../../../models/per-task';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPersonnalTaskComponent } from './new-personnal-task/new-personnal-task.component';
import { PerTaskClass } from '../../../models/per-task-class';
import { PerTaskCreateService } from '../../../services/per-task/per-task-create.service';
import { HttpResponse } from '@angular/common/http';
import { HttprespClass } from '../../../models/httpresp/httpresp-class';
import { PerTaskStatusUpdate } from '../../../models/PerTaskStatusUpdate';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-tasks',
  templateUrl: './personal-tasks.component.html',
  styleUrls: ['./personal-tasks.component.css']
})
export class PersonalTasksComponent implements OnInit {


  taskListInContext: PerTaskClass[] = new Array();
  taskListOutContext: PerTaskClass[] = new Array();
  updateStatus: PerTaskStatusUpdate = new PerTaskStatusUpdate();

  constructor(public dialog: MatDialog, private taskApi: PerTaskCreateService, private snackBar: MatSnackBar) {
    this.taskApi.getTaskList('C').subscribe((resp: HttpResponse<PerTask[]>) => {
      if (resp.status == 200) {
        this.taskListInContext = resp.body;
      }
    }, (err) => { console.log(err); });
    this.taskApi.getTaskList('N').subscribe((resp: HttpResponse<PerTask[]>) => {
      if (resp.status == 200) {
        this.taskListOutContext = resp.body;
      }
    }, (err) => { console.log(err); });
  }

  ngOnInit() {
  }

  pertasks: PerTaskClass = new PerTaskClass();
  selectedContext: string = 'C';

  createTask(): void {
    this.pertasks.taskRemarks = '';
    this.pertasks.taskDescription = '';
    this.pertasks.taskName = '';
    this.pertasks.taskSummary = '';
    this.pertasks.taskStatus = 'P';
    this.pertasks.taskContext='C';
    const dialogref = this.dialog.open(NewPersonnalTaskComponent, {
      width: '500px',
      height: 'auto',
      maxHeight: '75%',
      data: { perTask: this.pertasks, taskOp: false, index: 0 }
    });
    dialogref.afterClosed().subscribe((data: PerTaskDialog) => {
      if (data.taskOp == true) {
        this.perTaskPush(data.perTask, 'C');
      }
    });
  }

  editTask(personnalTask: PerTask, index: number): void {
    const dialogref = this.dialog.open(NewPersonnalTaskComponent, {
      width: '500px',
      height: 'auto',
      maxHeight: '75%',
      data: { perTask: personnalTask, taskOp: true, index: index }
    });
    dialogref.afterClosed().subscribe((data: PerTaskDialog) => {
      if (data.taskOp == true) {
        if (data.perTask.taskContext == 'C') {
          this.taskListInContext[data.index].taskName = data.perTask.taskName;
          this.taskListInContext[data.index].taskSummary = data.perTask.taskSummary;
          this.taskListInContext[data.index].taskDescription = data.perTask.taskDescription;
          this.taskListInContext[data.index].taskRemarks = data.perTask.taskRemarks;
        } if (data.perTask.taskContext == 'N') {
          this.taskListOutContext[data.index].taskName = data.perTask.taskName;
          this.taskListOutContext[data.index].taskSummary = data.perTask.taskSummary;
          this.taskListOutContext[data.index].taskDescription = data.perTask.taskDescription;
          this.taskListOutContext[data.index].taskRemarks = data.perTask.taskRemarks;
        }
      }
    });
  }


  getTaskListArray(context: string): PerTaskClass[] {
    if (context == 'C') {
      return this.taskListInContext;
    } else {
      return this.taskListOutContext;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'cancel', {
      duration: 1 * 1000
    });
  }

  updatePerTaskStatus(pertask: PerTask, status: string, index: number, selectedContext: string) {
    this.updateStatus.taskCode = pertask.taskCode;
    this.updateStatus.taskStatus = status;
    this.updateStatus.taskContext = pertask.taskContext;
    this.updateStatus.taskChange = 'S';
    this.taskApi.changeTaskStatus(this.updateStatus).subscribe((data: HttpResponse<string>) => {
      if (data.status == 200 && data.body == 'Success') {
        if (selectedContext == 'C') {
          this.taskListInContext[index].taskStatus = status;
        } if (selectedContext == 'N') {
          this.taskListOutContext[index].taskStatus = status;
        }
        this.openSnackBar('Task status updated successfully');
      } else {
        this.openSnackBar('Error while updating status');
      }
    });
  }

  changePerTaskContext(pertask: PerTask, index: number, selectedContext: string) {
    this.updateStatus.taskCode = pertask.taskCode;
    this.updateStatus.taskStatus = pertask.taskStatus;
    this.updateStatus.taskContext = (selectedContext == 'C' ? 'N' : 'C');
    this.taskApi.changeTaskStatus(this.updateStatus).subscribe((data: HttpResponse<string>) => {
      if (data.status == 200 && data.body == 'Success') {
        this.perTaskPush(pertask, (selectedContext == 'C' ? 'N' : 'C'));
        this.perTaskPop(index, selectedContext);
        this.openSnackBar('Task context is changed successfully');
      } else {
        this.openSnackBar('Error while changing context');
      }
    });
  }

  perTaskPush(pertask: PerTask, selectedContext: string) {
    if (selectedContext == 'C') {
      this.taskListInContext.push(pertask);
    } if (selectedContext == 'N') {
      this.taskListOutContext.push(pertask);
    }
  }

  perTaskPop(index: number, selectedContext: string) {
    if (selectedContext == 'C') {
      this.taskListInContext.splice(index, 1);
    } if (selectedContext == 'N') {
      this.taskListOutContext.splice(index, 1);
    }
  }

  getStatusList(status: string): string[] {
    var statusList: string[] = ['P', 'I', 'B', 'C', 'D'];
    if (status == null || status == undefined) {
      return statusList;
    } else {
      statusList.splice(statusList.indexOf(status, 0), 1);
      return statusList;
    }
  }

  getStatusName(status: string): string {
    switch (status) {
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
      case 'B': {
        return 'Blocked';
      }
      default: {
        return 'invalid';
      }
    }
  }

  getStatusDot(status: string): any {
    switch (status) {
      case 'C': {
        let dotStyle = {
          backgroundColor: 'green'
        }
        return dotStyle;
      }
      case 'P': {
        let dotStyle = {
          backgroundColor: 'orange'
        }
        return dotStyle;
      }
      case 'I': {
        let dotStyle = {
          backgroundColor: 'yellow'
        }
        return dotStyle;
      }
      case 'D': {
        let dotStyle = {
          backgroundColor: 'purple'
        }
        return dotStyle;
      }
      case 'B': {
        let dotStyle = {
          backgroundColor: 'red'
        }
        return dotStyle;
      }
      default: {
        let dotStyle = {
          backgroundColor: 'brown'
        }
        return dotStyle;
      }
    }
  }

}
