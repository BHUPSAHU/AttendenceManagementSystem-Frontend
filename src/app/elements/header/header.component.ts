import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user.model';
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
  user = {
    name :"Bhupesh Kumar Sahu",
    profilePic : "assets/images/Profile1.png",
    role : "admin"
  }



  constructor(private tokenStorageService: TokenStorageService,private userService:UserService) { }

  ngOnInit(): void {
    console.log("Entered app header");
    this.getUser();

  }
  getUser(){
    this.userLogged=this.tokenStorageService.getUser();
    this.obsUser=this.userService.getUserByEmail(this.userLogged.email);
    this.obsUser.subscribe(data=>this.userLogged=data,error=>console.log(error));
    console.log("user details fetch are " +this.userLogged);
    console.log(this.userLogged);


  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
