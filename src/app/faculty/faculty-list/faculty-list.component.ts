import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Faculty } from 'src/app/models/faculty';
import { Subject } from 'src/app/models/subject';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {
  facultys :Faculty[] = [];
  course:Course=new Course(0,"","");
  subject:Subject=new Subject(0,"","","","",0,this.course);
  faculty:Faculty=new Faculty(0,"","",0,this.subject);
  Id:number=0;

  facultysObs:Observable<Faculty[]> = new Observable<Faculty[]>();
  findFacultyObs:Observable<Faculty> = new Observable<Faculty>();
  delFacultyObs:Observable<Faculty> = new Observable<Faculty>();
  upFacultyObs : Observable<Faculty> = new Observable<Faculty>();
  constructor(private httpClientService:HttpFacultyClientService,private router:Router) {

   }

  ngOnInit(): void {
    this.facultysObs = this.httpClientService.getFaculty();
    this.facultysObs.subscribe(data => {
      this.facultys = data;
    });
  }

  deleteFaculty(id:number):void{
    // this.findFacultyObs=this.httpClientService.getFacultyById(id)
    // this.findFacultyObs.subscribe(data=>{
    //   this.faculty = data
    // })
    this.delFacultyObs= this.httpClientService.deleteFaculty(id);
   
    location.reload();
    this.delFacultyObs.subscribe(()=>{
      alert("Faculty deleted successfully");
      this.httpClientService.getFaculty();
    });
  }

  updateFaculty(id :number):void{
    this.router.navigate(['faculty/update',id]);
  }

}