import { getIconTypeColor, iconColors } from '@/util';
import { HiCheck } from 'react-icons/hi';
import Icon from '@ibr/ibr-icon/Icon';
import React, { MouseEventHandler } from 'react';
import { useRecoilValue } from 'recoil';
import { ModulePageProps } from './EditBaseDialogPage';
import { baseColorEntity } from '@/domain/workspace/workspace.entity';
import { currentBaseColorEntity } from '@/domain/base/base.entity';
import useUnmountingState from '@hooks/useUnmountingState';
import { useRunPromiseService } from '@/domain/request.hooks';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';
import { ColorType } from '@/core/ibr-types';

const ColorListPage: React.FC<ModulePageProps> = ({
  prefixCls,
  editBaseRequest,
}) => {
  const workspaceId = editBaseRequest.workspaceId;
  const baseId = editBaseRequest.baseId;
  const color = useRecoilValue(
    workspaceId
      ? baseColorEntity({ workspaceId: workspaceId, baseId: baseId })
      : currentBaseColorEntity,
  );
  const isUnmounting = useUnmountingState();

  const editBaseService = useRunPromiseService(editBaseRequest, isUnmounting);

  if (editBaseService.loading)
    return <BackdropLoading open={editBaseService.loading} />;
  if (editBaseService.error) return <div>数据加载错误！</div>;

  const currentColor = getIconTypeColor(color);

  const onEditAppColor: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation();
    const newColor = (event.currentTarget as HTMLSpanElement).id;
    console.log(event.currentTarget);
    console.log(newColor);

    if (newColor && newColor !== color)
      editBaseService({ color: newColor as ColorType });
  };

  return (
    <div className={`${prefixCls}-color-container`}>
      {Object.entries(iconColors).map(([ctype, chex]) => {
        let it = null;
        if (currentColor === chex) it = HiCheck;
        return (
          <Icon
            size={24}
            button
            key={ctype}
            id={ctype}
            colorName={chex}
            icon={it}
            outline="square"
            margin={0}
            onClick={onEditAppColor}
            disableHover
          />
        );
      })}
    </div>
  );
};

export default ColorListPage;
