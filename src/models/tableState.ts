import { preDataList } from '@/models/typepo';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { ViewListDTO } from '@/models/typedto';
import { useEffect } from 'react';
import { RefreshTableFun, RefreshViewFun } from '@/models/types';

export function useFetchTable(refreshView: RefreshViewFun) {
  const [viewSort, setViewSort] = useRecoilState(tableState.viewsOrder);
  const resetViewSort = useResetRecoilState(tableState.viewsOrder);

  const [lastUsedViewId, setlastUsedViewId] = useRecoilState(
    tableState.selected_view_id,
  );
  const resetlastUsedViewId = useResetRecoilState(tableState.selected_view_id);
  const clear = () => {
    console.log('清空当前tableinfo');
    tableState.id = '';
    tableState.rows.clear();
    tableState.columns.clear();
    tableState.collaborator = [];
    tableState.views.clear();
    tableState.base_id = '';
    resetViewSort();
    resetlastUsedViewId();
  };

  useEffect(() => () => clear(), []);

  const refreshTable: RefreshTableFun = (table) => {
    clear();
    const { columns, views, collaborator, rows, relate_rows } = table;
    const lastViewId = table.selected_view_id;
    if (lastViewId && typeof lastViewId === 'string')
      setlastUsedViewId(lastViewId);
    if (collaborator) tableState.collaborator = collaborator;
    if (columns)
      columns.forEach((col) => tableState.columns.set(col.id, { ...col }));
    if (rows) rows.forEach((row) => tableState.rows.set(row.id, { ...row }));
    if (views) {
      const newViews = preDataList(views);
      const viewSorts: string[] = [];
      let currentView: ViewListDTO | null = null;
      newViews.forEach((view) => {
        const { id, name, desc, ...other } = view;
        const atomKey = 'View-'.concat(id);
        viewSorts.push(id);
        tableState.views.set(id, {
          id: id,
          desc: atom({ key: 'desc-'.concat(atomKey), default: desc }),
          name: atom({ key: 'name-'.concat(atomKey), default: name }),
          ...other,
        });
        if (lastViewId && id === lastViewId) {
          currentView = view;
        }
      });
      setViewSort(viewSorts);
      if (currentView) {
        console.log('更新当前view');
        refreshView(currentView);
      }
    }
  };

  return { refreshTable, viewSort, lastUsedViewId };
}
