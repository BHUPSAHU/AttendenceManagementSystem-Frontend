import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Faculty } from 'src/app/models/faculty';
import { Subject } from 'src/app/models/subject';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';

@Component({
  selector: 'app-faculty-create',
  templateUrl: './faculty-create.component.html',
  styleUrls: ['./faculty-create.component.css']
})
export class FacultyCreateComponent implements OnInit {

 
  submitted:boolean=false;
  course:Course=new Course(0,"","");
  subject:Subject=new Subject(0,"","","","",0,this.course);
  faculty:Faculty=new Faculty(0,"","",0,this.subject)
  // addSubjectForm :FormGroup=new FormGroup({});
  subjectOb:Observable<Subject>=new Observable<Subject>();
   facultyOb:Observable<Faculty>=new Observable<Faculty>();
 
 

  constructor(private httpClientService:HttpFacultyClientService, private router:Router) { }

  ngOnInit(): void
   {
    
  }

  onSubmit() 
  {
    this.submitted = true;
    // this.faculty.facultyId=101;
    // this.faculty.userName ="Java";
    // this.faculty.subject.subjectId=this.faculty.subjectId;
    // console.log(this.faculty);
    this.facultyOb =this.httpClientService.createFaculty(this.faculty);
    console.log(this.faculty);
    this.facultyOb.subscribe(data =>{
      console.log(data);
      alert("faculty Added Successfully.")
    })
    this.router.navigate(['/faculty/list']);
  }

  validate(event :Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

}


