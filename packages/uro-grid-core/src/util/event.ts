const URO_GRID_STOP_PROPAGATION = '__uro_Grid_Stop_Propagation';

export function stopPropagationForGrid(event: any): void {
  (event as any)[URO_GRID_STOP_PROPAGATION] = true;
}

export function isStopPropagationForGrid(event: any): boolean {
  return (event as any)[URO_GRID_STOP_PROPAGATION] === true;
}

export enum Events {
  EVENT_NEW_COLUMNS_LOADED = 'newColumnsLoaded',
}
