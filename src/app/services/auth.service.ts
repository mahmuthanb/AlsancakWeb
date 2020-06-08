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
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async emailSignin(email: string, password: string) {
    // const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    return await this.afAuth.signInWithEmailAndPassword(email, password).then(user => this.updateUserData(user.user));
    // return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate['/'];
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      username: user.username,
    }

    return userRef.set(data, { merge: true });

  }
}
