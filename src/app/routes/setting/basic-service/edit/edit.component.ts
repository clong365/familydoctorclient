import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

import { Service } from '../Service';

@Component({
  selector: 'app-setting-basic-service-edit',
  templateUrl: './edit.component.html',
})
export class SettingBasicServiceEditComponent implements OnInit {
  record: Service = new Service();
  i: Service;
  schema: SFSchema = {
    properties: {
      // id: { type: 'string', title: '编号' },
      name: { type: 'string', title: '名称', minLength: 3, maxLength: 20 },
      searchNo: { type: 'string', title: '检索码', minLength: 3, maxLength: 10 },
      serviceType: {
        type: 'string',
        title: '服务类型',
        enum: [
          { label: '基本诊疗', value: 'JI_BEN_ZHEN_LIAO' },
          { label: '公共服务', value: 'GONG_GONG_FU_WU' }
        ],
        default: 'JI_BEN_ZHEN_LIAO'
      },
      appraiseType: {
        type: 'string',
        title: '考核类型',
        enum: [
          { label: '手动考核', value: 'SHOU_DONG' },
          { label: '自动考核', value: 'ZI_DONG' },
          { label: '不考核', value: 'BU' },
        ],
        default: 'SHOU_DONG',
        description: '说明内容'
      },
      appraiseValue: { type: 'integer', title: '考核分值', minimum: 0, maximum: 100 },
      referencePrice: { type: 'number', title: '参考价格', minimum: 0, default: 100 },
      subsidyPrice: { type: 'number', title: '补助价格', minimum: 0, default: 100 },
      serviceCount: { type: 'integer', title: '服务次数', minimum: 0, default: 10 },
      canAppointment: { type: 'boolean', title: '可否预约' },
      order: { type: 'integer', title: '排序', minimum: 0 },
      status: {
        type: 'string',
        title: '状态',
        enum: [
          { label: '启用', value: 'QI_DONG' },
          { label: '停止', value: 'TING_ZHI' }
        ],
        default: 'QI_DONG'
      },
      desc: { type: 'string', title: '简介', maxLength: 200 }
    },
    required: ['name', 'serviceType', 'appraiseType'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      placeholder: '请输入服务名称',
      optional: '(说明)'
    },
    $searchNo: {
      placeholder: '请输入检索码',
      optionalHelp: '检索码说明内容,很长很长很长很长很长很长很长很长很长。'
    },
    $appraiseValue: {
      grid: { span: 6 },
      debug: true
    },
    $referencePrice: {
      prefix: '￥',
      grid: { span: 6 }
    },
    $subsidyPrice: {
      prefix: '￥',
      grid: { span: 6 }
    },
    $serviceCount: {
      unit: '次',
      grid: { span: 6 }
    },
    $canAppointment: {
      grid: { span: 6 }
    },
    $order: {
      grid: { span: 6 }
    },
    $status: {
      widget: 'radio',
      styleType: 'button',
      grid: { span: 12 }
    },
    $desc: {
      widget: 'textarea',
      autosize: { minRows: 2, maxRows: 6 },
      grid: { span: 24 },
      placeholder: '请输入简介内容，长度不超过200字。'
    },
  };

  constructor(
    private modal: NzModalRef,
    public http: _HttpClient,
    private msgSrv: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.record.id)
    this.http.get<Service>(`api/basic-services/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    if (this.record.id) {
      this.http.put<Service>(`api/basic-services/`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post<Service>(`api/basic-services/`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
