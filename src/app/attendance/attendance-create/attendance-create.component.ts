import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-attendance-create',
  templateUrl: './attendance-create.component.html',
  styleUrls: ['./attendance-create.component.css']
})
export class AttendanceCreateComponent implements OnInit {
  
  
  constructor(private httpClientService:HttpAttendanceClientService,private httpStudentService:HttpStudentClientService,private router:Router,private serviceCourse:HttpCourseClientService,private service:HttpSubjectClientService) { }
  submitted:boolean = false;

  rollNo:number =0;
  id:number = 0 ;
  sid:string =''

  courses:Course[]=[];
  course:Course=new Course(0,"","");
  courseOb:Observable<Course[]>=new Observable<Course[]>();
  
  subjects:Subject[]=[];
  subject:Subject=new Subject(0,"","","","",0,this.course);
  subjectObs:Observable<Subject[]> = new Observable<Subject[]>();
 
  students:Student[]=[];
  student :Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
  attendance :Attendance = new Attendance(0,0,this.student,"","",0,"",new Date,"",0,0,"");
  addAttendanceForm : FormGroup = new FormGroup({});
  attendanceObs :Observable<Attendance> = new Observable<Attendance>();
  studentObs :Observable<Student[]> = new Observable<Student[]>();

  ngOnInit(): void 
  {
    this.courseOb=this.serviceCourse.getCourse();
    this.courseOb.subscribe(data=>{
      console.log(data)
      this.courses=data;
    });

    this.subjectObs=this.service.getSubject();
    this.subjectObs.subscribe(data=>{
      this.subjects=data;
    });

    this.studentObs=this.httpStudentService.getStudent();
    this.studentObs.subscribe(data=>{
      this.students=data;
    });

  }

  onSubmit() {
    this.submitted = true;
    this.attendance.courseId=101;
    this.attendance.student.studentId = this.attendance.studentId;
    console.log(this.attendance);
    this.attendanceObs =this.httpClientService.attendanceCreate(this.attendance);
    // location.reload();

    this.attendanceObs.subscribe(data =>{
      console.log(data);
      alert("Student Added Successfully.")
    })
    this.router.navigate(['/attendance/list']);
    setTimeout(()=>{
      location.reload();
    },500)
  }

  validate(event :Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }
  loadStudent(){
    this.id = this.attendance.studentId;
    this.student =new Student(this.id,0,"","",new Date,"","",0,"","","","","",""); 
    this.httpStudentService.getStudentById(this.id).subscribe(data =>{
      console.log(data);
      this.student=data;
      this.attendance.courseName = this.student.courseName;
      this.attendance.studentId = this.student.studentId;
    },error => console.log(error));
  }


  counter(i : number){
    return new Array(i);
  }

  calculatePercentage(){
    this.attendance.percentage = Math.round(this.attendance.total/(Number.parseInt(this.attendance.totalClass))*100)+"%";
  }
}
