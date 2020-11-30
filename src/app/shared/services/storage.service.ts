import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadCloudStorage(fileName: string, metadata: any) {
    return this.storage.upload(fileName, metadata);
  }

  public referenceCloudStorage(fileName: string) {
    return this.storage.ref(fileName);
  }
}
