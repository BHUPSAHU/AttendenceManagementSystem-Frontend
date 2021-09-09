import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentCreateComponent } from './student/student-create/student-create.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentUpdateComponent } from './student/student-update/student-update.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {path:"student/add" , component:StudentCreateComponent},
  {path:"student/list" , component:StudentListComponent},
  {path:"student/update/:id" , component:StudentUpdateComponent},
  { path:'',redirectTo:'user/list',pathMatch:'full'},
  { path:'user/create', component: CreateUserComponent},
  { path: 'user/update/:id' , component:UpdateUserComponent},
  { path:'user/list',component:UserListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
