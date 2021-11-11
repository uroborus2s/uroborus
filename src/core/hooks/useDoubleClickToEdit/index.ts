import { CommandRunOptions } from '@/domain/types';
import { KeyboardEventHandler, MouseEventHandler, SyntheticEvent } from 'react';
import { SetterOrUpdater } from 'recoil';

export default function (
  id: string,
  oldName: string,
  run: (config?: CommandRunOptions) => Promise<any>,
  isEdit: boolean,
  setEdit: SetterOrUpdater<boolean>,
) {
  const handleDoubleClick: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    if (!isEdit) setEdit(true);
  };

  const handleToEdit = (event: SyntheticEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const newName = event.currentTarget.value;
    if (newName !== oldName)
      run({
        path: { id: id },
        data: { name: newName },
      }).then();
    setEdit(false);
  };

  const handleKeyboardEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleToEdit(e);
    }
  };

  return { handleDoubleClick, handleToEdit, handleKeyboardEnter };
}
