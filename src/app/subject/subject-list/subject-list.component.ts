import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { HttpSubjectClientService } from 'src/app/services/http-subject-client.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects:Subject[]=[];
  course:Course=new Course(0,"","");
  subject:Subject=new Subject(0,"","","","",0,this.course);
  id:number=0;
  subjectObs:Observable<Subject[]> = new Observable<Subject[]>();
  findSubjectObs:Observable<Subject> = new Observable<Subject>();
  delSubjectObs:Observable<Subject> = new Observable<Subject>();
  upSubjectObs : Observable<Subject> = new Observable<Subject>();
  
  constructor(private service:HttpSubjectClientService,private router:Router) { }

  ngOnInit(): void
  
  {
    
    this.subjectObs=this.service.getSubject();
    this.subjectObs.subscribe(data=>{
      this.subjects=data;
    });
  }
  p:any;
  data:any=[];
  
  deleteSubject(id:number):void{
    this.findSubjectObs=this.service.getSubjectById(id)
    this.findSubjectObs.subscribe(data=>{
      this.subject = data
    })
    this.delSubjectObs= this.service.deleteSubject(id);
    alert("Subject deleted successfully");
    location.reload();
    this.delSubjectObs.subscribe(()=>{
      this.service.getSubject();
    });
  }
  updateSubject(id :number):void{
    this.router.navigate(['subject/update',id]);
  }


  subjectById(id:number):void
  {
    this.router.navigate(['subject/get',id]);
    
    
  }
}
