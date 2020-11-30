import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { from } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { UsuarioInterface } from '../models/usuario-interface';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  userData: any;
  usuarioDoc: UsuarioInterface;

  constructor(public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService
  ) {
    super();

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.usuarioService.get(this.userData.uid)
          .subscribe(e => {
            this.usuarioDoc = {
              id: e.payload.id,
              ...e.payload.data()
            } as UsuarioInterface;
            if (this.usuarioDoc.nivelAcceso === 'reclutador') {
              localStorage.setItem('userEsvr', JSON.stringify(this.usuarioDoc));
              this.empresaService.get(this.usuarioDoc.empresaId)
                .subscribe(e => {
                  const empresa = { id: e.payload.id, ...e.payload.data() };
                  localStorage.setItem('empEsvr', JSON.stringify(empresa));
                });
            } else {
              this.signOut();
            }
          });
      } else {
        this.removeLocalStoragedata();
      }
    });
  }

  signIn = (email, password): Observable<any> => {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.removeLocalStoragedata();
      this.router.navigate(['login']);
    });
  }

  removeLocalStoragedata() {
    localStorage.removeItem('user');
    localStorage.removeItem('userEsvr');
    localStorage.removeItem('empEsvr');
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        // this.router.navigate(['verify-email-address']);
      });
  }

  sendPasswordResetEmail(email) {
    return from(this.afAuth.auth.sendPasswordResetEmail(email))
  }

  confirmPasswordReset(code, password) {
    return from(this.afAuth.auth.confirmPasswordReset(code, password));
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null /*&& user.emailVerified !== false*/) ? true : false;
  }

  get userLoggedIn(): any {
    const user = JSON.parse(localStorage.getItem('userEsvr'));
    return user;
  }

  get empLoggedIn(): any {
    const emp = JSON.parse(localStorage.getItem('empEsvr'));
    return emp;
  }
}
