import type { FC } from 'react';

import styled from 'sense-ui/styles';

import useUtilityClasses, {
  gridComponentName,
} from '../../hooks/useUtilityClasses.js';

import BaseDropZonePanel from './BaseDropZonePanel.js';

export const HeaderStyle = styled('div', {
  name: gridComponentName,
  slot: 'HeaderDropZonesRoot',
})({});

const GridHeaderDropZones: FC = () => {
  const ownerState = {};
  const classes = useUtilityClasses({
    root: ['column-drop-wrapper'],
    list: [
      'column-drop-list',
      vertical ? 'column-drop-vertical-list' : 'column-drop-horizontal-list',
    ],
  });

  return (
    <HeaderStyle className={classes.root} role="presentation">
      <BaseDropZonePanel />
    </HeaderStyle>
  );
};

export default GridHeaderDropZones;
