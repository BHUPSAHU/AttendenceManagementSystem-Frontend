import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Student } from 'src/app/models/student';
import { HttpAttendanceClientService } from 'src/app/services/http-attendance-client.service';

@Component({
  selector: 'app-attendance-update',
  templateUrl: './attendance-update.component.html',
  styleUrls: ['./attendance-update.component.css']
})
export class AttendanceUpdateComponent implements OnInit {
  

  id:number = 0 ;
  submitted:boolean =false;
  student :Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
  attendance :Attendance = new Attendance(0,0,this.student,"","",0,"",new Date,"",0,0,"");
  attendanceObs : Observable<Attendance> = new Observable<Attendance>();
  sid:string =''

  constructor(private httpClientService:HttpAttendanceClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.attendance =new Attendance(this.id,0,this.student,"","",0,"",new Date,"",0,0,""); 
    this.httpClientService.attendanceById(this.id).subscribe(data =>{
      this.attendance=data;
    },error => console.log(error));
  }

  onSubmit() {
    console.log("update")
    this.submitted = true;
    this.attendanceObs =this.httpClientService.attendanceUpdate(this.attendance);
    this.attendanceObs.subscribe(data =>{
      alert("Student Updated Successfully.")
    })
    this.router.navigate(['attendance/list']);
  } 

  list(){
    this.router.navigate(['attendance/list']);
  }


}
