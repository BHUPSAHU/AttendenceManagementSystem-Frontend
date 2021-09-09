import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyCreateComponent } from './faculty/faculty-create/faculty-create.component';
import { FacultyListComponent } from './faculty/faculty-list/faculty-list.component';
import { FacultyUpdateComponent } from './faculty/faculty-update/faculty-update.component';
import { StudentCreateComponent } from './student/student-create/student-create.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentUpdateComponent } from './student/student-update/student-update.component';

const routes: Routes = [
  {path:"student/add" , component:StudentCreateComponent},
  {path:"student/list" , component:StudentListComponent},
  {path:"student/update/:id" , component:StudentUpdateComponent},

  {path:"faculty/add" , component:FacultyCreateComponent},
  {path:"faculty/list" , component:FacultyListComponent},
  {path:"faculty/update/:id" , component:FacultyUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
