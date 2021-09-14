import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string=environment.apiBaseUserUrl;

  constructor(public http:HttpClient) { }

  public addUser(user:User):Observable<number>{
    console.log('user got added');

    return this.http.post<number>(`${this.apiUrl}/add`,user);
  }

  public getuserList():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  public deleteUser(eid:number):Observable<number>{
   return this.http.delete<number>(`${this.apiUrl}/delete/${eid}`);
  }

  public updateUser(user:User):Observable<number>{
  return  this.http.put<number>(`${this.apiUrl}/update`,user);
  }

  public getUserById(uid:number):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/byId/${uid}`);
  }

  public getUserByMobile(mobile :string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/byMobile/${mobile}`);
  }
}
