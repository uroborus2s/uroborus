import { useDispath } from '@/domain';
import { KeyboardEventHandler, MouseEventHandler, SyntheticEvent } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

export default function (
  id: string,
  oldName: string,
  command: string,
  editState: RecoilState<string>,
) {
  const [currentEditId, setCurrentEditId] = useRecoilState(editState);

  const { run } = useDispath(command, { manual: true });

  const handleDoubleClick: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    if (!currentEditId) setCurrentEditId(id);
  };

  const handleToEdit = (event: SyntheticEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const newName = event.currentTarget.value;
    if (newName !== oldName)
      run({
        path: { id },
        data: { name: newName },
      }).then();
    setCurrentEditId('');
  };

  const handleKeyboardEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleToEdit(e);
    }
  };

  const isEdit = currentEditId === id;

  return {
    isEdit,
    handleDoubleClick,
    handleToEdit,
    handleKeyboardEnter,
  };
}
