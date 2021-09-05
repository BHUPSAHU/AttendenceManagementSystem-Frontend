import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentCreateComponent } from './student/student-create/student-create.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentUpdateComponent } from './student/student-update/student-update.component';

const routes: Routes = [
  {path:"student/add" , component:StudentCreateComponent},
  {path:"student/list" , component:StudentListComponent},
  {path:"student/update/:id" , component:StudentUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
