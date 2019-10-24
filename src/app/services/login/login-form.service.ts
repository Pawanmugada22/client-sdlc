import { Md5 } from 'ts-md5/dist/md5';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
    console.log(h.toString());
    return this.http.post('http://localhost:8080/sdlclogin', this.formData);
  }

}
