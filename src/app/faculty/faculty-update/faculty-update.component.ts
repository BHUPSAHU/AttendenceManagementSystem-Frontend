import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Faculty } from 'src/app/models/faculty';
import { Subject } from 'src/app/models/subject';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';

@Component({
  selector: 'app-faculty-update',
  templateUrl: './faculty-update.component.html',
  styleUrls: ['./faculty-update.component.css']
})
export class FacultyUpdateComponent implements OnInit {

  id:number = 0 ;
submitted:boolean =false;
course:Course=new Course(0,"","");
subject:Subject=new Subject(0,"","","","",0,this.course);
faculty:Faculty=new Faculty(0,"","",0,[]);
facultyObs : Observable<Faculty> = new Observable<Faculty>();
sid:string =''
  //subject: string;
  constructor(private httpClientService:HttpFacultyClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);


    this.httpClientService.getFacultyById(this.id).subscribe(data =>{
      this.faculty=data;
    },error => console.log(error));
  }

  onSubmit() {
    console.log("update")
    this.submitted = true;
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

}
