import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Faculty } from '../models/faculty.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  url:string=environment.apiBaseFacultyUrl;
  constructor(private http:HttpClient) { }

  getFacultyById(eid:number):Observable<Faculty>{
      return this.http.get<Faculty>(`${this.url}/byName/`+eid);
  }
}
