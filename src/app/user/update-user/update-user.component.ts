import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Faculty } from 'src/app/models/faculty.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  uid!:string;
  id!:number;
  user!:User;
  updUser!:Observable<number>;
  faculty:Faculty=new Faculty(0,"","");
  submitted=false;
  constructor(private userService:UserService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
      this.uid=this.activatedRoute.snapshot.params['id'];
      this.id=Number.parseInt(this.uid);
      this.user=new User(0,"","","","","","",1,0,this.faculty);
      this.userService.getUserById(this.id).subscribe(data=>this.user=data,error=>console.log(error));

  }

  onSubmit(){
    this.submitted=true;
    this.updUser=this.userService.updateUser(this.user);
    this.updUser.subscribe(data=>alert("user got updated successfully"),error=>console.log(error));
    this.router.navigate(['user/list']);
  }

}
