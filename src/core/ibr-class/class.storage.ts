import {
  Collaborators,
  IDEntity,
  LogEntity,
  LogEntityProps,
  NameEntity,
  OrderEntity,
  PermissionEntity,
  PermissionEntityProps,
} from '@ibr-types/index';

export abstract class IDRecord implements IDEntity {
  id: string;

  protected constructor(id: string) {
    if (id) this.id = id;
    throw new Error('实体的Id不能为空！！');
  }

  abstract readAllfield(): Record<string, any>;

  isEqual(other: string | IDEntity): boolean {
    if (typeof other === 'string') return this.id === other;

    if (typeof other === 'object' && other instanceof IDRecord)
      return this.id === other.id;

    throw new Error('无法对实体进行比较');
  }

  property(field: string) {
    const ob = this.readAllfield();
    return ob[field];
  }
}

export class Name implements NameEntity {
  name = '';
  desc = '';

  constructor(name?: string, desc?: string) {
    this.set(name ?? '', desc);
  }

  set(name: string, desc?: string) {
    this.name = name ?? '';
    this.desc = desc ?? '';
  }

  readAllfield(): Record<string, any> {
    return { name: this.name, desc: this.desc };
  }

  property(field: string) {
    const ob = this.readAllfield();
    return ob[field];
  }
}

export class Order implements OrderEntity {
  order = 999;

  constructor(order?: number) {
    if (order) this.set(order);
  }

  set(order: number) {
    if (order) this.order = order;
  }

  readAllfield(): Record<string, any> {
    return { order: this.order };
  }

  property(field: string) {
    const ob = this.readAllfield();
    return ob[field];
  }

  // 当前排序后的在 other 之前，则返回一个小于 0 的值。
  // 若位置不发生变化，则返回 0。
  // 当前排序在 other 之后，则返回一个小于 0 的值。
  compare(other: number | Order) {
    if (typeof other === 'number') return this.order - other;

    if (typeof other === 'object' && other instanceof Order) {
      return this.order - other.order;
    }

    throw new Error('排序函数的参数错误！');
  }
}

export class LogInfo implements LogEntity {
  created_at = '';
  updated_at = '';
  joined_at = '';

  constructor(value: LogEntityProps) {
    this.set(value);
  }

  set(value: LogEntityProps) {
    const { joined_at, updated_at, created_at } = value;
    if (joined_at) this.joined_at = joined_at;
    if (updated_at) this.updated_at = updated_at;
    if (created_at) this.created_at = created_at;
  }

  readAllfield(): Record<string, any> {
    return {
      created_at: this.created_at,
      updated_at: this.updated_at,
      joined_at: this.joined_at,
    };
  }

  property(field: string) {
    const ob = this.readAllfield();
    return ob[field];
  }
}

export class Permission implements PermissionEntity {
  create_able = false;
  delete_able = false;
  share_able = false;
  update_able = false;

  constructor(per: PermissionEntityProps) {
    this.set(per);
  }

  set({
    delete_able,
    share_able,
    update_able,
    create_able,
  }: PermissionEntityProps) {
    if (delete_able) this.delete_able = delete_able;
    if (share_able) this.share_able = share_able;
    if (update_able) this.update_able = update_able;
    if (create_able) this.create_able = create_able;
  }

  readAllfield(): Record<string, any> {
    return {
      delete_able: this.delete_able,
      share_able: this.share_able,
      update_able: this.update_able,
      create_able: this.create_able,
    };
  }

  property(field: string) {
    const ob = this.readAllfield();
    return ob[field];
  }
}

export class Collaborator extends IDRecord {
  avatar: string;
  created_at: string;
  nickname: string;
  role: number;
  updated_at: string;
  user_id: string;

  constructor(coll: Collaborators) {
    super(coll.id);
    this.avatar = coll.avatar ?? '';
    this.created_at = coll.created_at ?? '';
    this.nickname = coll.nickname ?? '';
    this.role = coll.role ?? 0;
    this.updated_at = coll.updated_at ?? '';
    this.user_id = coll.user_id ?? '';
  }

  readAllfield(): Record<string, any> {
    return {
      avatar: this.avatar,
      created_at: this.created_at,
      nickname: this.nickname,
      role: this.role,
      updated_at: this.updated_at,
      user_id: this.user_id,
      id: this.id,
    };
  }

  property(field: string) {
    const ob = this.readAllfield();
    return ob[field];
  }
}
