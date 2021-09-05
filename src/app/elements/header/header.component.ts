import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  optionToggle = false;

  user = {
    name :"Bhupesh Kumar Sahu",
    profilePic : "assets/images/Profile1.png",
    role : "admin"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
