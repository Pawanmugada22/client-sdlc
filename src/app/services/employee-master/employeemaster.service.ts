import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PersonnalDetailsClass } from '../../models/PersonnalDetailsClass';
import { Observable } from 'rxjs';
import { RoleMaster } from '../../models/RoleMaster';

@Injectable()
export class EmployeemasterService {

    constructor(private http: HttpClient) { }

    getRoleList() : Observable<HttpResponse<RoleMaster[]>> {
        return this.http.get<RoleMaster[]>('/empmast/getrolelist', { observe: 'response' });
    }

    getEmployeeList(perDet: PersonnalDetailsClass) : Observable<HttpResponse<PersonnalDetailsClass[]>> {
        return this.http.post<PersonnalDetailsClass[]>('/empmast/getemplist',perDet,{ observe: 'response' });
    }

    createNewEmployee(perDet: PersonnalDetailsClass) : Observable<HttpResponse<string>>{
        return this.http.post<string>('/empmast/createemp',perDet,{ observe : 'response', responseType: 'text' as 'json' })
    }

    updateEmployee(perDet: PersonnalDetailsClass) : Observable<HttpResponse<string>>{
        return this.http.post<string>('/empmast/updateemp',perDet,{ observe : 'response', responseType: 'text' as 'json' })
    }
}
