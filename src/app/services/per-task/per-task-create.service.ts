import { Params } from '@angular/router';
import { HttprespInterface } from './../../models/httpresp/httpresp-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerTaskClass } from '../../models/per-task-class';
import { HttprespClass } from '../../models/httpresp/httpresp-class';
import { PerTask } from '../../models/per-task';

@Injectable({
    providedIn: 'root'
})
export class PerTaskCreateService {

constructor(private http: HttpClient) { }

    createNewTask(pertask :PerTaskClass) : Observable<HttpResponse<HttprespClass>> {
        return this.http.post<HttprespClass>('/pertask/createpertask',pertask,{ observe : 'response'});
    }

    getTaskList(conText: string) : Observable<HttpResponse<PerTask[]>>{
        let TaskParams=new HttpParams();
        TaskParams.set('context',conText);
        return this.http.get<PerTask[]>('/pertask/gettasklist',{ observe : 'response', params : TaskParams });
    }

}
