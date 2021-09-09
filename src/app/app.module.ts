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
import { AttendanceCreateComponent } from './attendance/attendance-create/attendance-create.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { AttendanceUpdateComponent } from './attendance/attendance-update/attendance-update.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentCreateComponent,
    StudentListComponent,
    StudentUpdateComponent,
    HeaderComponent,
    FooterComponent,
    MidBodyComponent,
    SubMenuComponent,
    AttendanceCreateComponent,
    AttendanceListComponent,
    AttendanceUpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
