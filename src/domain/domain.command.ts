export const websocket = {
  static: {
    endpoint: socketServer,
    path: {
      subMsg: '/user/topic/subNewMsg',
    },
  },
};

export const api = {
  endpoint: apiBaseUrl,
  path: {
    /***************home************************/
    //home
    workspace: (workId?: string) =>
      workId && workId != '' ? `/workspace/${workId}` : '/workspace',

    /***************Application************************/
    base: (baseId?: string) =>
      baseId && baseId != '' ? `/base/${baseId}` : '/base',
    copyBase: (baseId: string) => `/base/${baseId}/copy`,
    moveBase: (baseId: string) => `/base/${baseId}/move`,
    //通过上传文件创建base
    uploadBase: '/upload/base',

    /***************Account************************/
    login: `/account/login`, //登录
    logout: `/account/logout`, //注销
    /***************Account************************/
    userInfo: '/user/info',

    /***************table************************/
    table: (tableId?: string) =>
      tableId && tableId != '' ? `/table/${tableId}` : '/table',
    //通过上传文件创建table
    uploadTable: '/upload/table',

    /***************view************************/
    view: (viewId?: string) => `/view${viewId && `/${viewId}`}`,
    listTable: '/table',
    getViewOfTable: (tableId: string, viewId: string) =>
      `/table/${tableId}/view/${viewId}`,
    getTableOfId: (tableId: string) => `/table/${tableId}`,
  },
};

//workspace
export const READWORKSPACELIST = 'READWORKSPACELIST';
export const CREATWORKSPACE = 'CREATWORKSPACE';
export const EDITWORKSPACE = 'EDITWORKSPACE';
export const DELETEWORKSPACE = 'DELETEWORKSPACE';

//base
export const CREATBASE = 'CREATBASE';
export const READBASE = 'READBASEBYID';
export const CREATBASEBYFILE = 'CREATBASEBYFILE';
export const EDITBASE = 'EDITBASE';
export const DUPLIACTEBASE = 'DUPLIACTEBASE';
export const MOVEBASE = 'MOVEBASE';
export const DELETEBASE = 'DELETEBASE';

//table
export const CREATTABLE = 'CREATTABLE';
export const CREATTABLEBYFILE = 'CREATTABLEBYFILE';
export const EDITTABLE = 'EDITTABLE';
export const READTABLE = 'READTABLE';

//view
export const CREATVIEW = 'CREATVIEW';

// invite
export const REDALLINVITE = 'REDALLINVITE';
export const CREATINVITE = 'CREATINVITE';

//collaborator
export const READCOLLABORATOR = 'READCOLLABORATOR';

//account
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USERINFO = 'USERINFO';
