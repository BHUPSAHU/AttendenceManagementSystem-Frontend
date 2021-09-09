import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:User[]=[];
  delUserObs:Observable<number>=new Observable<number>();
  constructor(private userservice:UserService,private router:Router) { }

  obsuser!:Observable<User[]>;

  ngOnInit(): void {
    this.obsuser=this.userservice.getuserList();
    this.obsuser.subscribe(data=>this.users=data);

  }

  getUserList():void{
    this.obsuser=this.userservice.getuserList();
    this.obsuser.subscribe(data=>this.users=data,error=>console.log(error));
  }

  deleteUser(eid:number):void{
    console.log('delete method');
    this.delUserObs=this.userservice.deleteUser(eid);
 
    location.reload();
    this.users=[];
    this.delUserObs.subscribe(()=>{
    //  this.obsuser= 
    alert('User got Deleted')
     this.userservice.getuserList()
    });
    // this.obsuser.subscribe(data=>this.users=data,error=>console.log(error));
  
  }

  updateUser(eid:number):void{
    this.router.navigate(['user/update',eid]);
  }


}
