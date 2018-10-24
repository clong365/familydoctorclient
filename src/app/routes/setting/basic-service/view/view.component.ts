import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

import { STATUS_BADGE, SERVICE_TYPE_TAG, APPRAISE_TYPE_TAG } from '../const';
import { Service } from '../Service';

@Component({
  selector: 'app-setting-basic-service-view',
  templateUrl: './view.component.html',
})
export class SettingBasicServiceViewComponent implements OnInit {
  record: Service = new Service();
  i: Service;

  STATUS_BADGE = STATUS_BADGE;
  SERVICE_TYPE_TAG = SERVICE_TYPE_TAG;
  APPRAISE_TYPE_TAG = APPRAISE_TYPE_TAG;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<Service>(`api/basic-services/${this.record.id}`).subscribe(res => this.i = res);
  }

  close() {
    this.modal.destroy();
  }
}
