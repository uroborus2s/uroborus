type ConfigOption = {
  path?: string;
  filter?: RegExp;
};

class ChainManager {
  private readonly handlers: any[];

  constructor() {
    this.handlers = [];
  }

  register(...chains: any[]) {
    this.handlers.push(...chains);
    return this.handlers.length - 1;
  }

  eject(id: number) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  forEach(fn: (handler: any) => void) {
    this.handlers.forEach((handler) => fn(handler));
  }
}

export { ChainManager };
