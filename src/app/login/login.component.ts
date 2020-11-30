import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../router.animations';
import * as utils from '../shared';
import { AlertService, AuthService } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  statusLoading = false;
  activeLoginPanel: boolean = true;

  constructor(
    private translate: TranslateService,
    public router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

    this.form = this.fb.group({
      'email': ['', Validators.compose([Validators.required, utils.emailValidator])],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmit(values) {
    this.statusLoading = true;
    this.authService.signIn(values.email, values.password)
      .subscribe((res) => {
        this.statusLoading = false;
        this.router.navigate(['afiliation']);
      },
        error => {
          this.alertService.show('danger', error.message);
          this.statusLoading = false;
        });
  }

  clickResetPassword() {
    this.activeLoginPanel = !this.activeLoginPanel;
  }
}
