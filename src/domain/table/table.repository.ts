import { TableDetailsRsp } from '@ibr-types/index';
import {
  Collaborator,
  IDRecord,
  LogInfo,
  Name,
  Permission,
} from '@ibr-class/class.storage';
import { Repository } from '@ibr-class/repository';

class TableRepository extends Repository {
  convrecord(record: unknown) {
    return new TableRecord(record as TableDetailsRsp);
  }
}

export const tableRepository = new TableRepository('localTableStore');

export class TableRecord extends IDRecord {
  name: Name;
  log: LogInfo;
  permission: Permission;
  baseId = '';
  lastViewId = '';
  collaborators: Collaborator[] | null;

  constructor(tableInfo: TableDetailsRsp) {
    super(tableInfo.id);
    const { name, desc, base_id, selected_view_id } = tableInfo;
    this.name = new Name(name, desc);
    this.log = new LogInfo(tableInfo);
    this.permission = new Permission(tableInfo);
    if (base_id) this.baseId = base_id;
    if (selected_view_id) this.lastViewId = selected_view_id;
  }

  readAllfield(): Record<string, any> {
    return {
      baseId: this.baseId,
      lastViewId: this.lastViewId,
      name: this.name.name,
      desc: this.name.desc,
      id: this.id,
      created_at: this.log.created_at,
      updated_at: this.log.updated_at,
      joined_at: this.log.joined_at,
      create_able: this.permission.create_able,
      delete_able: this.permission.delete_able,
      share_able: this.permission.share_able,
      update_able: this.permission.update_able,
    };
  }
}
