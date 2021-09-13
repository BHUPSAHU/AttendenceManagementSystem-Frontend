import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
//import { Subject } from 'src/app/models/subject';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';


@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  
  constructor(private service:HttpCourseClientService,private router:Router) {
   }
  submitted:boolean=false;
  course:Course=new Course(0,"","");
  // subject:Subject=new Subject(0,"","","","",0,this.course);
  addCourseForm :FormGroup=new FormGroup({});
  courseOb:Observable<Course>=new Observable<Course>();
  descLen = 0;
  ngOnInit(): void
   {
  }
  onSubmit() 
  {
    this.submitted = true;
    // this.course.courseId=1;
    //  this.course.courseName ="Java";
  //  this.subject.course.courseId=this.subject.courseId;
     console.log(this.course);
    this.courseOb =this.service.createCourse(this.course);
    console.log(this.course);
    this.courseOb.subscribe(data =>{
      console.log(data);
      alert("Course Added Successfully.")
    })
    this.router.navigate(['/course/list']);
  }

  validate(event :Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

  checkcount(){
    this.descLen = this.course.description.length;
  }
}
