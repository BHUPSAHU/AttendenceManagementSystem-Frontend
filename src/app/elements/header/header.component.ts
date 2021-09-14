import { HttpUserEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user.model';
import { HttpStudentClientService } from 'src/app/services/http-student-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  optionToggle = false;
  logStatus!:string;

  constructor(private studentService:HttpStudentClientService, private userService:UserService ) { }

  ngOnInit(): void {
    this.logStatus = sessionStorage.getItem('logStatus') || 'false';
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
  }
}
