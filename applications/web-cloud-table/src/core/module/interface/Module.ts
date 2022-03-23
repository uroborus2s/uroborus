import { ComponentMeta, ControllerMeta } from '@/core/context/context';

export interface Module {
  moduleName: string;
  beans?: any[];
  stackComponents?: ComponentMeta[];
  controllers?: ControllerMeta[];
  userComponents?: { componentName: string; componentClass: any }[];
  dependantModules?: Module[]; // Niall / Sean - my addition
}
