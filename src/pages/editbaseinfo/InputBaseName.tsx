import { Input } from '@material-ui/core';
import React, { FocusEvent, KeyboardEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { ModulePageProps } from './EditBaseDialogPage';
import { baseNameEntity } from '@/domain/workspace/workspace.entity';
import { currentBaseNameEntity } from '@/domain/base/base.entity';
import { useRunPromiseService } from '@/domain/request.hooks';
import useUnmountingState from '@hooks/useUnmountingState';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';

const InputBaseName: React.FC<ModulePageProps> = ({
  prefixCls,
  editBaseRequest,
}) => {
  const workspaceId = editBaseRequest.workspaceId;
  const baseId = editBaseRequest.baseId;
  const name = useRecoilValue(
    workspaceId
      ? baseNameEntity({ workspaceId: workspaceId, baseId: baseId })
      : currentBaseNameEntity,
  );
  const isUnmounting = useUnmountingState();

  const editBaseService = useRunPromiseService(editBaseRequest, isUnmounting);

  if (editBaseService.loading)
    return <BackdropLoading open={editBaseService.loading} />;
  if (editBaseService.error) return <div>数据加载错误！</div>;

  const handleKeyEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newName = (event.target as HTMLInputElement).value;
      editBaseService({ name: newName });
      event.currentTarget.blur();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newName = (event.target as HTMLInputElement).value;
    editBaseService({ name: newName });
  };

  return (
    <Input
      disableUnderline
      defaultValue={name}
      classes={{
        focused: `${prefixCls}-input-frame-focused`,
        input: `${prefixCls}-input-frame`,
        root: `${prefixCls}-input`,
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyEnterDown}
    />
  );
};

export default InputBaseName;
