import { READVIEW, useDispath } from '@/domain';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import GridTable from '@ibr/ibr-grid-view/GridTable';
import LoadingWithNumber from '@ibr/ibr-loading/LoadingWithNumber';
import styled from '@mui/styles/styled';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

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

  useEffect(() => {
    run({ path: { id: viewId } });
  }, [viewId]);

  return (
    <ViewPaneContainerRoot>
      {loading ? <LoadingWithNumber loading={loading} /> : <GridTable />}
    </ViewPaneContainerRoot>
  );
};

export default ViewPaneContainer;
