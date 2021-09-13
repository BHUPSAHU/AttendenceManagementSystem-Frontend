import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  constructor(private httpClientService:HttpStudentClientService,private router:Router,private serviceCourse:HttpCourseClientService) { }
  submitted:boolean = false;
  courses:Course[]=[];
  course:Course=new Course(0,"","");
  courseOb:Observable<Course[]>=new Observable<Course[]>();

  student :Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
  addStudentForm : FormGroup = new FormGroup({});
  studentObs :Observable<Student> = new Observable<Student>();
  
  ngOnInit(): void
   {
    this.courseOb=this.serviceCourse.getCourse();
    this.courseOb.subscribe(data=>{
      console.log(data)
      this.courses=data;
    });
  }
  onSubmit() {
    this.submitted = true;
    this.student.courseId=101;
    this.student.profilePic ="pic Path 1234567891"
    this.studentObs =this.httpClientService.createStudent(this.student);
    console.log(this.student);
    this.studentObs.subscribe(data =>{
      console.log(data);
      alert("Student Added Successfully.")
    })
    this.router.navigate(['/student/list']);
  }

  validate(event :Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

  getDate(){
    let d = new Date();
    return ((d.getFullYear()-4)+"/"+d.getMonth()+"/"+d.getDate());
  }
}
