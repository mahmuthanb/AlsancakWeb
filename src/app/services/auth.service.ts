import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User;
  constructor(
    public  afAuth:  AngularFireAuth,
    public  router:  Router){
      this.afAuth.authState.subscribe(user => {
        if(user){
          this.user = user;
          localStorage.setItem('user',JSON.stringify(this.user));
        }else{
          localStorage.setItem('user',null);
        }
      })
    }
    async login(email:string,password:string){
      var result = await this.afAuth.signInWithEmailAndPassword(email,password);
      this.router.navigate(['/dashboard']);
    }
    async logout(){
      this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null) ? true : false;
    }
}
