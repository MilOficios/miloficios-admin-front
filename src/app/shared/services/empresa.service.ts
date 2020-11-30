import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { EmpresaInterface } from '../models/empresa-interface';
import { Observable } from 'rxjs';
import * as constants from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresasCollection: AngularFirestoreCollection<EmpresaInterface>;
  empresas: Observable<EmpresaInterface[]>;
  empresaDoc: AngularFirestoreDocument<EmpresaInterface>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.empresasCollection = this.afs.collection(constants.EMPRESA_COLLECTION);
  }

  get(id: string) {
    return this.afs.doc(`${constants.EMPRESA_COLLECTION}/${id}`).snapshotChanges();
  }

  update(empresa: EmpresaInterface, id: string) {
    delete empresa.fechaCreacion;
    this.empresaDoc = this.afs.doc(`${constants.EMPRESA_COLLECTION}/${id}`);
    this.empresaDoc.update({...empresa});
  }
}
