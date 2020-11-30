import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule, ConfirmModule } from '../shared';
import { LoaderModule } from '../shared';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ResetPasswordRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    AlertModule,
    LoaderModule,
    ConfirmModule
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
