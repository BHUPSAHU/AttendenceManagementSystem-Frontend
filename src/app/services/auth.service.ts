import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:9090/api/auth/';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log("entered login");
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  forgot(username: string, password: string,email:string): Observable<any> {
    console.log("entered forgot");
    return this.http.post(AUTH_API + 'forgot', {
      username,
      password,
      email
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    console.log("entered register");
    console.log(username);
    console.log(password);
    console.log(email);
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password      
    }, httpOptions);
  }
}


