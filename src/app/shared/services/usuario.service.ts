import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioInterface } from '../models';
import { Observable } from 'rxjs';
import * as constants from '../constants/constants';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private afs: AngularFirestore
  ) {
    this.usuarioCollection = this.afs.collection(constants.USUARIO_COLLECTION);
  }

  usuarioCollection: AngularFirestoreCollection<UsuarioInterface>;
  usuarios: Observable<UsuarioInterface[]>;
  usuarioDoc: AngularFirestoreDocument<UsuarioInterface>;

  get(id: string) {
    return this.afs.doc(`${constants.USUARIO_COLLECTION}/${id}`).snapshotChanges();
  }

  update(usuario: UsuarioInterface, id: string) {
    delete usuario.fechaCreacion;
    delete usuario.email;
    delete usuario.nivelAcceso;
    this.usuarioDoc = this.afs.doc(`${constants.USUARIO_COLLECTION}/${id}`);
    console.log('data update : ', {...usuario});
    this.usuarioDoc.update({...usuario});
  }
}
