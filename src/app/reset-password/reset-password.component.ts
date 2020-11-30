import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../router.animations';
import * as utils from '../shared';
import { AlertService, AuthService } from '../shared';
import { ConfirmService } from '../shared/components/confirm/confirm-modal-and-service';

@Component({
  selector: 'app-login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [routerTransition()]
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  statusLoading = false;
  mode: String;
  code: String;

  constructor(
    private translate: TranslateService,
    public router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private confirmService: ConfirmService
  ) {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

    this.form = this.fb.group({
      'password': ['', Validators.required],
      'passwordConfirm': ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    this.mode = this.route.snapshot.queryParams['mode'];
    this.code = this.route.snapshot.queryParams['oobCode'];
  }

  ngOnInit() {

  }


  onSubmit(values) {
    this.confirmService.confirm({ title: 'Confirmación', message: '¿Está seguro de realizar esta acción?' }).then(
      () => {
        this.statusLoading = true;
        this.authService.confirmPasswordReset(this.code, values.password)
          .subscribe((res) => {
            this.statusLoading = false;
            this.router.navigate(['login']);
          },
            error => {
              this.alertService.show('danger', error.message);
              this.statusLoading = false;
            });
      },
      () => {

      });

  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['passwordConfirm'].value ? null : { 'mismatch': true };
  }
}
