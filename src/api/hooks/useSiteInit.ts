import { useSetRecoilState } from 'recoil';

import { queryInitData } from '@/api/workSpace-api';
import { useRequest } from '@/servers';
import {
  ApplicationMode,
  Applications,
  CurrentUserLongin,
  LastTableIdsUsed,
  UserAccountMode,
  UserAccountsInfo,
  WorkspaceMode,
  Workspaces,
} from '@/models';
import { RawApplications, RawUsers, RawWorkspaces } from '@/api';
import { SortMap } from '@/core/sortmap/sortmap';

export default function () {
  //定义需要初始化的atom变量的方法
  const setCurrentUser = useSetRecoilState(CurrentUserLongin);
  const setUserInfo = useSetRecoilState(UserAccountsInfo);
  const setWorks = useSetRecoilState(Workspaces);
  const setApps = useSetRecoilState(Applications);
  const setLastTables = useSetRecoilState(LastTableIdsUsed);

  //向服务器请求数据
  const { data, error, loading } = useRequest(queryInitData);

  let users: Map<string, UserAccountMode>;
  let workSorts: Map<string, string[]>;
  let works: Map<string, WorkspaceMode>;
  let appSorts: Map<string, string[]>;
  let apps: Map<string, ApplicationMode>;
  let lastUsedTableIds: Map<string, string>;
  if (data) {
    setCurrentUser(data.sessionUserId);
    const userInfo = getUserInfoService(data.rawUsers);
    users = userInfo.users;
    workSorts = userInfo.workSorts;
    const workInfo = getWorkspacesService(data.rawWorkspaces);
    works = workInfo.works;
    appSorts = workInfo.appSorts;
    const appInfo = getApplicationService(
      data.rawApplications,
      data.lastTableIdsUsedByApplicationId,
    );
    apps = appInfo.apps;
    lastUsedTableIds = appInfo.lastUsedTableIds;
    setLastTables(lastUsedTableIds);
    setUserInfo(users);
    setWorks(new SortMap({ mapData: works, sort: workSorts }));
    setApps(new SortMap({ mapData: apps, sort: appSorts }));
  }

  return { error, loading };
}

export function getUserInfoService(rawUsers: RawUsers) {
  const users = new Map<string, UserAccountMode>();
  const workSorts = new Map<string, string[]>();
  Object.keys(rawUsers).forEach((userKey) => {
    const { visibleWorkspaceOrder, ...info } = rawUsers[userKey];
    users.set(userKey, info);
    workSorts.set(userKey, visibleWorkspaceOrder ?? []);
  });
  return { users, workSorts };
}

export function getWorkspacesService(rawWorkspaces: RawWorkspaces) {
  const works = new Map<string, WorkspaceMode>();
  const appSorts = new Map<string, string[]>();
  Object.keys(rawWorkspaces).forEach((workKey) => {
    const { visibleApplicationOrder, ...workInfo } = rawWorkspaces[workKey];
    works.set(workKey, workInfo);
    appSorts.set(workKey, visibleApplicationOrder ?? []);
  });
  return { works, appSorts };
}

export function getApplicationService(
  rawApplications: RawApplications,
  lastTableIdsUsedByApplicationId: Record<string, string>,
) {
  const apps = new Map<string, ApplicationMode>();
  const lastUsedTableIds = new Map<string, string>();

  Object.keys(rawApplications).forEach((appKey) => {
    const { visibleTableOrder, ...appInfo } = rawApplications[appKey];
    const visible = visibleTableOrder ?? [];
    apps.set(appKey, appInfo);
    const tableKey = lastTableIdsUsedByApplicationId[appKey];
    if (tableKey) lastUsedTableIds.set(appKey, tableKey);
    else lastUsedTableIds.set(appKey, visible[0]);
  });

  return { apps, lastUsedTableIds };
}
