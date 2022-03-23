import {
  ComponentType,
  IComponent,
  WrappableInterface,
} from 'ag-grid-community';
import { PortalManager } from '../portal/PortalManager';
import { ReactPortal } from 'react';

abstract class BaseReactComponent
  implements IComponent<any>, WrappableInterface
{
  abstract getGui(): HTMLElement;

  abstract getFrameworkComponentInstance(): any;

  abstract rendered(): boolean;

  abstract getReactComponentName(): string;

  abstract hasMethod(name: string): boolean;

  abstract callMethod(name: string, args: IArguments): void;

  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract addMethod(name: string, callback: Function): void;
}

export abstract class ReactComponent extends BaseReactComponent {
  protected eParentElement!: HTMLElement;
  protected componentInstance: any;
  protected reactComponent: any;
  protected portalManager: PortalManager;

  protected portal: ReactPortal | null = null;
  protected statelessComponent: boolean;
  protected componentType: ComponentType;

  constructor(
    reactComponent: any,
    portalManager: PortalManager,
    componentType: ComponentType,
  ) {
    super();

    this.reactComponent = reactComponent;
    this.portalManager = portalManager;
    this.componentType = componentType;

    this.statelessComponent = this.isStateless(this.reactComponent);
  }

  public getGui() {
    return this.eParentElement;
  }

  public destroy() {
    if (
      this.componentInstance &&
      typeof this.componentInstance.destroy == 'function'
    ) {
      this.componentInstance.destroy();
    }
    return this.portalManager.destroyPortal(this.portal as ReactPortal);
  }

  public isStatelessComponent() {
    return this.statelessComponent;
  }

  protected isStateless(Component: any) {
    return (
      (typeof Component === 'function' &&
        !(Component.prototype && Component.prototype.isReactComponent)) ||
      (typeof Component === 'object' &&
        Component.$$typeof === this.getMemoType())
    );
  }

  public getMemoType() {
    return this.hasSymbol() ? Symbol.for('react.memo') : 0xead3;
  }

  private hasSymbol() {
    return typeof Symbol === 'function' && Symbol.for;
  }
}
