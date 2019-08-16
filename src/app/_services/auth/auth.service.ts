import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { Student } from '../../_models/student.model';
import { Tutor } from '../../_models/tutor.model';


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

private tutorId: string;

private students: Student[] = [];
private tutors: Tutor[] = [];



  constructor(private http: HttpClient,
              private router: Router,
              private NgxSmartModalService: NgxSmartModalService) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getTutorId() {
    return this.tutorId;
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

createTutor(firstname: string, lastname: string, email: string, password: string) {
const authData: AuthData = {
  firstname: firstname,
  lastname: lastname,
  email: email,
  password: password
 };
 console.log(authData);
this.http.post<{message: string; tutor: Tutor}>('http://localhost:3000/api/tutors/signup', authData, { observe: 'response'})
.subscribe(response => {
  console.log(response);
  console.log(response.status);
  if(response.status === 201) {
    this.userIsCreated = true;
    this.router.navigate(['/registration']);
  }
});
}

login(email: string, password: string, firstname: string, lastname: string ) {
  const authData: AuthData = {email: email, password: password, firstname: firstname, lastname: lastname, };
  console.log(authData);
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
      this.NgxSmartModalService.close('logIn');
      this.NgxSmartModalService.open('onLogin');

    }
  }, error => {
      if(error.status === 401) {
        this.userIsUnauthorized = true;
      }
      console.log(error.status);
    })
}

loginTutor(email: string, password: string, firstname: string, lastname: string) {
  const authData: AuthData = {email: email, password: password, firstname: firstname, lastname: lastname, };
  console.log(authData);
  this.http.post<{token: string, tutorId: string, expiresIn: number }>("http://localhost:3000/api/tutors/signin", authData)
  .subscribe(response => {
    console.dir(response);
    const token = response.token;
    this.tutorId = response.tutorId;
    this.token = token;
    if (token) {
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveTutorAuthData(token, this.tutorId, expirationDate);
      this.getAuthStatusListener();
        this.router.navigate(['/registration']);

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
    console.log(this.isAuthenticated);
    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }
}

logout() {
  this.token = null;
  this.tutorId = null;
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

private saveTutorAuthData(token: string, tutorId: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('tutorId', tutorId);
    localStorage.setItem('expiration', expirationDate.toISOString());
}

private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('studentId');
  localStorage.removeItem('tutorId');
  localStorage.removeItem('expiration');
}

getAuthData() {
  const token = localStorage.getItem('token');
  console.log(token);
  const studentId = localStorage.getItem('studentId');
  console.log(studentId);
  const tutorId = localStorage.getItem('tutorId');
  console.log(tutorId);
  const expirationDate = localStorage.getItem('expiration');
  if (!token || !expirationDate) {
    return;
  } else if (studentId) {
    return {
      token: token,
      studentId: studentId,
      expirationDate: new Date(expirationDate)
    }
  } else if (tutorId) {
    return {
      token: token,
      tutorId: tutorId,
      expirationDate: new Date(expirationDate)
    }
  }
}

}
