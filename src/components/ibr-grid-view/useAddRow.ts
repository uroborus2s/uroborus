import { CREATROW, useDispath } from '@/domain';
import {
  currentViewIdState,
  TableIdContext,
} from '@/pages/base/content/table/TableContext';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';

export default function (lastRowId: string) {
  const viewId = useRecoilValue(currentViewIdState);
  const tableId = useContext(TableIdContext);

  const { run } = useDispath(CREATROW, { manual: true });

  const handleNewRow = () => {
    run({
      data: {
        table_id: tableId,
        view_id: viewId,
        anchor_row_id: lastRowId,
        direction: 0,
      },
    }).then();
  };

  return handleNewRow;
}
