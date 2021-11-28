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
    copyTable: (tableId: string) => `/table/${tableId}/copy`,

    /***************view************************/
    view: (viewId?: string) => (viewId ? `/view/${viewId}` : '/view'),
    copyView: (viewId: string) => `/view/${viewId}/copy`,

    /***************column************************/

    /***************row************************/
    row: (rowId?: string) => (rowId ? `/row/${rowId}` : '/row'),
    newRow: '/row/contentWith',

    /***************column************************/
    column: (columnId?: string) =>
      columnId ? `/column/${columnId}` : '/column',

    /***************Orders************************/
    rowOrders: '/orders/rows',
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
export const DELETETABLE = 'DELETETABLE';
export const DUPLIACTETABLE = 'DUPLIACTETABLE';

//view
export const CREATVIEW = 'CREATVIEW';
export const EDITVIEW = 'EDITVIEW';
export const DUPLIACTEVIEW = 'DUPLIACTEVIEW';
export const DELETEVIEW = 'DELETEVIEW';
export const READVIEW = 'READVIEW';

//row
export const CREATROW = 'CREATROW';

//column
export const CREATCOLUMN = 'CREATCOLUMN';

// invite
export const REDALLINVITE = 'REDALLINVITE';
export const CREATINVITE = 'CREATINVITE';

//collaborator
export const READCOLLABORATOR = 'READCOLLABORATOR';

//account
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USERINFO = 'USERINFO';
