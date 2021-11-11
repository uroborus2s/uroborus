import { READBASE, useDispath } from '@/domain';
import CircularProgressWithNumber from '@ibr/ibr-loading/CircularProgressWithNumber';
import makeStyles from '@mui/styles/makeStyles';
import { createContext } from 'react';
import { useParams } from 'umi';
import BaseContainer from './content/BaseContainer';
import BaseTopBar from './topbar/BaseTopBar';

const useStyel = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    width: '100%',
    padding: '0 1rem',
  },
  logo: {
    flex: 'none',
    width: '60px',
  },
  topBarContent: { flex: 'auto' },
  topBarSetting: { flex: 'none' },
});

export const BaseIdContext = createContext('');

const BaseMainPage = () => {
  const baseId = useParams<{ baseId: string }>().baseId;

  const { loading } = useDispath(READBASE, {
    request: { path: { id: baseId } },
  });

  const classes = useStyel();
  return (
    <BaseIdContext.Provider value={baseId}>
      <div className={classes.root}>
        {loading ? (
          <CircularProgressWithNumber loading={loading} />
        ) : (
          <>
            <BaseTopBar />
            <BaseContainer />
          </>
        )}
      </div>
    </BaseIdContext.Provider>
  );
};

export default BaseMainPage;
