import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceCreateComponent } from './attendance/attendance-create/attendance-create.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { AttendanceUpdateComponent } from './attendance/attendance-update/attendance-update.component';

import { StudentCreateComponent } from './student/student-create/student-create.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentUpdateComponent } from './student/student-update/student-update.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { SubjectByIdComponent } from './subject/subject-by-id/subject-by-id.component';
import { SubjectCreateComponent } from './subject/subject-create/subject-create.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { SubjectUpdateComponent } from './subject/subject-update/subject-update.component';

import { CourseCreateComponent } from './course/course-create/course-create.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseUpdateComponent } from './course/course-update/course-update.component';

const routes: Routes = [
  {path:"student/add" , component:StudentCreateComponent},
  {path:"student/list" , component:StudentListComponent},
  {path:"student/update/:id" , component:StudentUpdateComponent},
  { path:'',redirectTo:'user/list',pathMatch:'full'},
  { path:'user/create', component: CreateUserComponent},
  { path: 'user/update/:id' , component:UpdateUserComponent},
  { path:'user/list',component:UserListComponent},
  {path:"subject/add",component:SubjectCreateComponent},
  {path:"subject/list",component:SubjectListComponent},
  {path:"subject/update/:id",component:SubjectUpdateComponent},
  {path:"subject/get/:id",component:SubjectByIdComponent},
  {path:"attendance/add" , component:AttendanceCreateComponent},
  {path:"attendance/list" , component:AttendanceListComponent},
  {path:"attendance/update/:id" , component:AttendanceUpdateComponent},
  {path:"course/add" , component:CourseCreateComponent},
  {path:"course/list" , component:CourseListComponent},
  {path:"course/update/:id" , component:CourseUpdateComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
