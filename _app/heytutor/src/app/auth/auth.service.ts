import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class AuthService {
constructor(private http: HttpClient) {}

  login(email: string, password: string, firstname: string, lastname: string) {
    const authData = {email: email, password: password, firstname: firstname, lastname: lastname};
    console.log(authData);
    // return this.http.post<{token: string, studentId: string, expiresIn: number }>(
    //   'http://10.0.2.2:3000/api/students/signin',
    //   authData
    // )
  }
}
