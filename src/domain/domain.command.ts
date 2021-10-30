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
    /***************Account************************/
    login: () => `/account/login`,

    /***************table************************/
    view: (viewId: string) => `/view/${viewId}`,
    /***************table************************/
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
export const EDITBASE = 'EDITBASE';
export const DUPLIACTEBASE = 'DUPLIACTEBASE';
export const MOVEBASE = 'MOVEBASE';
export const DELETEBASE = 'DELETEBASE';

// invite
export const REDALLINVITE = 'REDALLINVITE';
export const CREATINVITE = 'CREATINVITE';

//collaborator
export const READCOLLABORATOR = 'READCOLLABORATOR';

//account
export const LOGIN = 'LOGIN';
