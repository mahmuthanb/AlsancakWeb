import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { User } from '../shared/user/user.model';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) {}
  redirectURL: string;

  signupUser(user: User) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .catch(function (error) {
          console.log(error);
        });
  }

  signinUser(user: User) {
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
          .catch(function (error) {
              console.log(error);
          });
  }
  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    var user = this.afAuth.currentUser;
      if(user){
          return true;
      } else {
          return false
      }
  }
}
