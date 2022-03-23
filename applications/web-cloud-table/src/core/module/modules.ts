import { Module } from '@/core/module/interface/Module';
import loglevel from 'loglevel';
import { values } from '../../../lib/ibr-grid/core/utils/generic';

export const modulesRegistry = (() => {
  class Registry {
    private __modules: { [name: string]: Module } = {};

    registryMods(modulesMaps: Module[]) {
      if (!modulesMaps) {
        return;
      }

      modulesMaps.forEach((module) => {
        if (this.isRegistered(module.moduleName))
          loglevel.warn(
            `module:${module.moduleName} has been exists!Will be covered`,
          );
        this.__modules[module.moduleName] = module;
      });
    }

    isRegistered(moduleName: string) {
      return !!this.__modules[moduleName];
    }

    getAllModules() {
      return values(this.__modules);
    }
  }
  return new Registry();
})();
