import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/models/faculty';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 sid:string ='';
 id :number =0;
 role:string="";
 faculty:Faculty= new Faculty(0,"","",0,[]);
 user:User=new User(0,"","","","","","",0,0,this.faculty);
  constructor(private route: ActivatedRoute,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.id = Number.parseInt(this.sid);
    this.user =new User(this.id,"","","","","","",0,0,this.faculty);
    this.userService.getUserById(this.id).subscribe(data =>{
      console.log(data);
      this.user=data;
      if(data.roleType = 2){
        this.role = "Faculty";
      }else{
        this.role = "Admin";
      }
    },error => console.log(error));
 
  }

}
