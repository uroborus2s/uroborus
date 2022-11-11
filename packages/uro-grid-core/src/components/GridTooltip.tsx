import { FC, memo } from 'react';

export interface TooltipPorps {
  /** What part of the application is showing the tooltip, e.g. 'cell', 'header', 'menuItem' etc */
  location: string;
  /** The value to be rendered by the tooltip. */
  /** The formatted value to be rendered by the tooltip. */
  valueFormatted?: string | null;
  /** The index of the row containing the cell rendering the tooltip. */
  rowIndex?: number;
}

const GridTooltip: FC<TooltipPorps> = () => {
  return <div>a</div>;
};

export default memo(GridTooltip);
