import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  username : String;
  password : String;
  heading = AppComponent.heading;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLogin();
  }

  createLogin() {
    this.formLogin = this.formBuilder.group({
      username: ['mahmuthanb@gmail.com', Validators.required],
      password: ['19011993', Validators.required],
    });
  }
  get f() {
    return this.formLogin.controls;
  }

  checkLogin() {
    this.authService.login(this.f.username.value,this.f.password.value);
  }
}

