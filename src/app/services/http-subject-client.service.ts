import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class HttpSubjectClientService
 {
  
  constructor(private http:HttpClient) { }
  private baseUrl="http://localhost:9090/api/subject/";

  public getSubject():Observable<Subject[]>{
    return this.http.get<Subject[]>( `${this.baseUrl}all`);
  }

  public getSubjectById(id:number):Observable<Subject>{
    return this.http.get<Subject>( `${this.baseUrl}byId/${id}`);
  }

  public createSubject(subject : Subject):Observable<Subject>{
    return this.http.post<Subject>( `${this.baseUrl}add`,subject);
  }

  public deleteSubject(id:number):Observable<Subject>{
    return this.http.delete<Subject>( `${this.baseUrl}delete/${id}`);
  }

  public updateSubject(subject:Subject):Observable<Subject>{
    return this.http.put<Subject>( `${this.baseUrl}update`,subject);
  }
}
