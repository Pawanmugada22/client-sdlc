import { HttprespInterface } from './../../../../models/httpresp/httpresp-interface';
import { HttprespClass } from './../../../../models/httpresp/httpresp-class';
import { PerTaskClass } from './../../../../models/per-task-class';
import { PerTask } from './../../../../models/per-task';
import { Component, Inject } from '@angular/core';
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

  constructor(public dialogRef: MatDialogRef<NewPersonnalTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PerTaskDialog,private snackBar: MatSnackBar,private taskapi: PerTaskCreateService) {
        this.Pertask.taskCode=data.perTask.taskCode.valueOf();
        this.Pertask.taskDescription=data.perTask.taskDescription.valueOf();
        this.Pertask.taskRemarks=data.perTask.taskRemarks.valueOf();
        this.Pertask.taskName=data.perTask.taskName.valueOf();
        this.Pertask.taskSummary=data.perTask.taskSummary.valueOf();
        this.taskOp=data.taskOp;
        this.edit=data.taskOp;
     }

    onClose(): void {
      this.dialogRef.close();
    }

    onEdit(): void {
      this.edit=!(this.edit);
    }

    openSnackBar(resp: HttprespClass,status: boolean) {
      console.log(resp.status+resp.message+resp.boolstatus);
      this.popupmessage=status ? resp.message : 'Error while saving !';
      console.log(this.popupmessage+'this is from opensnackbar method');
      this.snackBar.open(this.popupmessage,'cancel',{
        duration: 5 * 1000
      });
      setTimeout(()=>{ status ? this.onClose() : noop() },5000);
    }

    onSave() {
      if(this.taskOp==false) {
        this.taskapi.createNewTask(this.Pertask).subscribe((data: HttpResponse<HttprespClass>)=>{
          console.log('inside subscribe');
          this.httpresp=data.body;
          this.openSnackBar(this.httpresp,(data.status==200 ? true: false));
          console.log('testing');
        },(err)=>{console.log(err);
          this.resphead=err;
          console.log(this.httpresp.status);
          console.log(this.httpresp.message);
          console.log(this.resphead.status);
          // this.openSnackBar(this.httpresp,(this.resphead.status==200 ? true: false));
          console.log('Inside onSave method');
          console.log(this.httpresp.status+this.httpresp.message+this.httpresp.boolstatus);});
      } if (this.taskOp==true) {
      }
    }

    sampleMethod(){
      console.log('this will be printed');
    }    

}
