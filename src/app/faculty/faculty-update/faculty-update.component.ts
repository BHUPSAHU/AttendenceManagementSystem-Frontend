import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Faculty } from 'src/app/models/faculty';
import { Subject } from 'src/app/models/subject';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';
import { HttpSubjectClientService } from 'src/app/services/http-subject-client.service';

@Component({
  selector: 'app-faculty-update',
  templateUrl: './faculty-update.component.html',
  styleUrls: ['./faculty-update.component.css']
})
export class FacultyUpdateComponent implements OnInit {
  tempIndex:number=0;
  temp!:Subject;
  subjectArr:Subject[]=[];
  id:number = 0 ;
submitted:boolean =false;
course:Course=new Course(0,"","");
subject:Subject=new Subject(0,"","","","",0,this.course);
faculty:Faculty=new Faculty(0,"","",0,[]);
facultyObs : Observable<Faculty> = new Observable<Faculty>();
subjects:Subject[]=[];
subjectObs:Observable<Subject[]> = new Observable<Subject[]>();
sid:string =''
  //subject: string;
  constructor(private httpClientService:HttpFacultyClientService,private service:HttpSubjectClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.subjectObs=this.service.getSubject();
    this.subjectObs.subscribe(data=>{
      this.subjects=data;
    });

    this.httpClientService.getFacultyById(this.id).subscribe(data =>{
      this.faculty=data;
      this.subjectArr= data.subjectList;
    },error => console.log(error));
  }

  onSubmit() {
    console.log("update")
    this.submitted = true;
    this.faculty.subjectList = this.subjectArr;
    this.facultyObs =this.httpClientService.updateFaculty(this.faculty);
    this.facultyObs.subscribe(data =>{
      alert("Faculty Updated Successfully.")
    })
    this.router.navigate(['faculty/list']);
  } 

  list(){
    this.router.navigate(['faculty/list']);
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
