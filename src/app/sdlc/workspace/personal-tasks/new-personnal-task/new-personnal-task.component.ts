import { HttprespInterface } from './../../../../models/httpresp/httpresp-interface';
import { HttprespClass } from './../../../../models/httpresp/httpresp-class';
import { PerTaskClass } from './../../../../models/per-task-class';
import { PerTask } from './../../../../models/per-task';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PerTaskDialog } from '../../../../models/per-task-dialog';
import { PerTaskCreateService } from '../../../../services/per-task/per-task-create.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { noop } from 'rxjs';

@Component({
  selector: 'app-new-personnal-task',
  templateUrl: './new-personnal-task.component.html',
  styleUrls: ['./new-personnal-task.component.css']
})
export class NewPersonnalTaskComponent {

  
  Pertask: PerTaskClass=new PerTaskClass();
  taskOp: boolean;
  edit: boolean;
  resphead:HttpErrorResponse;
  httpresp: HttprespClass=new HttprespClass();
  popupmessage: string;
  index: number;

  constructor(public dialogRef: MatDialogRef<NewPersonnalTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PerTaskDialog,private snackBar: MatSnackBar,private taskapi: PerTaskCreateService) {
        this.Pertask.taskCode=data.perTask.taskCode;
        this.Pertask.taskDescription=data.perTask.taskDescription;
        this.Pertask.taskRemarks=data.perTask.taskRemarks;
        this.Pertask.taskName=data.perTask.taskName;
        this.Pertask.taskSummary=data.perTask.taskSummary;
        this.Pertask.taskContext=data.perTask.taskContext;
        this.taskOp=data.taskOp;
        this.edit=data.taskOp;
        this.index=data.index;
     }

    onClose(): void {
      this.dialogRef.close({status: false});
    }

    onEdit(): void {
      this.edit=!(this.edit);
    }

    openSnackBar(resp: string,status: boolean) {
      this.popupmessage=status ? resp : 'Error while saving !';
      this.snackBar.open(this.popupmessage,'cancel',{
        duration: 1 * 1000
      });
      // setTimeout(()=>{ status ? this.onClose() : noop() },5000);
    }

    onSave() {
      if(this.taskOp==false) {
        this.taskapi.createNewTask(this.Pertask).subscribe((data: HttpResponse<HttprespClass>)=>{
          if(data.status==200){
            this.Pertask.taskCode=data.body.perTaskCode;
            this.Pertask.taskStatus='P';
            this.Pertask.taskContext='C';
            this.openSnackBar(data.body.message,true);
            this.dialogRef.close({ taskOp: true, perTask: this.Pertask, index: this.index })
          } else {
            this.openSnackBar('Invalid response',false);
            this.dialogRef.close({ taskOp: false, perTask: this.Pertask, index: this.index })
          }
        },(err)=>{console.log(err);
          this.resphead=err;
          // this.openSnackBar(this.httpresp,(this.resphead.status==200 ? true: false));
          console.log(this.httpresp.status+this.httpresp.message+this.httpresp.boolstatus);});
      } if (this.taskOp==true) {
        this.taskapi.updateTaskDetails(this.Pertask).subscribe((resp: HttpResponse<string>)=>{
          if(resp.status==200 && resp.body=='Success'){
            this.dialogRef.close({ taskOp: true, perTask: this.Pertask, index: this.index });
            this.openSnackBar('Task details updated successfully',true);
          } else {
            this.openSnackBar('Invalid response',false);
            this.dialogRef.close({ taskOp: false, perTask: this.Pertask, index: this.index });
          }
        },(err)=>{console.log(err);});
      }
    }

    sampleMethod(){
      console.log('this will be printed');
    }    

}
