import { CommandFun, CommandOptions, ReduceFun } from './types';
import { ChainManager } from '@/core/ChainManager';
import { CancelToken } from 'axios';
import { promiseWithCancelToken } from './core';

const reducerfiles = require.context('@/domain', true, /\.repository.ts$/);
const commandfiles = require.context('@/domain', true, /\.service.ts$/);

async function getModules(files: __WebpackModuleApi.RequireContext) {
  try {
    return await Promise.all(files.keys().map(files));
  } catch (e) {
    return [];
  }
}
let loadResolve: (value: string | PromiseLike<string>) => void;
let loadReject: (value: string | PromiseLike<string>) => void;

const loadPromise = new Promise<string>((resolve, reject) => {
  loadResolve = resolve;
  loadReject = reject;
});

const reducers = new ChainManager<ReduceFun>();
const commands = new ChainManager<CommandFun>();

const fs = [reducers, commands];

let modulesBinded = true;
let recoilReducer: ReduceFun | undefined = undefined;

if (modulesBinded) {
  Promise.all([getModules(reducerfiles), getModules(commandfiles)])
    .then((modFiles) => {
      modFiles.forEach((mods, index) =>
        // @ts-ignore
        mods.forEach((mod) => fs[index].register(mod.default)),
      );
      recoilReducer = reducers
        .returnArray()
        .reduce((f1, f2) => (inter, action) => f1(...f2(inter, action)));
      if (loadResolve) loadResolve('加载成功！');
      modulesBinded = false;
    })
    .catch(() => {
      loadReject('函数初始化加载失败！');
    });
}

const command = loadPromise.then(() => {
  return (token: CancelToken) => {
    const newComs = commands.returnArray();
    newComs.unshift(promiseWithCancelToken(token));
    return newComs.reduce((f1, f2) => (options: CommandOptions) => {
      return f1(options).then((res) => {
        if (token) token.throwIfRequested();
        return f2(res);
      });
    });
  };
});

export { recoilReducer, command };
