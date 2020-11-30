import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModule } from 'src/app/shared';
import { LoaderModule } from 'src/app/shared';
import { NzDrawerModule, NzDropDownModule, NzIconModule, NzTableModule, NzToolTipModule, NzModalModule, NzPaginationModule, NzButtonModule, NzSelectModule } from 'ng-zorro-antd';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AfiliationRoutingModule } from './afiliation-routing.module';
import { ListAfiliationComponent } from './list-afiliation/list-afiliation.component';

@NgModule({
  imports: [
    CommonModule,
    AfiliationRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    ConfirmModule,
    LoaderModule,
    NzDrawerModule,
    NzDropDownModule,
    NzIconModule,
    NzTableModule,
    NzToolTipModule,
    NzModalModule,
    NzPaginationModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzBadgeModule
  ],
  declarations: [ListAfiliationComponent],
  providers: [DatePipe]
})
export class FacturaModule { }
