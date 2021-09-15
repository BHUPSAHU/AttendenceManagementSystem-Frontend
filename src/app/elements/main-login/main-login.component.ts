import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Faculty } from 'src/app/models/faculty';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
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

  user!:User;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private userService:UserService,private httpClientService:HttpStudentClientService,private cookieService: CookieService,private router:Router) { 

  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      
    }
  }


  onUserSubmit(){
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['home']);
        sessionStorage.setItem('logStatus', 'true');
        sessionStorage.setItem('userType',"user");
        setTimeout(()=>{
          location.reload();
        },1000)
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
}

  getAuthUser(){
    return sessionStorage.getItem('auth-user');
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
  
  }
  
  onForgot():void{
    console.log("on forgot ent")
    this.router.navigate(['/forgot']);
  }

}
