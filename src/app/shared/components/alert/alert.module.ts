import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [CommonModule, RouterModule, NgbModule],
    declarations: [AlertComponent],
    exports: [AlertComponent],
    providers: [AlertService]
})
export class AlertModule {}
