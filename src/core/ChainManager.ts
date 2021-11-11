type ConfigOption = {
  path?: string;
  filter?: RegExp;
};

class ChainManager<T> {
  private readonly handlers: T[];

  constructor() {
    this.handlers = [];
  }

  register(...chains: T[]) {
    this.handlers.push(...chains);
    return this.handlers.length - 1;
  }

  returnArray() {
    return [...this.handlers];
  }

  forEach(fn: (handler: any) => void) {
    this.handlers.forEach((handler) => fn(handler));
  }
}

export { ChainManager };
