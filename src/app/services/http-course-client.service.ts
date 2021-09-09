import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
@Injectable({
  providedIn: 'root'
})
export class HttpCourseClientService 
{

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:9090/api/course/";
  public getCourse():Observable<Course[]>{
    return this.http.get<Course[]>( `${this.baseUrl}all`);
  }

  public getCourseById(id:number):Observable<Course>{
    return this.http.get<Course>( `${this.baseUrl}byId/${id}`);
  }

  public createCourse(course : Course):Observable<Course>{
    return this.http.post<Course>( `${this.baseUrl}add`,course);
  }

  public deleteCourse(id:number):Observable<Course>{
    return this.http.delete<Course>( `${this.baseUrl}delete/${id}`);
  }

  public updateCourse(course:Course):Observable<Course>{
    return this.http.put<Course>( `${this.baseUrl}update`,course);
  }
}



