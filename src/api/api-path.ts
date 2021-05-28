const apiBaseUrl = process.env.apiBaseUrl;
const socketServer = process.env.wsocketServer;

export const websocket = {
  static: {
    endpoint: socketServer,
    path: {
      subMsg: '/user/topic/subNewMsg',
    },
  },
};

export const api = {
  workspace: {
    endpoint: apiBaseUrl,
    path: {
      /***************workspace************************/
      //workspace
      moveWorkspace: (userid: string) => `/user/${userid}/moveWorkspace`,

      /***************Application************************/
      readCurrentApplication: (appId: string) => `/application/${appId}`,

      /***************application************************/
      //读取当前应用下的table和view信息
      readAppInfo: (appId: string) => `/application/${appId}/read`,
      //修改应用的颜色
      updateAppColor: (appId: string) => `/application/${appId}/updateColor`,

      /***************table************************/
      //修改最后一次使用的表格ID
      setTableLastUsed: (tableId: string) => `table/${tableId}/setAsLastUsed`,
    },
  },
};
