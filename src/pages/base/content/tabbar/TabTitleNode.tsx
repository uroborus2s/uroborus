import { EDITTABLE, useDispath } from '@/domain';
import useDoubleClickToEdit from '@hooks/useDoubleClickToEdit';
import InputBase from '@mui/material/InputBase';
import { FC, memo, SyntheticEvent } from 'react';
import { atomFamily, useRecoilState } from 'recoil';
import TabShowNode, { TabTitleNodeProps } from './TabShowNode';

export const getTableEditState = atomFamily<boolean, string>({
  key: 'IsEditTableName',
  default: false,
});

const TabTitleNode: FC<TabTitleNodeProps> = (props) => {
  const { id, name } = props;

  const {
    isEditTableName,
    handleKeyboardEnter,
    handleToEdit,
    handleDoubleClick,
  } = useDoubleClickToEdit(id, name);

  const EditNode = () => {
    return (
      <InputBase
        autoFocus
        required
        sx={{
          margin: '-1rem',
          '& .MuiInputBase-input': {
            textAlign: 'center',
            borderColor: 'rgba(0,0,0,0.25)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
          },
        }}
        defaultValue={name}
        onBlur={(e) => {
          handleToEdit(e as SyntheticEvent<HTMLInputElement>);
        }}
        onKeyUp={handleKeyboardEnter}
      />
    );
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditTableName ? <EditNode /> : <TabShowNode {...props} />}
    </div>
  );
};

export default memo(TabTitleNode);
