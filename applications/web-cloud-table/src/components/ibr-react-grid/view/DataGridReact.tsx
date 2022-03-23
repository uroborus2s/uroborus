import { IbrGridProps } from './types';
import composeClasses from '@mui/base/composeClasses';
import {
  getGridTableUtilityClass,
  GridTableComponentName,
} from './GridClasses';
import { FC, LegacyRef, memo, useEffect, useRef, useState } from 'react';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import { ReactUiFramework } from './framework/ReactUiFramework';

import './register';
import {
  ComponentUtil,
  Context,
  GridCoreCreator,
  GridParams,
  _,
} from '@ag-grid-community/core';
import GridComp from './GridComp';
import usePreviousProps from '@/core/hooks/usePreviousProps';
import { useEffectNomount } from '@/core/hooks';
import {
  ChangeDetectionService,
  ChangeDetectionStrategyType,
} from 'ag-grid-react/lib/shared/changeDetectionService';

const useUtilityClasses = (ownerState: IbrGridProps) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
    dragDiver: ['dragDiver'],
    dragDiverPress: ['dragDiverPress'],
  };
  return composeClasses(slots, getGridTableUtilityClass, classes);
};

const GridRoot = styled('div', { name: GridTableComponentName, slot: 'Root' })({
  position: 'relative',
  height: '100%',
  zIndex: 4,
  userSelect: 'none',
});

const DataGridReact: FC<IbrGridProps> = (props) => {
  const {
    className,
    sx,
    style,
    modules: modulesProp,
    gridOptions: gridOptionsProp,
  } = props;

  const eGui = useRef<HTMLDivElement>();

  const classes = useUtilityClasses(props);

  const [context, setContext] = useState<Context>();

  const prevProps = useRef(props);

  const gridOptions = useRef(gridOptionsProp || {});

  useEffect(() => {
    const modules = modulesProp || [];
    const gridParams: GridParams = {
      providedBeanInstances: {},
      modules,
      frameworkOverrides: new ReactUiFramework(),
    };

    gridOptions.current = ComponentUtil.copyAttributesToGridOptions(
      gridOptions.current,
      props,
    );

    const gridCoreCreator = new GridCoreCreator();

    gridCoreCreator.create(
      eGui.current!,
      gridOptions.current,
      (context) => {
        setContext(context);
      },
      gridParams,
    );

    return () => {
      if (gridOptions.current.api) gridOptions.current.api.destroy();
    };
  }, []);

  useEffectNomount(() => {
    const changes = {};

    extractGridPropertyChanges(prevProps.current, props, changes);

    const api = gridOptions.current.api;
    const columnApi = gridOptions.current.columnApi;
    if (api && columnApi) {
      ComponentUtil.processOnChange(
        changes,
        gridOptions.current,
        api,
        columnApi,
      );
    }
    prevProps.current = props;
  });

  return (
    <GridRoot
      className={classNames(className, classes.root)}
      ref={eGui as LegacyRef<HTMLDivElement>}
      sx={sx}
      style={style}
    >
      {context && <GridComp context={context} />}
    </GridRoot>
  );
};

export default memo(DataGridReact);

const changeDetectionService = new ChangeDetectionService();

function isImmutableDataActive(props: IbrGridProps) {
  return (
    props.immutableData ||
    (props.gridOptions && props.gridOptions.immutableData)
  );
}

function getStrategyTypeForProp(propKey: string, props: IbrGridProps) {
  if (propKey === 'rowData') {
    if (props.rowDataChangeDetectionStrategy) {
      return props.rowDataChangeDetectionStrategy;
    }
    if (isImmutableDataActive(props)) {
      return ChangeDetectionStrategyType.IdentityCheck;
    }
  }

  // all other cases will default to DeepValueCheck
  return ChangeDetectionStrategyType.DeepValueCheck;
}

function extractGridPropertyChanges(
  prevProps: any,
  nextProps: any,
  changes: any,
) {
  const debugLogging = !!nextProps.debug;

  Object.keys(nextProps).forEach((propKey) => {
    if (_.includes(ComponentUtil.ALL_PROPERTIES, propKey)) {
      const changeDetectionStrategy = changeDetectionService.getStrategy(
        getStrategyTypeForProp(propKey, nextProps),
      );

      if (
        !changeDetectionStrategy.areEqual(
          prevProps[propKey],
          nextProps[propKey],
        )
      ) {
        if (debugLogging) {
          console.log(`dataGridReact: [${propKey}] property changed`);
        }

        changes[propKey] = {
          previousValue: prevProps[propKey],
          currentValue: nextProps[propKey],
        };
      }
    }
  });

  ComponentUtil.getEventCallbacks().forEach((funcName) => {
    if (prevProps[funcName] !== nextProps[funcName]) {
      if (debugLogging) {
        console.log(`agGridReact: [${funcName}] event callback changed`);
      }

      changes[funcName] = {
        previousValue: prevProps[funcName],
        currentValue: nextProps[funcName],
      };
    }
  });
}
