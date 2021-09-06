import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
id:number = 0 ;
submitted:boolean =false;
student:Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
studentObs : Observable<Student> = new Observable<Student>();
sid:string =''
  constructor(private httpClientService:HttpStudentClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.student =new Student(this.id,0,"","",new Date,"","",0,"","","","","",""); 
    this.httpClientService.getStudentById(this.id).subscribe(data =>{
      this.student=data;
    },error => console.log(error));
  }

  onSubmit() {
    console.log("update")
    this.submitted = true;
    this.studentObs =this.httpClientService.updateStudent(this.student);
    this.studentObs.subscribe(data =>{
      alert("Student Updated Successfully.")
    })
    this.router.navigate(['student/list']);
  } 

  list(){
    this.router.navigate(['student/list']);
  }

}
