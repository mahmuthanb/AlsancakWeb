import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService) { }

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
    this.username = this.f.username.value;
    this.password = this.f.password.value;
    this.authService.emailSignin(this.username, this.password);
    alert(this.username);
    alert(this.password);
    this.createLogin();
  }
}

