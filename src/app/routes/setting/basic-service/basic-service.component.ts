import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData, XlsxService, STExportOptions } from '@delon/abc';
import { SFSchema, SFUISchema } from '@delon/form';

import { SettingBasicServiceEditComponent } from './edit/edit.component';
import { SettingBasicServiceViewComponent } from './view/view.component';

import { STATUS_BADGE, SERVICE_TYPE_TAG, APPRAISE_TYPE_TAG } from './const';

@Component({
  selector: 'app-setting-basic-service',
  templateUrl: './basic-service.component.html',
})
export class SettingBasicServiceComponent implements OnInit {
  url = `api/basic-services/search`;
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '名称',
      },
      searchNo: {
        type: 'string',
        title: '检索码'
      },
      serviceType: {
        type: 'string',
        title: '服务类型',
        enum: [
          { label: '全部', value: 'ALL' },
          { label: '基本诊疗', value: 'JI_BEN_ZHEN_LIAO' },
          { label: '公共服务', value: 'GONG_GONG_FU_WU' }
        ],
        default: 'ALL',
      },
      appraiseType: {
        type: 'string',
        title: '考核类型',
        enum: [
          { label: '全部', value: 'ALL' },
          { label: '手动考核', value: 'SHOU_DONG' },
          { label: '自动考核', value: 'ZI_DONG' },
          { label: '不考核', value: 'BU' },
        ],
        default: 'ALL',
      },
      status: {
        type: 'string',
        title: '状态',
        enum: [
          { label: '全部', value: 'ALL' },
          { label: '启用', value: 'QI_DONG' },
          { label: '停用', value: 'TING_ZHI' },
        ],
        default: 'ALL',
      }
    }
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 80,
      grid: { span: 6 },
    },

  };

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '选择',
      index: 'id',
      type: 'checkbox',
      selections: [
        {
          text: '启动',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status === 'QI_DONG')),
        },
        {
          text: '停止',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status === 'TING_ZHI')),
        },
      ],
    },
    // { title: '编号', index: 'id' },
    { title: '名称', index: 'name' },
    { title: '检索码', index: 'searchNo' },
    { title: '服务类型', type: 'tag', tag: SERVICE_TYPE_TAG, index: 'serviceType',
      filter: {
        menus: [
          { text: '基本诊疗', value: 'JI_BEN_ZHEN_LIAO' },
          { text: '公共服务', value: 'GONG_GONG_FU_WU' },
        ],
      },
    },
    { title: '考核类型', type: 'tag', tag: APPRAISE_TYPE_TAG, index: 'appraiseType',
      filter: {
        menus: [
          { text: '手动考核', value: 'SHOU_DONG' },
          { text: '自动考核', value: 'ZI_DONG' },
          { text: '不考核', value: 'BU' },
        ],
      },
    },
    { title: '考核分值', type: 'number', index: 'appraiseValue', sort: { reName: { ascend: 'asc', descend: 'desc' }} },
    { title: '可否预约', type: 'yn', index: 'canAppointment' },
    { title: '参考价格', type: 'currency', index: 'referencePrice', sort: true },
    { title: '状态', type: 'badge', badge: STATUS_BADGE, index: 'status',
      filter: {
        menus: [
          { text: '启动', value: 'QI_DONG' },
          { text: '停止', value: 'TING_ZHI' },
        ],
      },
    },
    // { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    // { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '查看', type: 'static', component: SettingBasicServiceViewComponent, click: 'reload' },
        { text: '编辑', type: 'static', component: SettingBasicServiceEditComponent, click: 'reload' },
        { text: '启用', click: (item: any) => console.log(item), iif: (item: any) => item.status === 'TING_ZHI' },
        { text: '停用', click: (item: any) => console.log(item), iif: (item: any) => item.status === 'QI_DONG' },
      ]
    }
  ];

  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private xlsx: XlsxService) { }

  ngOnInit() { }

  checkboxChange(list: STData[]) {
    this.selectedRows = list;
  }

  add() {
    this.modal
      .createStatic(SettingBasicServiceEditComponent, { i: { id: null } })
      .subscribe(() => this.st.reload());
  }

  enable() {
    this.msgSrv.success(`启用了 ${this.selectedRows.length} 服务`);
  }

  disable() {
    this.msgSrv.success(`停用了 ${this.selectedRows.length} 服务`);
  }

  download() {
    const data = [this.columns.map(i => i.title)];
    this.st._data.forEach(i =>
      data.push(this.columns.map(c => i[c.index as string])),
    );
    /* const opt: STExportOptions = {
      filename: '基础服务.xlsx',
    };
    this.st.export(data, opt); */
    this.xlsx.export({
      filename: '基础服务.xlsx',
      sheets: [
        {
          data: data,
          name: 'sheet name',
        },
      ],
    });
  }

}
