export const apiBaseUrl = process.env.apiBaseUrl;
export const socketServer = process.env.wsocketServer;

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
    /***************workspace************************/
    //workspace
    workspace: (workId?: string) =>
      workId && workId != '' ? `/workspace/${workId}` : '/workspace',

    /***************Application************************/
    base: (baseId?: string) =>
      baseId && baseId != '' ? `/base/${baseId}` : '/base',
    copyBase: (baseId: string) => `/base/${baseId}/copy`,
    moveBase: (baseId: string) => `/base/${baseId}/move`,

    /***************table************************/
    view: (viewId: string) => `/view/${viewId}`,
    /***************table************************/
    listTable: '/table',
    getViewOfTable: (tableId: string, viewId: string) =>
      `/table/${tableId}/view/${viewId}`,
    getTableOfId: (tableId: string) => `/table/${tableId}`,
  },
};
