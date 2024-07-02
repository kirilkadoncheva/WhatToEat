import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLoginInfo } from '../authentication/login-info';
import { SignUpInfo } from '../authentication/sign-up-info';

const REGISTER_API = 'http://localhost:8088/api/users/';
const LOGIN_API = 'http://localhost:8088/api/login/';
const LOGOUT_API = 'http://localhost:8088/api/logout/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(loginInfo: AuthLoginInfo): Observable<any> {
    return this.http.post(LOGIN_API, {
      'email': loginInfo.email,
      'password': loginInfo.password,
    }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(LOGOUT_API, {}, httpOptions);
  }

  register(registerInfo: SignUpInfo): Observable<any> {
    return this.http.post(REGISTER_API, {
      'email': registerInfo.email,
      'password': registerInfo.password,
      'avatar': registerInfo.avatar,
      'firstName': registerInfo.firstName,
      'lastName': registerInfo.lastName,
      'role': registerInfo.role
    }, httpOptions);
  }
}


