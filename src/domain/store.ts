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

const reducers = new ChainManager();
const commands = new ChainManager();

const fs = [reducers, commands];
let modulesBinded = false;

function reducer() {
  const compose_reoilstate = (rfs: ReduceFun[]) => {
    return rfs.reduce((f1, f2) => (inter, action) => f1(...f2(inter, action)));
  };
  const rfs: ReduceFun[] = [];
  reducers.forEach((r) => {
    rfs.push(r);
  });
  return compose_reoilstate(rfs);
}

let loadPromise: Promise<any> | undefined = undefined;

async function preLoad() {
  let loadResolve: (value: any) => void = () => {
    return;
  };
  if (!modulesBinded) {
    if (loadPromise === undefined) {
      loadPromise = new Promise<string>((resolve) => {
        loadResolve = resolve;
      });
      await Promise.all([getModules(reducerfiles), getModules(commandfiles)])
        .then((modFiles) => {
          modFiles.forEach((mods, index) =>
            // @ts-ignore
            mods.forEach((mod) => fs[index].register(mod.default)),
          );
        })
        .catch(() => {
          console.error('domain 模块读取错误');
        });
      if (loadResolve) loadResolve('加载成功！');
      loadPromise = undefined;
      modulesBinded = true;
      return;
    }
    console.log('预加载进行中');
  }
}

async function command() {
  if (!modulesBinded) {
    console.log('执行加载domain');
    if (loadPromise === undefined) {
      console.log('预加载未启动，此时执行预加载');
      await preLoad();
    } else {
      console.log('预加载未完成，等待预加载完成');
      await loadPromise;
    }
  }
  return (token: CancelToken) => {
    const compose_commands = (cmds: CommandFun[]) => {
      return cmds.reduce((f1, f2) => (options: CommandOptions) => {
        return f1(options).then((res) => {
          if (token) token.throwIfRequested();
          return f2(res);
        });
      });
    };

    const coms: CommandFun[] = [promiseWithCancelToken(token)];
    commands.forEach((r) => {
      coms.push(r);
    });
    return compose_commands(coms);
  };
}

export { reducer, command, preLoad };
