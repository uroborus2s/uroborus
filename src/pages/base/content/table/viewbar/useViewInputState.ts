import { EDITVIEW, useDispath } from '@/domain';
import {
  KeyboardEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useState,
} from 'react';

export default function (id: string, oldName: string) {
  const [currentEditState, setCurrentEditState] = useState(false);

  const { run } = useDispath(EDITVIEW, { manual: true });

  const handleDoubleClick: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    setCurrentEditState(true);
  };

  const handleToEdit = (event: SyntheticEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const newName = event.currentTarget.value;
    if (newName !== oldName)
      run({
        path: { id: id },
        data: { name: newName },
      }).then();
    setCurrentEditState(false);
  };

  const handleKeyboardEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleToEdit(e);
    }
  };

  return {
    isEdit: currentEditState,
    handleDoubleClick,
    handleToEdit,
    handleKeyboardEnter,
  };
}
