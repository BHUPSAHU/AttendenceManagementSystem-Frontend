import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance';

@Injectable({
  providedIn: 'root'
})
export class HttpAttendanceClientService {
  
  constructor(private httpClient:HttpClient) { }

  attendanceList():Observable<Attendance[]>{
    return this.httpClient.get<Attendance[]>('http://localhost:9090/api/attendance/all');
  }

  attendanceCreate(attendance: Attendance):Observable<Attendance>{
    console.log(attendance);
    return this.httpClient.post<Attendance>('http://localhost:9090/api/attendance/add', attendance);
  }

  attendanceDelete(attendanceId: number):Observable<Attendance>{
    return this.httpClient.delete<Attendance>('http://localhost:9090/api/attendance/delete/'+attendanceId);
  }

  public  attendanceById(attendanceId:number):Observable<Attendance>{
    return this.httpClient.get<Attendance>("http://localhost:9090/api/attendance/byId/"+attendanceId);
  }
  
  public attendanceUpdate(attendance: Attendance):Observable<Attendance>{
    return this.httpClient.put<Attendance>("http://localhost:9090/api/attendance/update", attendance);
  }

}
