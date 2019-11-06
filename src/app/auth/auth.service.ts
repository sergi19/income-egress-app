import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActiveLoadingAction, DeactiveLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/info-usuario`).valueChanges()
        .subscribe((userObj: any) => {
            const newUser = new User(userObj);
            this.store.dispatch(new SetUserAction(newUser));
          });
      } else {
        this.userSubscription.unsubscribe();
      }
    })
  }
  
  createUser(name: string, email: string, password: string) {
    this.store.dispatch(new ActiveLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          name: name,
          email: resp.user.email,
          uid: resp.user.uid
        }
        this.afDB.doc(`${user.uid}/info-usuario/`)
        .set(user)
        .then(() => {
          this.store.dispatch(new DeactiveLoadingAction());
          this.router.navigate(['/dashboard'])
        });
      })
      .catch(error => {
        this.store.dispatch(new DeactiveLoadingAction());
        Swal.fire('Error en la creación de usuario', error.message, 'error');
      })
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActiveLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new DeactiveLoadingAction());
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        this.store.dispatch(new DeactiveLoadingAction());
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
