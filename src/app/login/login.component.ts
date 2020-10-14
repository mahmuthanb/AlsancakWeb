import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  username : string;
  password : string;
  heading = AppComponent.heading;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLogin();
  }

  createLogin() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.formLogin.controls;
  }

  checkLogin() {
    this.user.email = this.f.username.value;
    this.user.password = this.f.password.value;
    this.authService.signinUser(this.user);
    
  }
}

