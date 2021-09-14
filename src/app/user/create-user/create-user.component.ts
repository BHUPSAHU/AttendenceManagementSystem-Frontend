import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';
import { Faculty } from 'src/app/models/faculty';

// import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  facultyNumber!:number;
 
  faculty:Faculty= new Faculty(0,"","",0,[]);
  faculties:Faculty[] =[];
  user:User=new User(0,"","","","","","",0,0,this.faculty);
  obsuser!:Observable<number>;
  addUserForm : FormGroup = new FormGroup({});
  submitted=false;
  obsFaculty:Observable<Faculty[]> = new Observable<Faculty[]>();


  constructor(private userService:UserService,private router:Router,private facultyService:HttpFacultyClientService) { }

  ngOnInit(): void {  
    this.obsFaculty = this.facultyService.getFaculty();
    this.obsFaculty.subscribe(data =>{
      this.faculties = data;
    })


  } 

  // onCheck():boolean{

  // this.obsFaculty=  this.facultyService.getFacultyById(this.facultyNumber);
  // this.obsFaculty.subscribe(data=>this.faculty=data);
  // console.log("faculty fetched "+this.faculty);
  // if(this.faculty.userName==null){
  //   return false
  // }
  // return true
  // }

  onSubmit(){
    this.submitted=true;
    // if(this.onCheck()){
      // this.user.assignfaculty.faculityid=this.facultyNumber
      this.user.assignfaculty.facultyid =this.user.facultyId;
      this.user.profilePic ="assets/images/Profile13.png"
    this.obsuser=this.userService.addUser(this.user);
    console.log(this.user);
    this.obsuser.subscribe(data=>alert('user got created'),error=>console.log(error));
    this.router.navigate(['/user/list']);
    // }
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
    return ((d.getFullYear()-4)+"/"+d.getMonth()+"/"+d.getDate());
  }
}
