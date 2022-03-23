import FilteredButton from '@/pages/base/content/table/viewbar/ViewOperButton/FilteredButton';
import GroupButton from '@/pages/base/content/table/viewbar/ViewOperButton/GroupButton';
import HideButton from '@/pages/base/content/table/viewbar/ViewOperButton/HideButton';
import RowHeightButton from '@/pages/base/content/table/viewbar/ViewOperButton/RowHeightButton';
import ShareButton from '@/pages/base/content/table/viewbar/ViewOperButton/ShareButton';
import SortButton from '@/pages/base/content/table/viewbar/ViewOperButton/SortButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from '@mui/styles/styled';

const GroupRoot = styled(ButtonGroup)({
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
});

const ViewButtonGroup = () => {
  return (
    <GroupRoot>
      <HideButton />
      <FilteredButton />
      <GroupButton />
      <SortButton />
      <RowHeightButton />
      <ShareButton />
    </GroupRoot>
  );
};

export default ViewButtonGroup;
