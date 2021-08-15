import { eventBus, initByReadWorkspaceList } from '@/core/event-hub';
import { InitReadWorkspaceEventProps } from '@ibr-types/types.event';

class UserRepository {
  workspaceIds: string[];
  avatar: string;
  id: string;

  constructor() {
    this.workspaceIds = [];
    this.avatar = '';
    this.id = '';
    eventBus.on(initByReadWorkspaceList, (data: InitReadWorkspaceEventProps) =>
      Promise.resolve(this.setWorkspaceIds(data.workspaceIds)),
    );
  }

  setWorkspaceIds(ids: string[]) {
    this.workspaceIds = [...ids];
  }

  clear() {
    this.workspaceIds = [];
    this.avatar = '';
    this.id = '';
  }
}

export const userRepository = new UserRepository();
