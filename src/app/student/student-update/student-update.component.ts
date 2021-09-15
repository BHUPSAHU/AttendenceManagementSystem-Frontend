import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { HttpCourseClientService } from 'src/app/services/http-course-client.service';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  courses:Course[]=[];
  course:Course=new Course(0,"","");
  courseOb:Observable<Course[]>=new Observable<Course[]>();
id:number = 0 ;
submitted:boolean =false;
student:Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");
studentObs : Observable<Student> = new Observable<Student>();
sid:string =''
  constructor(private serviceCourse:HttpCourseClientService,private httpClientService:HttpStudentClientService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.courseOb=this.serviceCourse.getCourse();
    this.courseOb.subscribe(data=>{
      console.log(data)
      this.courses=data;
    });
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
    if(this.student.gender == "male"){
      this.student.profilePic ="assets/images/Profile6.png"
    }else{
      this.student.profilePic ="assets/images/Profile11.png"
    }
    this.studentObs.subscribe(data =>{
      alert("Student Updated Successfully.")
    })
    this.router.navigate(['student/list']);
    setTimeout(()=>{
      location.reload();
    },500)
  } 

  list(){
    this.router.navigate(['student/list']);
  }

  validate(event :Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }
  getDate(){
    let d = new Date();
    return (d.getDate()+"/"+d.getMonth()+"/"+(d.getFullYear()-4));
  }
}

