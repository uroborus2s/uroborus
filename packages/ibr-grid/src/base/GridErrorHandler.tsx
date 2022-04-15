import { FC } from 'react';
import { ErrorHandler } from '@uroborus/ibr-errorhandler';
import { logurs2 } from '@uroborus/core';
import { GridMainContainer } from '../containers';
import { useRecoilState } from 'recoil';
import { GridError } from '../context/GridRootContext';
import { useGridLogger } from '../hooks/useGridLogger';

const GridErrorHandler: FC = ({ children }) => {
  const error = useRecoilState(GridError);
  const logger = useGridLogger(apiRef, 'GridErrorHandler');

  return (
    <ErrorHandler
      hasError={error !== null || error !== undefined}
      logger={logurs2}
      render={(errorProps) => (
        <GridMainContainer>
          <rootProps.components.ErrorOverlay
            {...errorProps}
            {...rootProps.componentsProps?.errorOverlay}
          />
        </GridMainContainer>
      )}
      showError={() => void 0}
    >
      {children}
    </ErrorHandler>
  );
};

export default GridErrorHandler;
