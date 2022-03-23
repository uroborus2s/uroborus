import loglevel, { LogLevelDesc } from 'loglevel';
import { modulesRegistry } from '@/core/module/modules';

interface BeanWrapper {
  bean: any;
  beanInstance: any;
  beanName: any;
}

export interface ComponentMeta {
  componentClass: new () => {};
  componentName: string;
}

export interface ControllerMeta {
  controllerClass: new () => {};
  controllerName: string;
}

export const globalContext = (function () {
  class Context {
    //所有beans的引用
    private beanWrappers: { [key: string]: BeanWrapper } = {};
    //应用全局beans
    private globalBeans: string[] = [];
    //基于组件创建的beans，组件销毁的时候创建的beans也会被销毁
    private compBeabs: { [key: string]: string[] } = {};

    private destroyed = false;

    private logger = loglevel.getLogger('application-context');

    constructor() {
      this.logger.setLevel(log_level as LogLevelDesc);
      this.logger.info('>> creating IBRWeb-Application Context');

      const registered = modulesRegistry.getAllModules();

      const moduleBeans = registered
        .map((mod) => mod.beans)
        .filter((beans) => !!beans)
        .reduce((res, beans) => res?.concat(beans), []);

      const beanClasses = [...new Set(...moduleBeans!)];
    }
  }
  return new Context();
})();
