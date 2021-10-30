import GlobalTipInfo from '@/layouts/GlobalTipInfo';
import ScrollBarSize from '@ibr/ibr-scrollbar-size/ScrollbarSize';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import React from 'react';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from './ErrorBoundary';
import DebugObserver from './RecoilDebugObserver';

const theme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          padding: '0.25rem 0.25rem 0.25rem 0.5rem',
          borderRadius: '6px',
          backgroundColor: 'rgba(0,0,0,0.05)',
          fontSize: '13px',
          lineHeight: '18px',
        },
        input: {
          padding: '4px',
          borderRadius: '2px',
          outline: '0px',
          resize: 'none',
          boxShadow: 'none',
          fontFamily: 'inherit',
          fontStyle: 'inherit',
          fontWeight: 'inherit',
          height: 'auto',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltipPlacementBottom: { marginTop: '0.2rem' },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          marginLeft: '0.25rem',
          fontSize: '13px',
          lineHeight: '18px',
        },
        root: {
          marginLeft: '0.5rem',
          marginBottom: '0.5rem',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.9rem',
          lineHeight: 1.5,
        },
        secondary: {
          fontSize: '11px',
          lineHeight: 1.5,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          lineHeight: '18px',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0,
          marginRight: '0.5rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          lineHeight: '18px',
        },
      },
    },
  },
  typography: {
    fontFamily:
      '-apple-system, system-ui,BlinkMacSystemFont,"Roboto","Helvetica","Arial",sans-serif',
    fontSize: 13,
    body1: {
      fontSize: 13,
    },
  },
});

const EntryNode: React.FC = ({ children }) => {
  return (
    <StylesProvider>
      <ThemeProvider theme={theme}>
        {children}
        <GlobalTipInfo />
        <ScrollBarSize />
      </ThemeProvider>
    </StylesProvider>
  );
};
const WarpEntryNode: React.FC = (props) => (
  <React.StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <div className="baymax">
          <EntryNode {...props} />
          <DebugObserver />
        </div>
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>
);

export default WarpEntryNode;
