import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';

import { Student } from '../../_models/student.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

private token: string;
private tokenTimer: any;
private authStatusListener = new Subject<boolean>();
private isAuthenticated = false;
public userIsCreated = false;
public userIsUnauthorized = false;

private students: Student[] = [];



  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}

createStudent(firstname: string, lastname: string, email: string, password: string) {
const authData: AuthData = {
  firstname: firstname,
  lastname: lastname,
  email: email,
  password: password
 };
 console.log(authData);
this.http.post<{message: string; student: Student}>('http://localhost:3000/api/students/signup', authData, { observe: 'response'})
.subscribe(response => {
  console.log(response);
  console.log(response.status);
  if(response.status === 201) {
    this.userIsCreated = true;
  }
});
}

login(firstname: string, lastname: string, email: string, password: string) {
  const authData: AuthData = {firstname: firstname, lastname: lastname, email: email, password: password};
  this.http.post<{token: string, studentId: string, expiresIn: number }>("http://localhost:3000/api/students/signin", authData)
  .subscribe(response => {
    console.dir(response);
    const token = response.token;
    const studentId = response.studentId;
    this.token = token;
    if (token) {
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(token, studentId, expirationDate);
      this.router.navigate(['/'])
    }
  }, error => {
      if(error.status === 401) {
        this.userIsUnauthorized = true;
      }
      console.log(error.status);
    })
}

autoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
    return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }
}

logout() {
  this.token = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  console.log(this.token);
  clearTimeout(this.tokenTimer);
  this.clearAuthData();
  this.router.navigate(['/home']);
}

private setAuthTimer(duration: number) {
  console.log('Setting timer: ' + duration);
  this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
}

private saveAuthData(token: string, studentId: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('studentId', studentId);
    localStorage.setItem('expiration', expirationDate.toISOString());
}

private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('studentId');
  localStorage.removeItem('expiration');
}

getAuthData() {
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('studentId');
  const expirationDate = localStorage.getItem('expiration');
  if (!token || !expirationDate || !studentId) {
    return;
  }
  return {
    token: token,
    studentId: studentId,
    expirationDate: new Date(expirationDate)
  }
}

}
