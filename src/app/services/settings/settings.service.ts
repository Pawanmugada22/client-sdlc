import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonnalDetailsClass } from '../../models/PersonnalDetailsClass';
import { PasswordUpdate } from '../../models/PasswordUpdate';
import { Md5 } from 'ts-md5';

@Injectable()
export class SettingsService {

constructor(private http: HttpClient) { }

    getPersonnalDetails(): Observable<HttpResponse<PersonnalDetailsClass>> {
        return this.http.get<PersonnalDetailsClass>('/persettings/getperdetails',{ observe : 'response'});
    }

    setPersonnalDetails(perDet: PersonnalDetailsClass): Observable<HttpResponse<string>> {
        return this.http.post<string>('/persettings/setperdetails',perDet,{ observe : 'response', responseType: 'text' as 'json' });
    }

    setNewPassword(oldPass: string, newPass: string): Observable<HttpResponse<string>> {
        let passList=new PasswordUpdate();
        let hashold=new Md5();
        let hashnew=new Md5();
        passList.oldPassword=hashold.appendStr(oldPass).end(false).toString();
        passList.newPassword=hashnew.appendStr(newPass).end(false).toString();
        return this.http.post<string>('/persettings/setnewpass',passList,{ observe : 'response', responseType: 'text' as 'json' });
    }

}
