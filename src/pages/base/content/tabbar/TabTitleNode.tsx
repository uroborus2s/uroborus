import { EDITTABLE } from '@/domain';
import { currentEditTableIdState } from '@/pages/base/BaseContext';
import useDoubleClickToEdit from '@hooks/useDoubleClickToEdit';
import InputBase from '@mui/material/InputBase';
import { FC, memo, SyntheticEvent } from 'react';
import TabShowNode, { TabTitleNodeProps } from './TabShowNode';

const TabTitleNode: FC<TabTitleNodeProps> = (props) => {
  const { id, name } = props;

  const { isEdit, handleKeyboardEnter, handleToEdit, handleDoubleClick } =
    useDoubleClickToEdit(id, name, EDITTABLE, currentEditTableIdState);

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
      {isEdit ? <EditNode /> : <TabShowNode {...props} />}
    </div>
  );
};

export default memo(TabTitleNode);
