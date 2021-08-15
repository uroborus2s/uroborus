import localforage from 'localforage';
import { IDRecord } from '@ibr-class/class.storage';

export abstract class Repository {
  _localStore: LocalForage;
  _storePrefix = '';

  constructor(name: string, prefix?: string) {
    this._localStore = localforage.createInstance({
      driver: localforage.LOCALSTORAGE,
      name: name,
    });
    this._localStore.config({ driver: localforage.LOCALSTORAGE });
    if (prefix) this._storePrefix = `${prefix}/`;
  }

  async clear() {
    try {
      await this._localStore.clear();
    } catch (err) {
      console.error(err);
    }
  }

  async updateAll(records: IDRecord[]) {
    if (Array.isArray(records) && records.every((r) => r.id)) {
      try {
        await this.clear();
        return await Promise.all(
          records.map((r) =>
            this._localStore.setItem(
              `${this._storePrefix}${r.id}`,
              r.readAllfield(),
            ),
          ),
        );
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      const err = `写入的${records}数据错误`;
      console.error(err);
      throw new Error(err);
    }
  }

  async updateone(record: IDRecord) {
    if (record.id) {
      return await this._localStore.setItem(
        `${this._storePrefix}${record.id}`,
        record.readAllfield(),
      );
    } else {
      console.error(`写入的${record}数据错误`);
    }
  }

  async readone(id: string) {
    if (id) {
      try {
        const record = await this._localStore.getItem(
          `${this._storePrefix}${id}`,
        );
        if (record) return this.convrecord(record);
        else throw new Error(`未查找到相关id=${id}的数据`);
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      console.error(`读取的${id}错误，id不能为空或者不存在！`);
    }
  }

  async readAll() {
    try {
      const before = performance.now();
      console.log(
        `开始读读取当前库所有的数据s，开始时间:${new Date().toLocaleTimeString()}`,
      );
      const persistedIds = await this._localStore.keys();

      const results = await Promise.all(
        persistedIds.map((id) => this._localStore.getItem(id)),
      );
      console.log(typeof results);

      const after = performance.now();
      console.log(`数据读取成功！,加载时间${after - before}ms`);
      console.dir(results);
      return results.map((res) => this.convrecord(res));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  abstract convrecord(record: unknown): IDRecord;
}
