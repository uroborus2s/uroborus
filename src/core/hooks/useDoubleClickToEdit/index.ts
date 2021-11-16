import { EDITTABLE, useDispath } from '@/domain';
import { getTableEditState } from '@/pages/base/content/tabbar/TabTitleNode';
import { KeyboardEventHandler, MouseEventHandler, SyntheticEvent } from 'react';
import { useRecoilState } from 'recoil';

export default function (id: string, oldName: string) {
  const [isEditTableName, setEdit] = useRecoilState(getTableEditState(id));

  const { run } = useDispath(EDITTABLE, { manual: true });

  const handleDoubleClick: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    if (!isEditTableName) setEdit(true);
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

  return {
    isEditTableName,
    handleDoubleClick,
    handleToEdit,
    handleKeyboardEnter,
  };
}
