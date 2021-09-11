import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Student } from 'src/app/models/student';
import { HttpAttendanceClientService } from 'src/app/services/http-attendance-client.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  
  
  attendances :Attendance[] = [];
  student :Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
  attendance :Attendance = new Attendance(0,0,this.student,"","",0,"",new Date,"",0,0,"");

  attendancesObs:Observable<Attendance[]> = new Observable<Attendance[]>();
  findAttendanceObs:Observable<Attendance> = new Observable<Attendance>();
  delAttendanceObs:Observable<Attendance> = new Observable<Attendance>();
  upAttendanceObs : Observable<Attendance> = new Observable<Attendance>();
  constructor(private httpClientService:HttpAttendanceClientService,private router:Router) { }

  ngOnInit(): void {
    this.attendancesObs = this.httpClientService.attendanceList();
    this.attendancesObs.subscribe(data => {
      console.log(data);
      this.attendances = data;
    });
  }
  p:any;
  data:any=[];
  
  attendanceDelete(id:number):void{
    this.findAttendanceObs=this.httpClientService.attendanceById(id)
    this.findAttendanceObs.subscribe(data=>{
      this.attendance = data
    })
    this.delAttendanceObs= this.httpClientService.attendanceDelete(id);
    alert("Student deleted successfully");
    location.reload();
    this.delAttendanceObs.subscribe(()=>{
      this.httpClientService.attendanceList();
    });
  }

  attendanceUpdate(id :number):void{
    this.router.navigate(['attendance/update',id]);
  }
  
}
