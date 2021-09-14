import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class HttpStudentClientService {

  constructor(private httpClient:HttpClient) { }

  private baseUrl="http://localhost:9090/api/student/";

  public getStudent():Observable<Student[]>{
    return this.httpClient.get<Student[]>( `${this.baseUrl}all`);
  }

  public getStudentById(id:number):Observable<Student>{
    return this.httpClient.get<Student>( `${this.baseUrl}byId/${id}`);
  }

  public getStudentRoll(roll:number):Observable<Student>{
    return this.httpClient.get<Student>( `${this.baseUrl}byRoll/${roll}`);
  }

  public getStudentByName(name:string):Observable<Student>{
    return this.httpClient.get<Student>( `${this.baseUrl}byName/${name}`);
  }

  public deleteStudent(id:number):Observable<Student>{
    return this.httpClient.delete<Student>( `${this.baseUrl}delete/${id}`);
  }

  public createStudent(student : Student):Observable<Student>{
    return this.httpClient.post<Student>( `${this.baseUrl}add`,student);
  }

  public updateStudent(student:Student):Observable<Student>{
    return this.httpClient.put<Student>( `${this.baseUrl}update`,student);
  }

}
