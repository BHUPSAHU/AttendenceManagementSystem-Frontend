import { HttpUserEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user.model';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  optionToggle = false;
  obsUser!:Observable<User>;
  userLogged!:User;
  logStatus!:string;



  constructor(private tokenStorageService: TokenStorageService,private userService:UserService,private studentService:HttpStudentClientService,private router:Router) { }

  ngOnInit(): void {
    console.log("Entered app header");
    if(this.getUserType() == 'user'){
      this.getUser();
    }
   
    this.logStatus = sessionStorage.getItem('logStatus') || 'false';
  }
  getUser(){
    this.userLogged=this.tokenStorageService.getUser();
    this.obsUser=this.userService.getUserByEmail(this.userLogged.email);
    this.obsUser.subscribe(data=>{
      this.userLogged=data;
      sessionStorage.setItem('userId', `${this.userLogged.userId}`);
      sessionStorage.setItem('userName', this.userLogged.firstName);
      sessionStorage.setItem('userProfilePic', this.userLogged.profilePic);
      if(this.userLogged.roleType ==1){
        sessionStorage.setItem('userRole','admin')
      }
      else if(this.userLogged.roleType ==2){
        sessionStorage.setItem('userRole','faculty')
      }
      
    },error=>console.log(error));
    console.log("user details fetch are " +this.userLogged);
    console.log(this.userLogged);


  }

  getUserId(){
    return sessionStorage.getItem('userId');
  }

  getProfilePic(){
    return sessionStorage.getItem('userProfilePic');
  }

  getUserType(){
    return sessionStorage.getItem('userType');
  }

  getName(){
    return sessionStorage.getItem('userName');
  }
  logout(){
    sessionStorage.clear();
    setTimeout(()=>{
      location.reload();
    },500);
  }

  viewProfile(){
    var id = this.userLogged.userId;
    console.log("User=>",id)
    this.router.navigate(['user/profile',id]);
 
  }
}
