import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';
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
  courses:Course[]=[];
  course :Course=new Course(0,"","");
  courseOb:Observable<Course[]>=new Observable<Course[]>();

  subject :Subject = new Subject(0,"","","","",0,this.course);
  subjectOb : Observable<Subject> = new Observable<Subject>();
  sid:string =''
  descLen: number =0;
  constructor(private service:HttpSubjectClientService,private route: ActivatedRoute,private router:Router,private serviceCourse:HttpCourseClientService) { }

  ngOnInit(): void
   {
    this.courseOb=this.serviceCourse.getCourse();
    this.courseOb.subscribe(data=>{
      console.log(data)
      this.courses=data;
    });

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

    // this.subject.subjectCode=this.
    
    this.subjectOb =this.service.updateSubject(this.subject);
    console.log(this.subject);
    this.subjectOb.subscribe(data =>{
      alert("Subject Updated Successfully.")
    })
    this.router.navigate(['subject/list']);
  } 

  list(){
    this.router.navigate(['subject/list']);
  }

  validate(event :Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

  checkcount(){
    this.descLen = this.subject.description.length;
  }

  counter(i :number){
    return new Array(i);
  }
}
