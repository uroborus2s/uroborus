import { api, request } from '@/core/ibr-request';
import { eventBus, initByReadWorkspaceList } from '@/core/event-hub';
import {
  BaseRecordProps,
  calcSort,
  DataResponse,
  validator,
  WorkspaceListRsp,
  WorkspaceRecordProps,
} from '@/core/ibr-types';

export interface Command<P extends any[]> {
  execute(...props: P): Promise<any>;
}

type OperType = 'workspace_list' | 'creat_workspce' | 'edit_workspace';

class ViewCommand<P extends any[]> {
  operation: Map<OperType, Command<P>>;

  constructor(commadns: Record<OperType, Command<P>>) {
    this.operation = new Map();
    if (typeof commadns === 'object')
      Object.entries(commadns).forEach(([type, command]) => {
        this.operation.set(type as OperType, command);
      });
  }

  async dispatch(type: OperType, ...payload: P) {
    const command = this.operation.get(type);
    if (command) {
      try {
        return await command.execute(...payload);
      } catch (e) {
        console.error(`命令-${type}出现错误，错误原因${e}`);
        throw e;
      }
    } else {
      const err = `命令-${type}类型错误，视图命令不存在！`;
      console.error(err);
      throw new Error(err);
    }
  }
}

class WorkspaceListCommand implements Command<[]> {
  async execute() {
    try {
      const axiosRsp = await request(api.path.workspace());
      const resp = axiosRsp.data as DataResponse<WorkspaceListRsp>;
      const { data, collaborators } = resp.data;
      if (validator(data)) {
        const wIds = calcSort(data);
        const baseMpas: BaseRecordProps[] = [];
        const workspaceMaps: WorkspaceRecordProps[] = data.map((workspce) => {
          const { bases, ...info } = workspce;
          const bIds = calcSort(bases);
          bases.forEach((base) => {
            const { tables, ...bs } = base;
            const tIds = calcSort(tables);
            baseMpas.push({ ...bs, tableIds: tIds });
          });
          return {
            ...info,
            collaborators: collaborators[workspce.id] ?? [],
            baseIds: bIds,
          };
        });
        return await eventBus.emit(initByReadWorkspaceList, {
          workspaceIds: wIds,
          bases: baseMpas,
          workspaces: workspaceMaps,
        });
      } else
        throw new Error(
          `从服务器返回的数据不正确，url:${api.path.workspace()}`,
        );
    } catch (e) {
      console.log('服务器返回错误！');
      throw e;
    }
  }
}

export const creatWorkspace = 'creat_workspce';
export const editWorkspace = 'edit_workspace';

export const viewCommand = new ViewCommand({
  [initByReadWorkspaceList]: new WorkspaceListCommand(),
  [creatWorkspace]: new WorkspaceListCommand(),
  [editWorkspace]: new WorkspaceListCommand(),
});
