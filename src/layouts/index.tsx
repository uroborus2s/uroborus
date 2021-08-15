import ScrollBarSize from '@ibr/ibr-scroll-bar-size/ScrollbarSize';
import React from 'react';
import '@ibr/core/styles/basis.scss';
import { RecoilRoot } from 'recoil';
import { CommonProps } from '@/util';
import { StylesProvider } from '@material-ui/core/styles';
import ErrorBoundary from './ErrorBoundary';
import DebugObserver from './RecoilDebugObserver';

const EntryNode: React.FC<CommonProps> = ({ children }) => {
  return (
    <ScrollBarSize>
      <StylesProvider injectFirst>{children}</StylesProvider>
    </ScrollBarSize>
  );
  // return <div>{children}</div>;
};
const WarpEntryNode: React.FC<CommonProps> = (props) => (
  <React.StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <EntryNode {...props} />
        <DebugObserver />
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>
);

export default WarpEntryNode;
