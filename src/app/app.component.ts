import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AttendanceManagement';
  logStatus!:string ;
  constructor(private cookieService: CookieService){
    
  }
  ngOnInit(): void {
    this.logStatus = sessionStorage.getItem('logStatus') || 'false';
  }

  getUserType(){
    return sessionStorage.getItem('userType');
  }
}
