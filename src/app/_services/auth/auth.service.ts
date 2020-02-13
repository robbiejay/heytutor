import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { TutorService } from '../tutor.service';

import { Student } from '../../_models/student.model';
import { Tutor } from '../../_models/tutor.model';

import { environment } from '../../../environments/environment';



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
private studentId: string;

private students: Student[] = [];
private tutors: Tutor[] = [];



  constructor(private http: HttpClient,
              private router: Router,
              private NgxSmartModalService: NgxSmartModalService,
              public tutorService: TutorService) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getTutorId() {
    return this.tutorId;
  }

  getStudentId() {
    return this.studentId;
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
this.http.post<{message: string; student: Student}>( '/api/students/signup', authData, { observe: 'response'})
.subscribe(response => {
  console.log(response);
  console.log(response.status);
  if(response.status === 201) {
    this.userIsCreated = true;
    this.NgxSmartModalService.close('signUp');
    this.NgxSmartModalService.open('logIn');
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
this.http.post<{message: string; tutor: Tutor}>('/api/tutors/signup', authData, { observe: 'response'})
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
  this.http.post<{token: string, studentId: string, expiresIn: number }>('/api/students/signin', authData)
  .subscribe(response => {
    console.dir(response);
    const token = response.token;
    this.studentId = response.studentId;
    this.token = token;
    if (token) {
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(token, this.studentId, expirationDate);
              // this.router.navigate(['/dashboard']);
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
  this.http.post<{token: string, tutorId: string, expiresIn: number }>('/api/tutors/signin', authData)
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
        this.tutorService.checkIdentification(this.tutorId);
        this.tutorService.checkBio(this.tutorId);
        this.tutorService.checkSubject(this.tutorId);
        this.tutorService.checkAvailability(this.tutorId);

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
  this.tutorId = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
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
  const studentId = localStorage.getItem('studentId');
  const tutorId = localStorage.getItem('tutorId');
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
