import React, { memo, useRef } from 'react';
import { cssOverflowY, CSSPrefixRequiredProps, useElementSize } from '@/util';
import './right.scss';
import SpaceTitle from './SpaceTitle';
import ApplicationListView from './ApplicationListView';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { useOpenNewWorkspaceDialogService } from '@/pages/workspace/newworkspace/NewWorkspaceDialog';
import { useRecoilValue } from 'recoil';
import { workspaceIdsEntity } from '@/domain/workspace/workspace.entity';

const RightList: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const currentPrefixCls = prefixCls.concat('-right-content');
  const container = useRef<HTMLDivElement>();
  const { clientWidth, height, left } = useElementSize(container);
  const handleNewWorkspace = useOpenNewWorkspaceDialogService();
  const workspacsIds = useRecoilValue(workspaceIdsEntity);

  return (
    // @ts-ignore
    <div className={currentPrefixCls} ref={container}>
      <div
        className={classNames(
          `${currentPrefixCls}-scroll-container`,
          cssOverflowY,
        )}
        style={{ height: height }}
      >
        <div
          className={`${currentPrefixCls}-item-container`}
          style={{
            width: clientWidth,
            position: 'relative',
            top: 0,
            left: left,
          }}
        >
          {workspacsIds.map((workspaceId) => (
            <div key={'list-'.concat(workspaceId)}>
              <SpaceTitle
                prefixCls={currentPrefixCls}
                workspaceId={workspaceId}
              />
              <ApplicationListView
                prefixCls={currentPrefixCls}
                workspaceId={workspaceId}
              />
            </div>
          ))}
          <Typography
            variant="button"
            classes={{ root: `${currentPrefixCls}-add-workspace` }}
            onClick={handleNewWorkspace}
          >
            ＋ 新建工作空间
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default memo(RightList);
