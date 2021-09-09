import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { HttpSubjectClientService } from 'src/app/services/http-subject-client.service';

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.css']
})
export class SubjectUpdateComponent implements OnInit
 {
  id:number = 0 ;
  submitted:boolean =false;
  course :Course=new Course(0,"","");
  subject :Subject = new Subject(0,"","","","",0,this.course);
  subjectOb : Observable<Subject> = new Observable<Subject>();
  sid:string =''
  constructor(private service:HttpSubjectClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void
   {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.subject =new Subject(0,"","","","",0,this.course); 
    this.service.getSubjectById(this.id).subscribe(data =>{
      console.info(data);
      this.subject=data;
      this.subject.courseId = this.subject.course.courseId;
    },error => console.log(error));
  }
  onSubmit() {
    console.log("update")
    this.submitted = true;
    this.subjectOb =this.service.updateSubject(this.subject);
    this.subjectOb.subscribe(data =>{
      alert("Subject Updated Successfully.")
    })
    this.router.navigate(['subject/list']);
  } 

  list(){
    this.router.navigate(['subject/list']);
  }
}
