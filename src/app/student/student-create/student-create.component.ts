import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  constructor(private httpClientService:HttpStudentClientService,private router:Router) { }
  submitted:boolean = false;
  student :Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
  addStudentForm : FormGroup = new FormGroup({});
  studentObs :Observable<Student> = new Observable<Student>();
  ngOnInit(): void {

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

}
