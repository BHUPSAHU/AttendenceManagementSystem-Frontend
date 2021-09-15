import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Faculty } from 'src/app/models/faculty';
import { Subject } from 'src/app/models/subject';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';
import { HttpSubjectClientService } from 'src/app/services/http-subject-client.service';

@Component({
  selector: 'app-faculty-create',
  templateUrl: './faculty-create.component.html',
  styleUrls: ['./faculty-create.component.css']
})
export class FacultyCreateComponent implements OnInit {
  tempIndex:number=0;
  temp!:Subject;
  subjectArr:Subject[]=[];
  submitted:boolean=false;
  course:Course=new Course(0,"","");
  subject:Subject=new Subject(0,"","","","",0,this.course);
  faculty:Faculty=new Faculty(0,"","",0,[])
  subjects:Subject[]=[];
  subjectObs:Observable<Subject[]> = new Observable<Subject[]>();
   facultyOb:Observable<Faculty>=new Observable<Faculty>();
 
 

  constructor(private httpClientService:HttpFacultyClientService, private router:Router,private service:HttpSubjectClientService) { }

  ngOnInit(): void
   {
    this.subjectObs=this.service.getSubject();
    this.subjectObs.subscribe(data=>{
      this.subjects=data;
    });
  }

  onSubmit() 
  {
    this.submitted = true;
    this.faculty.subjectList = this.subjectArr;
    this.facultyOb =this.httpClientService.createFaculty(this.faculty);
    console.log(this.faculty);
    this.facultyOb.subscribe(data =>{
      console.log(data);
      alert("faculty Added Successfully.")
    })
    this.router.navigate(['/faculty/list']);
    setTimeout(()=>{
      location.reload();
    },500)
  }

  validate(event :Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

  counter(i:number){
    return new Array(i);
  }

  addToArray(){
    this.subjectArr[this.subjectArr.length] = this.subjects[this.tempIndex];
    console.log(this.subjects[this.tempIndex])
    this.subjectArr = this.unique()
  }

  removeFromArray(index:number){
  this.subjectArr = this.subjectArr.filter(obj => obj !== this.subjectArr[index]);

  }


  unique(){
    var unique: Subject[] =[];
    for(let i=0;i<this.subjectArr.length;i++){
      var current:Subject =this.subjectArr[i];
      if(unique.indexOf(current)<0){
          unique.push(current);
      }
    }
    return unique
  }
}


