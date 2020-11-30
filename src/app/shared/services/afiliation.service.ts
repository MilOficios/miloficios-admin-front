import { Injectable, NgZone } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import * as constants from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AfiliationService extends BaseService {

  constructor(
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public authService: AuthService
  ) {
    super();
  }

  gets() {
    const sessionEmp = this.authService.empLoggedIn;
    return this.afs.collection(constants.AFILIATION_COLLECTION, ref => {
      let query: any = ref;
      query = query.orderBy('fechacreacion', 'desc');
      return query;
    }).get()
  }

}
