import { BaseRecordProps, ColorType, IconType } from '@/core/ibr-types';
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

class BaseRepository extends Repository {
  constructor(name: string, prefix?: string) {
    super(name, prefix);
    eventBus.on(initByReadWorkspaceList, (data: InitReadWorkspaceEventProps) =>
      this.updateAll(data.bases.map((bs) => new BaseRecord(bs))),
    );
  }

  convrecord(record: unknown) {
    return new BaseRecord(record as BaseRecordProps);
  }
}

export const baseRepository = new BaseRepository('localBaseStore');

export class BaseRecord extends IDRecord {
  name: Name;
  log: LogInfo;
  permission: Permission;
  order: Order;
  icon: IconType;
  color: ColorType;
  user_role: 0;
  workspace_id: string;
  selected_table_id: string;
  collaborators: Collaborator[];
  tableIds: string[];

  constructor(base: BaseRecordProps) {
    super(base.id);
    const {
      name,
      desc,
      tableIds,
      user_role,
      order,
      collaborators,
      icon,
      color,
    } = base;
    this.name = new Name(name, desc);
    this.log = new LogInfo(base);
    this.permission = new Permission(base);
    this.order = new Order(order);
    this.collaborators = collaborators.map(
      (collaborator) => new Collaborator(collaborator),
    );
    this.user_role = user_role ?? 0;
    this.tableIds = tableIds ?? [];
    this.icon = icon ?? 'blank';
    this.color = color ?? 'blue';
    this.workspace_id = base.workspace_id ?? '';
    this.selected_table_id = base.selected_table_id ?? '';
  }

  readAllfield(): Record<string, any> {
    return {
      workspace_id: this.workspace_id,
      user_role: this.user_role,
      icon: this.icon,
      color: this.color,
      tableIds: this.tableIds,
      id: this.id,
      selected_table_id: this.selected_table_id,
      ...this.name.readAllfield(),
      ...this.order.readAllfield(),
      ...this.log.readAllfield(),
      ...this.permission.readAllfield(),
      collaborators: this.collaborators.map((co) => co.readAllfield()),
    };
  }
}
