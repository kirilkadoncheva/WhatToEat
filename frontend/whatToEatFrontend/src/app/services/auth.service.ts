import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthLoginInfo } from '../authentication/login-info';
import { SignUpInfo } from '../authentication/sign-up-info';

const USERS_API = 'http://localhost:8088/api/users/';
const LOGIN_API = 'http://localhost:8088/api/login/';
const LOGOUT_API = 'http://localhost:8088/api/logout/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
}

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
    return this.http.post(USERS_API, {
      'email': registerInfo.email,
      'password': registerInfo.password,
      'avatar': registerInfo.avatar,
      'firstName': registerInfo.firstName,
      'lastName': registerInfo.lastName,
      'role': registerInfo.role
    }, httpOptions);
  }

  getUserInfo(id: string): Observable<User> {
    return this.http.get<User>(USERS_API + "/" + id).pipe(catchError(this.handleError));
  }

updateUser(id: string, firstName: string, lastName: string, avatar: string): Observable<any> {
    return this.http.get<User>(USERS_API + "/" + id, { observe: "body", responseType: 'json' as 'json' })
    .pipe(switchMap(response => {
      let user = response;
      if (firstName != null) {
        user.firstName = firstName;
      }
      if (lastName != null) {
        user.lastName = lastName;
      }
      if (avatar != null) {
        user.avatar = avatar;
      }
      return this.http.put(USERS_API + "/" + id, user, httpOptions).pipe(catchError(this.handleError));
    }));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}


