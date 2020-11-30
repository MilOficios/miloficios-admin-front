import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertState } from './alert.state';

@Injectable()
export class AlertService {

    private alertSubject = new Subject<AlertState>();

    alertState$ = this.alertSubject.asObservable();

    constructor() { }

    show(type:string, message:string) {
        this.alertSubject.next(<AlertState>{show: true, type: type, message: message});
    }

    hide() {
        this.alertSubject.next(<AlertState>{show: false, type: '', message: ''});
    }
}
