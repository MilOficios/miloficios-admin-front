import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';
import { Subscription, Subject } from 'rxjs';
import { AlertState } from './alert.state';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  show:boolean = false;
  type:string = '';
  message:string = '';

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  private subscription: Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.subscription = this.alertService.alertState$
    .subscribe((state: AlertState) => {
      this.show = state.show;
      this.type = state.type;
      this.message = state.message;
      if(this.show)
        this._success.next();
    })

    this._success.subscribe();
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.show = false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
