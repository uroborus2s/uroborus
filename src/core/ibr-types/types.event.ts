import { BaseRecordProps, WorkspaceRecordProps } from '@ibr-types/types.entity';

export interface InitReadWorkspaceEventProps {
  workspaceIds: string[];
  bases: BaseRecordProps[];
  workspaces: WorkspaceRecordProps[];
}
