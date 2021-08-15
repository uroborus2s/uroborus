import { IconNames } from '@/util';
import React, { MouseEventHandler } from 'react';
import { useRecoilValue } from 'recoil';
import Icon from '@ibr/ibr-icon/Icon';
import { ModulePageProps } from './EditBaseDialogPage';
import { baseIconEntity } from '@/domain/workspace/workspace.entity';
import { currentBaseIconEntity } from '@/domain/base/base.entity';
import useUnmountingState from '@hooks/useUnmountingState';
import { useRunPromiseService } from '@/domain/request.hooks';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';
import { IconType } from '@/core/ibr-types';

const IconListPage: React.FC<ModulePageProps> = ({
  prefixCls,
  editBaseRequest,
}) => {
  const workspaceId = editBaseRequest.workspaceId;
  const baseId = editBaseRequest.baseId;
  const icon = useRecoilValue(
    workspaceId
      ? baseIconEntity({ workspaceId: workspaceId, baseId: baseId })
      : currentBaseIconEntity,
  );
  const isUnmounting = useUnmountingState();

  const editBaseService = useRunPromiseService(editBaseRequest, isUnmounting);

  if (editBaseService.loading)
    return <BackdropLoading open={editBaseService.loading} />;
  if (editBaseService.error) return <div>数据加载错误！</div>;

  const handleEditIcon: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation();
    const newIcon = (event.currentTarget as HTMLSpanElement).id;
    console.log(event.currentTarget);
    console.log(newIcon);

    if (newIcon && newIcon !== icon)
      editBaseService({
        icon: newIcon as IconType,
      });
  };

  return (
    <div className={`${prefixCls}-icon-container`}>
      <div className={`${prefixCls}-icon-content`}>
        {Object.entries(IconNames).map(([iName, iIcon]) => {
          return (
            <Icon
              button
              key={iName}
              id={iName}
              icon={iIcon}
              margin={0}
              outline="square"
              size={32}
              onClick={handleEditIcon}
              disableHover={icon !== iName}
              colorName="#F5F8FA"
            />
          );
        })}
      </div>
    </div>
  );
};

export default IconListPage;
