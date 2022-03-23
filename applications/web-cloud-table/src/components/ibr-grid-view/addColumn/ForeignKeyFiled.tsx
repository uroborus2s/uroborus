import { FC, MouseEvent, useContext, useEffect, useState } from 'react';
import { FiledComponentProps } from '@ibr/ibr-grid-view/types';
import { ForeignKeyOptions, ViewData, ViewRsp } from '@/domain/types';
import { FiledOptionRoot } from './OptionRoot';
import List from '@mui/material/List';
import { BaseIdContext } from '@/pages/base/BaseContext';
import { useRecoilValue } from 'recoil';
import { base, GETVIEWLIST, table, useDispath } from '@/domain';
import ListItemButton from '@mui/material/ListItemButton';
import IosSwitch from '@ibr/ibr-switch/IosSwitch';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import BasicSelect from '@/components/ibr-select/BasicSelect';
import useAutocomplete from '@mui/material/useAutocomplete';
import filterSearchValue from '@/core/util/filterSearchValue';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ViewIcon from '@ibr/ibr-icon/ViewIcon';
import MenuItem from '@mui/material/MenuItem';

const SelectColRoot = styled('div')({
  display: 'flex',
  padding: '0.5rem 0',
  alignItems: 'center',
});

const ViewListForSelect: FC<{
  onSelectViewId: (viewId: string, event?: MouseEvent<HTMLDivElement>) => void;
  views: ViewRsp[];
}> = ({ onSelectViewId, views }) => {
  // const { groupedOptions, getInputProps } = useAutocomplete({
  //   getOptionLabel: (option) =>
  //     typeof option == 'string' ? option : option.name,
  //   options: views,
  //   id: 'select-view-list',
  //   filterOptions: filterSearchValue,
  //   freeSolo: true,
  //   open: true,
  // });

  useEffect(() => {
    console.log('初始化view list');
  }, []);

  return (
    <>
      {views &&
        views.length > 0 &&
        (views as ViewData[]).map((viewItem) => (
          <MenuItem
            key={viewItem.id}
            sx={{
              padding: '0.5rem',
              borderRadius: '3px',
            }}
            value={viewItem.id}
            disableRipple
          >
            <ViewIcon type={viewItem.type} sx={{ marginRight: '0.5rem' }} />
            <Typography
              sx={{
                flex: 'auto',
                textOverflow: 'ellipsis',
                fontSize: '14px',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {viewItem.name}
            </Typography>
          </MenuItem>
        ))}
    </>
  );
};

const ListTableName: FC<{
  tableId: string;
  onTableClick: (tableId: string, event?: MouseEvent<HTMLDivElement>) => void;
}> = ({ tableId, onTableClick }) => {
  const tableName = useRecoilValue(table.name(tableId));

  return (
    <ListItemButton
      onClick={(event) => {
        event.stopPropagation();
        onTableClick(tableId, event);
      }}
      sx={{
        borderRadius: '6px',
        '&:hover,&:focus': { backgroundColor: '#d0f0fd' },
      }}
      disableRipple
      disableTouchRipple
    >
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {tableName}
      </Typography>
    </ListItemButton>
  );
};

const ForeignKeyFiled: FC<FiledComponentProps<ForeignKeyOptions>> = ({
  parameters,
  setParameters,
}) => {
  const baseId = useContext(BaseIdContext);
  const tableIds = [...useRecoilValue(base.tableIds(baseId))];

  const handleSelectId = (tableId: string) => {
    setParameters((p) => ({ ...p, foreignTableId: tableId }));
  };

  const handleSelectViewIdForRecord = (viewId: string) => {
    setParameters((p) => ({ ...p, viewIdForRecordSelection: viewId }));
  };

  //切换方式，将关联的tableid 清空
  useEffect(
    () => () => {
      setParameters((p) => ({ ...p, foreignTableId: '' }));
    },
    [],
  );

  //呈现view列表的
  const [recordIdFromView, setRecordIdFromView] = useState(false);

  const { loading, data, run } = useDispath(GETVIEWLIST, {
    manual: true,
  });

  useEffect(() => {
    if (parameters.foreignTableId) {
      run({ params: { tableId: parameters.foreignTableId } }).then();
    }
  }, [parameters.foreignTableId]);

  return (
    <FiledOptionRoot>
      {!parameters.foreignTableId && (
        <List
          sx={{ maxHeight: '450px', overflow: 'auto' }}
          className="scrollbar"
        >
          {tableIds.map((id) => (
            <ListTableName
              key={id}
              tableId={id}
              onTableClick={handleSelectId}
            />
          ))}
          {/*<ListItemButton*/}
          {/*  sx={{*/}
          {/*    borderRadius: '6px',*/}
          {/*    '&:hover,&:focus': { backgroundColor: '#d0f0fd' },*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <AddIcon sx={{ fontSize: '12px' }} />*/}
          {/*  新建一个表*/}
          {/*</ListItemButton>*/}
        </List>
      )}
      {parameters.foreignTableId && (
        <>
          <SelectColRoot>
            <IosSwitch
              checked={parameters.relationship === 'many'}
              onChange={(event, checked) => {
                console.log(checked);
                event.preventDefault();
                event.stopPropagation();
                setParameters((p) => ({
                  ...p,
                  relationship: checked ? 'many' : 'one',
                }));
              }}
            />
            <Typography sx={{ opacity: 0.8, marginLeft: '0.25rem' }}>
              允许选择多条记录
            </Typography>
          </SelectColRoot>
          <SelectColRoot>
            <IosSwitch
              checked={recordIdFromView}
              onChange={(event, checked) => {
                setRecordIdFromView(checked);
                event.preventDefault();
                event.stopPropagation();
              }}
            />
            <Typography sx={{ opacity: 0.8, marginLeft: '0.25rem' }}>
              从视图筛选记录
            </Typography>
          </SelectColRoot>
          {recordIdFromView && !loading && (
            <BasicSelect
              displayEmpty
              sx={{ width: '100%' }}
              MenuProps={{
                PaperProps: {
                  sx: { width: 352, maxHeight: 460 },
                  className: 'scrollbar',
                },
              }}
              value={parameters.viewIdForRecordSelection}
              onChange={(e) => {
                handleSelectViewIdForRecord(e.target.value as string);
                console.log(e.target.value);
              }}
              renderValue={(seleced) => {
                console.log(seleced);
                return (
                  <Typography sx={{ opacity: 0.9 }}>选择一个视图</Typography>
                );
              }}
            >
              <ViewListForSelect
                onSelectViewId={handleSelectViewIdForRecord}
                views={(data?.response?.data || []) as ViewRsp[]}
              />
            </BasicSelect>
          )}
        </>
      )}
    </FiledOptionRoot>
  );
};

export default ForeignKeyFiled;
