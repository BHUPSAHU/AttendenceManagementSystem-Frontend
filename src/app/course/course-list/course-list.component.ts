import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';



@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses :Course[] = [];
  course :Course = new Course(0,"","");

  coursesObs:Observable<Course[]> = new Observable<Course[]>();
  findCourseObs:Observable<Course> = new Observable<Course>();
  delCourseObs:Observable<Course> = new Observable<Course>();
  upCourseObs : Observable<Course> = new Observable<Course>();

  constructor(private httpClientService:HttpCourseClientService,private router:Router) { 


  }
  ngOnInit(): void {
 this.coursesObs = this.httpClientService.getCourse();
    this.coursesObs.subscribe(data => {
      this.courses = data;
    });
  }

  deleteCourse(id:number):void{
    this.findCourseObs=this.httpClientService.getCourseById(id)
    this.findCourseObs.subscribe(data=>{
      this.course = data
    })
    this.delCourseObs= this.httpClientService.deleteCourse(id);
    alert("Course deleted successfully");
    location.reload();
    this.delCourseObs.subscribe(()=>{
      this.httpClientService.getCourse();
    });
  }

  updateCourse(id :number):void{
    this.router.navigate(['course/update',id]);
  }

}
