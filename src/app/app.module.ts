import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentCreateComponent } from './student/student-create/student-create.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentUpdateComponent } from './student/student-update/student-update.component';
import { HeaderComponent } from './elements/header/header.component';
import { FooterComponent } from './elements/footer/footer.component';
import { MidBodyComponent } from './elements/mid-body/mid-body.component';
import { SubMenuComponent } from './elements/sub-menu/sub-menu.component';
import { FacultyCreateComponent } from './faculty/faculty-create/faculty-create.component';
import { FacultyListComponent } from './faculty/faculty-list/faculty-list.component';
import { FacultyUpdateComponent } from './faculty/faculty-update/faculty-update.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { SubjectCreateComponent } from './subject/subject-create/subject-create.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { SubjectUpdateComponent } from './subject/subject-update/subject-update.component';
import { CourseCreateComponent } from './course/course-create/course-create.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseUpdateComponent } from './course/course-update/course-update.component';
import { AttendanceCreateComponent } from './attendance/attendance-create/attendance-create.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { AttendanceUpdateComponent } from './attendance/attendance-update/attendance-update.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CookieService } from 'ngx-cookie-service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MainLoginComponent } from './elements/main-login/main-login.component';




@NgModule({
  declarations: [
    AppComponent,
    StudentCreateComponent,
    StudentListComponent,
    StudentUpdateComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserListComponent,
    HeaderComponent,
    FooterComponent,
    MidBodyComponent,
    SubMenuComponent,
    FacultyCreateComponent,
    FacultyListComponent,
    FacultyUpdateComponent    ,
    SubjectCreateComponent,
    SubjectListComponent,
    SubjectUpdateComponent,
    CourseCreateComponent,
    CourseListComponent,
    CourseUpdateComponent,
    AttendanceCreateComponent,
    AttendanceListComponent,
    AttendanceUpdateComponent,
    StudentLoginComponent,
    StudentProfileComponent,
    UserProfileComponent,
    MainLoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
