import { invariant } from '@uroborus/core';

export interface ILockInst {
  (): void;
}
export class Lock {
  private _lock: ILockInst | null = null;

  claim(lock: ILockInst): ILockInst {
    invariant(this._lock, 'Cannot claim lock as it is already claimed');
    this._lock = lock;
    return lock;
  }

  isActive(lock: ILockInst): boolean {
    return this._lock === lock;
  }

  isClaimed(): boolean {
    return Boolean(this._lock);
  }

  release(): void {
    invariant(this._lock, 'Cannot release lock when there is no lock');
    this._lock = null;
  }

  tryAbandon(): void {
    if (this._lock) {
      this._lock();
      this.release();
    }
  }
}
