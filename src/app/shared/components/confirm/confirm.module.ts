import { NgModule } from '@angular/core';
import { ConfirmService, ConfirmState, ConfirmTemplateDirective, ConfirmModalComponent } from './confirm-modal-and-service';


@NgModule({
    imports: [],
    declarations: [ConfirmTemplateDirective, ConfirmModalComponent],
    exports: [ConfirmTemplateDirective, ConfirmModalComponent],
    providers: [ConfirmService, ConfirmState]
})
export class ConfirmModule {}
