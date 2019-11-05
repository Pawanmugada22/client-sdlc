import { HttprespInterface } from './../../models/httpresp/httpresp-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerTaskClass } from '../../models/per-task-class';
import { HttprespClass } from '../../models/httpresp/httpresp-class';

@Injectable({
    providedIn: 'root'
})
export class PerTaskCreateService {

constructor(private http: HttpClient) { }

    createNewTask(pertask :PerTaskClass) : Observable<HttpResponse<HttprespClass>> {
        return this.http.post<HttprespClass>('/pertask/createpertask',pertask,{ observe : 'response'});
    }

}
