import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { Subject } from 'src/app/models/subject';
import { HttpAttendanceClientService } from 'src/app/services/http-attendance-client.service';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';
import { HttpSubjectClientService } from 'src/app/services/http-subject-client.service';

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
  students:Student[]=[];
  studentObs :Observable<Student[]> = new Observable<Student[]>();

  courses:Course[]=[];
  course:Course=new Course(0,"","");
  courseOb:Observable<Course[]>=new Observable<Course[]>();
  
  subjects:Subject[]=[];
  subject:Subject=new Subject(0,"","","","",0,this.course);
  subjectObs:Observable<Subject[]> = new Observable<Subject[]>();
  constructor(private httpClientService:HttpAttendanceClientService,private route: ActivatedRoute,private httpStudentService:HttpStudentClientService,private router:Router,private serviceCourse:HttpCourseClientService,private service:HttpSubjectClientService) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.attendance =new Attendance(this.id,0,this.student,"","",0,"",new Date,"",0,0,""); 
    this.httpClientService.attendanceById(this.id).subscribe(data =>{
      this.attendance=data;
    },error => console.log(error));
    this.courseOb=this.serviceCourse.getCourse();
    this.courseOb.subscribe(data=>{
      console.log(data)
      this.courses=data;
    });

    this.subjectObs=this.service.getSubject();
    this.subjectObs.subscribe(data=>{
      this.subjects=data;
    });
  }

  onSubmit() {
    console.log("update")
    this.submitted = true;
    this.attendanceObs =this.httpClientService.attendanceUpdate(this.attendance);
    this.attendanceObs.subscribe(data =>{
      alert("Student Updated Successfully.")
    })
    this.router.navigate(['attendance/list']);
    setTimeout(()=>{
      location.reload();
    },500)
  } 

  list(){
    this.router.navigate(['attendance/list']);
  }

  counter(i : number){
    return new Array(i);
  }

  calculatePercentage(){
    this.attendance.percentage = Math.round(this.attendance.total/(Number.parseInt(this.attendance.totalClass))*100)+"%";
  }
}
