import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Faculty } from 'src/app/models/faculty';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user.model';
import { HttpFacultyClientService } from 'src/app/services/http-faculty-client.service';
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
  facultyList:Faculty[]= [];  
  course:Course=new Course(0,"","");
  subject:Subject=new Subject(0,"","","","",0,this.course);
  faculty:Faculty=new Faculty(0,"","",0,[])
  submitted=false;
  obsFaculty:Observable<Faculty[]> = new Observable<Faculty[]>();
  faculties:Faculty[]=[];
  constructor(private userService:UserService,private router:Router,private activatedRoute:ActivatedRoute,private facultyService:HttpFacultyClientService) { }

  ngOnInit(): void {
      this.uid=this.activatedRoute.snapshot.params['id'];
      this.id=Number.parseInt(this.uid);
      this.user=new User(0,"","","","","","",1,0,this.faculty);
      this.userService.getUserById(this.id).subscribe(data=>this.user=data,error=>console.log(error));
     
      this.obsFaculty = this.facultyService.getFaculty();
      this.obsFaculty.subscribe(data =>{
        this.faculties = data;
      })
  }

  onSubmit(){
    this.submitted=true;
    this.updUser=this.userService.updateUser(this.user);
    this.updUser.subscribe(data=>alert("user got updated successfully"),error=>console.log(error));
    this.router.navigate(['user/list']);
    setTimeout(()=>{
      location.reload();
    },500)
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
