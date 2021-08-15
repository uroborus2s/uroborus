import { WorkspaceRecordProps } from '@ibr-types/index';
import { Repository } from '@ibr-class/repository';
import {
  Collaborator,
  IDRecord,
  LogInfo,
  Name,
  Order,
  Permission,
} from '@ibr-class/class.storage';
import { eventBus, initByReadWorkspaceList } from '@/core/event-hub';
import { InitReadWorkspaceEventProps } from '@ibr-types/types.event';

class WorkspaceRepository extends Repository {
  constructor(name: string, prefix?: string) {
    super(name, prefix);
    eventBus.on(initByReadWorkspaceList, (data: InitReadWorkspaceEventProps) =>
      this.updateAll(data.workspaces.map((ws) => new WorkspaceRecord(ws))),
    );
  }

  convrecord(record: unknown) {
    return new WorkspaceRecord(record as WorkspaceRecordProps);
  }
}

export class WorkspaceRecord extends IDRecord {
  name: Name;
  log: LogInfo;
  permission: Permission;
  order: Order;
  baseIds: string[];
  user_role: number;
  plan_id: string;
  plan_name: string;
  shared_only_bases: boolean;
  collaborators: Collaborator[];

  constructor(workspace: WorkspaceRecordProps) {
    super(workspace.id);
    const {
      name,
      desc,
      baseIds,
      user_role,
      plan_id,
      plan_name,
      shared_only_bases,
      order,
      collaborators,
    } = workspace;
    this.name = new Name(name, desc);
    this.log = new LogInfo(workspace);
    this.permission = new Permission(workspace);
    this.baseIds = baseIds ?? [];
    this.user_role = user_role ?? 0;
    this.plan_id = plan_id ?? '';
    this.plan_name = plan_name ?? '';
    this.shared_only_bases = shared_only_bases ?? false;
    this.order = new Order(order);
    this.collaborators = collaborators.map(
      (collaborator) => new Collaborator(collaborator),
    );
  }

  readAllfield(): Record<string, any> {
    return {
      baseIds: this.baseIds,
      user_role: this.user_role,
      plan_id: this.plan_id,
      plan_name: this.plan_name,
      shared_only_bases: this.shared_only_bases,
      id: this.id,
      ...this.name.readAllfield(),
      ...this.order.readAllfield(),
      ...this.log.readAllfield(),
      ...this.permission.readAllfield(),
      collaborators: this.collaborators.map((co) => co.readAllfield()),
    };
  }
}

export const workspaceRepository = new WorkspaceRepository(
  'localWorkspaceStore',
);
