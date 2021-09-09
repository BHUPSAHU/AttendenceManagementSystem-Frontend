import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Student } from 'src/app/models/student';
import { HttpAttendanceClientService } from 'src/app/services/http-attendance-client.service';


@Component({
  selector: 'app-attendance-create',
  templateUrl: './attendance-create.component.html',
  styleUrls: ['./attendance-create.component.css']
})
export class AttendanceCreateComponent implements OnInit {
  
  
  constructor(private httpClientService:HttpAttendanceClientService,private router:Router) { }
  submitted:boolean = false;
  student :Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
  attendance :Attendance = new Attendance(0,0,this.student,"","",0,"",new Date,"",0,0,"");
  addAttendanceForm : FormGroup = new FormGroup({});
  attendanceObs :Observable<Attendance> = new Observable<Attendance>();
  studentObs :Observable<Attendance> = new Observable<Attendance>();

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.attendance.courseId=101;
    this.attendance.student.studentId = this.attendance.studentId;
    console.log(this.attendance);
    this.attendanceObs =this.httpClientService.attendanceCreate(this.attendance);
    
    this.attendanceObs.subscribe(data =>{
      console.log(data);
      alert("Student Added Successfully.")
    })
    this.router.navigate(['/attendance/list']);
  }


}
