import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/subject';
import { HttpSubjectClientService } from 'src/app/services/http-subject-client.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit 
{
  
  constructor(private service:HttpSubjectClientService,private router:Router,private serviceCourse:HttpCourseClientService) { }
  
  submitted:boolean=false;
  courses:Course[]=[];
  course:Course=new Course(0,"","");
  courseOb:Observable<Course[]>=new Observable<Course[]>();

  subject:Subject=new Subject(0,"","","","",0,this.course);
  // addSubjectForm :FormGroup=new FormGroup({});
  subjectOb:Observable<Subject>=new Observable<Subject>();
  ngOnInit(): void
   {
    this.courseOb=this.serviceCourse.getCourse();
    this.courseOb.subscribe(data=>{
      console.log(data)
      this.courses=data;
    });

  }
  onSubmit() 
  {
    this.submitted = true;
    this.subject.course.courseId=this.subject.courseId;
    console.log(this.subject);
    this.subjectOb =this.service.createSubject(this.subject);
    console.log(this.subject);
    this.subjectOb.subscribe(data =>{
      console.log(data);
      alert("Subject Added Successfully.")
    })
    this.router.navigate(['/subject/list']);
  }
}
