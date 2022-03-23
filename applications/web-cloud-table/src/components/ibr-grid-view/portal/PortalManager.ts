import { ReactPortal } from 'react';
import { ReactComponent } from '../component/ReactComponent';

export class PortalManager {
  private static MAX_COMPONENT_CREATION_TIME_IN_MS = 1000;

  private readonly forceUpdate: (callBackFun: () => void) => void;
  private readonly wrappingElement: string;
  private destroyed = false;

  private portals: ReactPortal[] = [];
  private hasPendingPortalUpdate = false;

  private readonly maxComponentCreationTimeMs: number;

  constructor(
    forceUpdate: (callBackFun: () => void) => void,
    wrappingElement?: string,
    maxComponentCreationTimeMs?: number,
  ) {
    this.wrappingElement = wrappingElement ? wrappingElement : 'div';
    this.forceUpdate = forceUpdate;
    this.maxComponentCreationTimeMs = maxComponentCreationTimeMs
      ? maxComponentCreationTimeMs
      : PortalManager.MAX_COMPONENT_CREATION_TIME_IN_MS;
  }

  public getPortals() {
    return this.portals;
  }

  public destroy() {
    this.destroyed = true;
  }

  public destroyPortal(portal: ReactPortal) {
    this.portals = this.portals.filter((curPortal) => curPortal !== portal);
    this.batchUpdate();
  }

  public getComponentWrappingElement(): string | undefined {
    return this.wrappingElement;
  }

  public mountReactPortal(
    portal: ReactPortal,
    reactComponent: ReactComponent,
    resolve: (value: any) => void,
  ) {
    this.portals = [...this.portals, portal];
    this.waitForInstance(reactComponent, resolve);
    this.batchUpdate();
  }

  public updateReactPortal(oldPortal: ReactPortal, newPortal: ReactPortal) {
    this.portals[this.portals.indexOf(oldPortal)] = newPortal;
    this.batchUpdate();
  }

  private batchUpdate() {
    if (this.hasPendingPortalUpdate) {
      return;
    }

    setTimeout(() => {
      if (!this.destroyed) {
        // destroyed?
        this.forceUpdate(() => {
          this.hasPendingPortalUpdate = false;
        });
      }
    });

    this.hasPendingPortalUpdate = true;
  }

  waitForInstance(
    reactComponent: ReactComponent,
    resolve: (value: any) => void,
    startTime = Date.now(),
  ) {
    // if the grid has been destroyed in the meantime just resolve
    if (this.destroyed) {
      resolve(null);
      return;
    }

    if (reactComponent.rendered()) {
      resolve(reactComponent);
    } else {
      if (
        Date.now() - startTime >= this.maxComponentCreationTimeMs! &&
        !this.hasPendingPortalUpdate
      ) {
        // last check - we check if this is a null value being rendered - we do this last as using SSR to check the value
        // can mess up contexts
        if (reactComponent.isNullValue()) {
          resolve(reactComponent);
          return;
        }

        console.error(
          `Grid: React Component '${reactComponent.getReactComponentName()}' not created within ${
            this.maxComponentCreationTimeMs
          }ms`,
        );
        return;
      }

      window.setTimeout(() => {
        this.waitForInstance(reactComponent, resolve, startTime);
      });
    }
  }
}
