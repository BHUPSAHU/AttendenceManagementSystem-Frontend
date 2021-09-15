import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Faculty } from 'src/app/models/faculty';
import { Course } from 'src/app/models/course';
import { Subject } from 'src/app/models/subject';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  facultyNumber!:number;
  form: any = {
    username: null,
    password: null,
    email:null
  };
  userRole!:string;
  facultyList:Faculty[]= [];
  course:Course=new Course(0,"","");
  subject:Subject=new Subject(0,"","","","",0,this.course);
  faculty:Faculty=new Faculty(0,"","",0,[])
  subjects:Subject[]=[];
  
  
  user:User=new User(0,"","","","","","",0,0,this.faculty);
  obsuser!:Observable<number>;
  addUserForm : FormGroup = new FormGroup({});
  submitted=false;
  // obsFaculty!:Observable<Faculty[]>;
  obsFaculty:Observable<Faculty[]> = new Observable<Faculty[]>();
  faculties:Faculty[]=[];

  constructor(private userService:UserService,private router:Router,private facultyService:HttpFacultyClientService,private authService:AuthService) { }

  ngOnInit(): void {  
    this.obsFaculty= this.facultyService.getFaculty();
      this.obsFaculty.subscribe((data)=>this.facultyList=data,error=>console.log(error));

      console.log(this.faculty);
      this.obsFaculty = this.facultyService.getFaculty();
      this.obsFaculty.subscribe(data =>{
        this.faculties = data;
      })
  } 


  onSubmit(){
    this.submitted=true;
    const { username, password,email } = this.form;
    console.log(username);
    console.log(password);
    console.log(email);
    if(this.user.roleType==1){
      this.userRole="admin"
    }else{
      this.userRole="faculty"
    }

    this.authService.register(username,email,password);
      this.user.assignfaculty.facultyid =this.user.facultyId;  
      this.user.email=email;
      this.user.profilePic ="assets/images/Profile13.png"
    this.obsuser=this.userService.addUser(this.user);
    console.log(this.user);
    // alert('above user got created');
    this.obsuser.subscribe(data=>{
      alert('user got created');
      console.log("added");
  });
    this.router.navigate(['/user/list']);
    setTimeout(()=>{
      location.reload()
    },500);
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
