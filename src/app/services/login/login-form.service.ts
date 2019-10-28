import { LocalSessionKeys } from './../../models/local-session-keys';
import { Md5 } from 'ts-md5/dist/md5';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  formData = new FormData();
  hash = new Md5();  

  constructor(private http: HttpClient) {
  }

  submitForm(username: string, password: string) {
    let h = this.hash.appendStr(password).end(false);
    this.formData.set('username', username);
    this.formData.set('password', h.toString());
    return this.http.post('/sdlclogin', this.formData);
    // return this.http.post('http://localhost:8080/sdlclogin', this.formData);
  }

  getLocalKeys(): Observable<LocalSessionKeys> {
    return this.http.get<LocalSessionKeys>('/helloauthentication',{ observe : 'body' });
    // return this.http.get<LocalSessionKeys>('http://localhost:8080/helloauthentication',{ observe : 'body' });
  }

  signOut() {
    return this.http.post('/logout',null);
    // return this.http.post<HttpErrorResponse>('http://localhost:8080/logout',{ observe : "response" });
  }

}
