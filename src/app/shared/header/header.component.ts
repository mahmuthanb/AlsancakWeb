import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string;
  username: string;

  constructor(public authService:AuthService) {
  }
  
  ngOnInit(): void {
    this.title = AppComponent.title;
  }

  logOut(){
    this.authService.logout();
  }

}
