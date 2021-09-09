import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { HttpSubjectClientService } from 'src/app/services/http-subject-client.service';



@Component({
  selector: 'app-subject-by-id',
  templateUrl: './subject-by-id.component.html',
  styleUrls: ['./subject-by-id.component.css']
})
export class SubjectByIdComponent implements OnInit {

  subjects:Subject[]=[];
  course:Course=new Course(0,"","");
  id: number=0;
  subject:Subject=new Subject(0,"","","","",0,this.course);
  submitted:boolean =false;
  subjectOb : Observable<Subject> = new Observable<Subject>();
  sid:string =''

  subjectObs:Observable<Subject[]> = new Observable<Subject[]>();
  findSubjectObs:Observable<Subject> = new Observable<Subject>();
  delSubjectObs:Observable<Subject> = new Observable<Subject>();
  upSubjectObs : Observable<Subject> = new Observable<Subject>();
  
  constructor(private service:HttpSubjectClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void
  
  {

    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.subject =new Subject(0,"","","","",0,this.course); 
    this.service.getSubjectById(this.id).subscribe(data =>{
      this.subject=data;
    },error => console.log(error));
  }

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

}


