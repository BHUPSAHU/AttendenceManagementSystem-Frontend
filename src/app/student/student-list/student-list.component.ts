import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students :Student[] = [];
  student :Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");


  studentsObs:Observable<Student[]> = new Observable<Student[]>();
  findStudentObs:Observable<Student> = new Observable<Student>();
  delStudentObs:Observable<Student> = new Observable<Student>();
  upStudentObs : Observable<Student> = new Observable<Student>();
  constructor(private httpClientService:HttpStudentClientService,private router:Router) {

   }

  ngOnInit(): void {
    this.studentsObs = this.httpClientService.getStudent();
    this.studentsObs.subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(id:number):void{
    this.findStudentObs=this.httpClientService.getStudentById(id)
    this.findStudentObs.subscribe(data=>{
      this.student = data
    })
    this.delStudentObs= this.httpClientService.deleteStudent(id);
    alert("Student deleted successfully");
    location.reload();
    this.delStudentObs.subscribe(()=>{
      this.httpClientService.getStudent();
    });
  }

  updateStudent(id :number):void{
    this.router.navigate(['student/update',id]);
  }

}
