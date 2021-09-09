import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';


@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {


  id:number = 0 ;
  submitted:boolean =false;
  course:Course = new Course(0,"","");
  courseObs : Observable<Course> = new Observable<Course>();
  cid:string =''
    constructor(private httpClientService:HttpCourseClientService,private route: ActivatedRoute,private router:Router) { }
  
    ngOnInit(): void {
      this.cid = this.route.snapshot.params['id'];
      this.id = Number.parseInt(this.cid);
      this.course =new Course(this.id,"",""); 
      this.httpClientService.getCourseById(this.id).subscribe(data =>{
        this.course=data;
      },error => console.log(error));
    }
  
    onSubmit() {
      console.log("update")
      this.submitted = true;
      this.courseObs =this.httpClientService.updateCourse(this.course);
      this.courseObs.subscribe(data =>{
        alert("Course Updated Successfully.")
      })
      this.router.navigate(['course/list']);
    } 
  
    list(){
      this.router.navigate(['course/list']);
    }
  
  }
  