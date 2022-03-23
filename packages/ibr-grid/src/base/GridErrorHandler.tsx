import { FC } from 'react';
import { ErrorHandler } from '@uroborus/ibr-errorhandler';
import { logurs2 } from '@uroborus/core/';

const GridErrorHandler: FC = ({ children }) => {
  return (
    <ErrorHandler
      logger={logurs2}
      render={(errorProps) => (
        <GridMainContainer>
          <rootProps.components.ErrorOverlay
            {...errorProps}
            {...rootProps.componentsProps?.errorOverlay}
          />
        </GridMainContainer>
      )}
    ></ErrorHandler>
  );
};

export default GridErrorHandler;
