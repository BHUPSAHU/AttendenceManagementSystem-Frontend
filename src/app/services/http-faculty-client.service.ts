import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faculty } from '../models/faculty';

@Injectable({
  providedIn: 'root'
})
export class HttpFacultyClientService {
  constructor(private httpClient:HttpClient) { }
 
  private baseUrl="http://localhost:9090/api/faculty/";

  public getFaculty():Observable<Faculty[]>{
    return this.httpClient.get<Faculty[]>( `${this.baseUrl}all`);
  }

  public getFacultyById(id:number):Observable<Faculty>{
    return this.httpClient.get<Faculty>( `${this.baseUrl}byId/${id}`);
  }

  public getFacultyByName(name:string):Observable<Faculty>{
    return this.httpClient.get<Faculty>( `${this.baseUrl}byName/${name}`);
  }

  public deleteFaculty(id:number):Observable<Faculty>{
    return this.httpClient.delete<Faculty>( `${this.baseUrl}delete/${id}`);
  }

  public createFaculty(faculty : Faculty):Observable<Faculty>{
    return this.httpClient.post<Faculty>( `${this.baseUrl}add`,faculty);
  }

  public updateFaculty(faculty : Faculty):Observable<Faculty>{
    return this.httpClient.put<Faculty>( `${this.baseUrl}update`,faculty);
  }

}


 

