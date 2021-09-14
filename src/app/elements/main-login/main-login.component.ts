import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Faculty } from 'src/app/models/faculty';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user.model';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {
  students:Student[]=[];
  student !:Student ;
  studentsObs:Observable<Student> = new Observable<Student>();
  studentsListObs:Observable<Student[]> = new Observable<Student[]>();
  tempStudentRollno !:number;
  tempStudentDob !: Date;
  tempStudent:Student = new Student(0,0,"","",new Date,"","",0,"","","","","","");


  tempUserMobile!:string;
  faculty:Faculty= new Faculty(0,"","",0,[]);
  tempUser : User = new User(0,"","","","","","",0,0,this.faculty);
  tempUserPassword:string = "";
  userObs : Observable<User> = new Observable<User>();
  constructor(private userService:UserService,private httpClientService:HttpStudentClientService,private cookieService: CookieService,private router:Router) { 

  }

  ngOnInit(): void {
  }


  onUserSubmit(){
 









    this.router.navigate(['user/list']);
    sessionStorage.setItem('logStatus', 'true');
    sessionStorage.setItem('userType',"user");

    setTimeout(()=>{
      location.reload();
    },1000)
  }

  onStudentSubmit(){
    this.tempStudent.rollNo =this.tempStudentRollno;
    this.tempStudent.dob = this.tempStudentDob; 
    this.studentsObs = this.httpClientService.getStudentRoll(this.tempStudent.rollNo);
    this.studentsObs.subscribe(data =>{
      this.student = data;
      if(this.student.dob == this.tempStudent.dob){
        sessionStorage.setItem('logStatus', 'true');
        this.router.navigate(['student/profile',this.student.studentId]);
        sessionStorage.setItem('userType',"student");
        sessionStorage.setItem('userId', this.student.studentId.toString());
        sessionStorage.setItem('userName', this.student.name.toString());
        sessionStorage.setItem('userProfilePic', this.student.profilePic.toString());
        setTimeout(()=>{
          location.reload();
        },1000)
      }
      else{
        alert("Invalid Student Credentials");
        location.reload();
      }
    })
    console.log("temp",this.tempStudent.dob);
    console.log("ori",this.student.dob);
    // location.reload();
    // if(this.student.dob == this.tempStudent.dob){
    //   sessionStorage.setItem('logStatus', 'true');
    //   this.router.navigate(['student/profile',this.student.studentId]);
      
    // }
    // else{
    //   alert("Invalid Student Credentials");
    //   location.reload();
    // }
    




  }

}
