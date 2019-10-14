import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    })
  }
  
  createUser(name: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          name: name,
          email: resp.user.email,
          uid: resp.user.uid
        }
        this.afDB.doc(`${user.uid}/info-usuario/`)
          .set(user)
          .then(() => this.router.navigate(['/dashboard']))
      })
      .catch(error => {
        Swal.fire('Error en la creación de usuario', error.message, 'error');
      })
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        Swal.fire('Error en el login', error.message, 'error');
      })
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (!fbUser) {
            this.router.navigate(['/login']);
          }

          return fbUser !== null;
        })
      );
  }

}
