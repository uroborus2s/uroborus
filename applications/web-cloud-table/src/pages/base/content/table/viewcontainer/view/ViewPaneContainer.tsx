import { READVIEW, useDispath } from '@/domain';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import LoadingWithNumber from '@ibr/ibr-loading/LoadingWithNumber';
import styled from '@mui/styles/styled';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef } from 'react';
import DataGridReact from '@ibr/ibr-grid-view/DataGridReact';

const ViewPaneContainerRoot = styled('div')({
  flex: 'auto',
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: 'hsl(0,0%,97%)',
});

const ViewPaneContainer = () => {
  const viewId = useRecoilValue(currentViewIdState);

  const { loading, run } = useDispath(READVIEW, { manual: true });

  const frist = useRef(true);

  useEffect(() => {
    if (frist.current) frist.current = false;
  }, []);

  useEffect(() => {
    run({ path: { id: viewId } });
  }, [viewId]);

  return (
    <ViewPaneContainerRoot>
      {frist.current || loading ? (
        <LoadingWithNumber loading={loading} />
      ) : (
        <DataGridReact />
      )}
    </ViewPaneContainerRoot>
  );
};

export default ViewPaneContainer;
