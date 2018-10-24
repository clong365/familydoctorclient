import { STColumnBadge, STColumnTag } from '@delon/abc';

export const STATUS_BADGE: STColumnBadge = {
  QI_DONG: { text: '启动', color: 'processing' },
  TING_ZHI: { text: '停止', color: 'default' },
};

export const SERVICE_TYPE_TAG: STColumnTag = {
  JI_BEN_ZHEN_LIAO: { text: '基本诊疗', color: 'green' },
  GONG_GONG_FU_WU: { text: '公共服务', color: 'blue' },
};

export const APPRAISE_TYPE_TAG: STColumnTag = {
  SHOU_DONG: { text: '手动考核', color: 'green' },
  ZI_DONG: { text: '自动考核', color: 'blue' },
  BU: { text: '不考核', color: 'orange' },
};
