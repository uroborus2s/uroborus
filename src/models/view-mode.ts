import {
  ColViewsPO,
  CurrentViewPO,
  GridColumnsPO,
  GridGroupPO,
} from '@/models/typepo';
import {
  atom,
  selector,
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { ViewListDTO } from '@/models/typedto';
import { useEffect } from 'react';
import { tableState } from '@/models/tableState';
import { RefreshViewFun } from '@/models/types';

export const viewState: CurrentViewPO = {
  id: '',
  rowsOrder: atom<string[]>({
    key: 'CurrentViewOfRowsOrder',
    default: [],
  }),
  columnsOrder: atom<ColViewsPO[]>({
    key: 'CurrentViewOfColsOrder',
    default: [],
  }),
  gridColumns: selector<GridColumnsPO[]>({
    key: 'CurrentGridColDefinitions',
    get: ({ get }) => {
      const colOrder = get(viewState.columnsOrder);
      console.log(colOrder);
      const girdCol = colOrder.map((col) => {
        const colInfo = tableState.getColumnFromId(col.column_id);
        return {
          colId: col.column_id,
          field: colInfo.name,
          width: col.width,
          lockPosition: colInfo.primary,
          lockPinned: colInfo.primary,
        };
      });
      return girdCol;
    },
  }),
  groupLevels: atom<GridGroupPO[]>({
    key: 'ViewRowsGroup',
    default: [],
  }),
};

const fetchViewLoading = atom({
  key: 'fetchViewLoading',
  default: true,
});

export function useFetchView() {
  const setColsOrder = useSetRecoilState(viewState.columnsOrder);
  const resetColsOrder = useResetRecoilState(viewState.columnsOrder);
  const setRowsOrder = useSetRecoilState(viewState.rowsOrder);
  const resetRowsOrder = useResetRecoilState(viewState.rowsOrder);

  const setGroupLevels = useSetRecoilState(viewState.groupLevels);
  const resetGroupLevels = useResetRecoilState(viewState.groupLevels);

  const [loading, setLoading] = useRecoilState(fetchViewLoading);

  const clear = () => {
    console.log('清除当前视图数据');
    viewState.id = '';
    resetColsOrder();
    resetRowsOrder();
    resetGroupLevels();
    setLoading(true);
  };

  useEffect(() => () => clear(), []);

  const refreshView: RefreshViewFun = (view) => {
    clear();
    const { id, view_columns, view_rows } = view;
    console.log(view_columns, view_rows);
    if (view_columns && Array.isArray(view_columns)) {
      if (view_columns.length > 1)
        view_columns.sort((a, b) => a.order - b.order);
      const colOrders = view_columns.map((col) => ({
        ...col,
      }));
      console.log(colOrders);
      setColsOrder(colOrders);
    }
    setLoading(false);
  };
  return { refreshView, loading, setLoading };
}
