const X_GRID_STOP_PROPAGATION = '__x_Grid_Stop_Propagation';

export function stopPropagationForAgGrid(event: any): void {
  (event as any)[X_GRID_STOP_PROPAGATION] = true;
}

export function isStopPropagationForAgGrid(event: any): boolean {
  return (event as any)[X_GRID_STOP_PROPAGATION] === true;
}
