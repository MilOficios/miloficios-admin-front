import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AuthService, AfiliationService } from 'src/app/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-list-afiliation',
  templateUrl: './list-afiliation.component.html',
  styleUrls: ['./list-afiliation.component.scss'],
  animations: [routerTransition()]
})
export class ListAfiliationComponent implements OnInit {

  formFilter: FormGroup;
  afiliations: any[] = [];
  statusLoading = false;
  itemSelected: any = {};
  identifier = '';
  item: any = {};
  isVisibleModal = false;
  modalLoading = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private afiliationService: AfiliationService,
    private modalService: NzModalService,
    private httpClient: HttpClient
  ) {
    this.formFilter = this.fb.group({
      'status': ['', Validators.required]
    });
    this.formFilter.reset();
  }

  ngOnInit() {
    this.nzPageIndexChange();
    this.defaultValuesFormFilte();

  }

  defaultValuesFormFilte() {
    this.formFilter.controls['status'].setValue('P');
    this.formFilter.controls['status'].updateValueAndValidity();
  }

  filterApply() {
    this.nzPageIndexChange();
  }

  nzPageIndexChange() {
    this.statusLoading = true;

    this.afiliationService.gets().subscribe(afiliations => {
      this.setDataFilter(afiliations.docs);
    });
  }

  setDataFilter(afiliations: any[]) {
    if (afiliations) {
      this.afiliations = afiliations
        .map(f => {
          return { id: f.id, ...f.data() };
        });
      const snapshots = afiliations;
      this.statusLoading = false;
    }
  }

  clearFilter() {
    this.formFilter.reset();
    this.defaultValuesFormFilte();
    this.filterApply();
  }

  isVisibleClearFilter() {
    const statusResponse = this.formFilter.controls['status'].value;
    if (statusResponse && statusResponse !== '-1') {
      return true;
    }
    return false;
  }

  success(): void {
    this.modalService.success({
      nzTitle: 'Éxito',
      nzContent: '¡La operación se ha realizado satisfactoriamente!'
    });
  }

  error(message): void {
    this.modalService.error({
      nzTitle: 'Error!',
      nzContent: message
    });
  }

  dateDefine(item) {
    if (item.fechacreacion) {
      return this.datePipe.transform(item.fechacreacion.toDate(), "medium");
    }
    return "";
  }

  statusDefine(item) {
    let status = '';
    if (item && item.status) {
      if (item.status === 'P') {
        status = 'Pendiente';
      } else if (item.status === 'A') {
        status = 'Aprobada';
      } else if (item.status === 'R') {
        status = 'Rechazada';
      } else {
        status = 'Sin Definir';
      }
    }

    return status;
  }
  openModal(item) {
    this.item = item;
    this.isVisibleModal = true;
  }

  cancelModal() {
    this.isVisibleModal = false;
  }

  okModal() {
    this.isVisibleModal = false;
  }

  ageDefine(fecnac) {
    if (fecnac) {
      return this.calculate_age(fecnac.split('/')[1], fecnac.split('/')[0], fecnac.split('/')[2]);
    }

    return "";
  }

  calculate_age(birth_month, birth_day, birth_year) {
    let today_date = new Date();
    let today_year = today_date.getFullYear();
    let today_month = today_date.getMonth();
    let today_day = today_date.getDate();
    let age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
      age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
      age--;
    }
    return age;
  }

  downloadImage(imgUrl) {
    console.log(imgUrl);
    const imgName = "Adjunto";
    this.httpClient.get(imgUrl, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });

        // IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file);
          return;
        }

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = imgName;

        // Version link.click() to work at firefox
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));

        setTimeout(() => { // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }

}

