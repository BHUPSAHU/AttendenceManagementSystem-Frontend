import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Student } from 'src/app/models/student';
import { HttpAttendanceClientService } from 'src/app/services/http-attendance-client.service';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  x="10%";
  id:number = 0 ;
  sid:string =''
  student:Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
  studentObs : Observable<Student> = new Observable<Student>();
  
  attendance :Attendance = new Attendance(0,0,this.student,"","",0,"",new Date,"",0,0,"");
  attendances :Attendance[] =[];
  attendanceObs :Observable<Attendance[]> = new Observable<Attendance[]>();
  
  constructor(private httpAttendanceService:HttpAttendanceClientService,private httpClientService:HttpStudentClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.student =new Student(this.id,0,"","",new Date,"","",0,"","","","","",""); 
    this.httpClientService.getStudentById(this.id).subscribe(data =>{
      console.log(data);
      this.student=data;
    },error => console.log(error));

    this.attendanceObs = this.httpAttendanceService.attendanceList();
    this.attendanceObs.subscribe(data =>{
        data.forEach( item => {
          if(item.student.studentId == this.student.studentId){
            this.attendances.push(item)
          }
        });
    })
  }

  getPercent(index:number){
    return this.attendances[index].percentage
  }

  getBG(index :number){
    let per =Number.parseInt(this.attendances[index].percentage.slice(0,-1)); 
    let color = "#007bff"
    if(per <75){
      return "#dc3545"
    }
    return color;
  }
}
