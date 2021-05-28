import React, { memo, useRef } from 'react';
import {
  cssOverflowY,
  CSSPrefixRequiredProps,
  useResizeObserver,
} from '@/util';
import './right.scss';
import { useRecoilValue } from 'recoil';
import SpaceTitle from './SpaceTitle';
import ApplicationListView from './ApplicationListView';
import classNames from 'classnames';
import { CurrentUserLongin, Workspaces } from '@/models';

const RightList: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const currentPrefixCls = prefixCls.concat('-right-content');
  const container = useRef<HTMLDivElement>();
  const { wight, height, top, left } = useContainerRect(container.current);
  const userId = useRecoilValue(CurrentUserLongin);
  const workspaces = useRecoilValue(Workspaces).getSortResultOfKey(userId);

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
            width: wight,
            position: 'relative',
            top: 0,
            left: left,
            height: 'auto',
          }}
        >
          {workspaces.map((workspace, index) => (
            <div key={'list-'.concat(workspace.id)}>
              <SpaceTitle
                prefixCls={currentPrefixCls}
                workspace={workspace}
              ></SpaceTitle>
              <ApplicationListView
                prefixCls={currentPrefixCls}
                workspace={workspace}
              ></ApplicationListView>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(RightList);

function useContainerRect(element?: HTMLDivElement | undefined) {
  let wight = 0,
    height = 0,
    top = 0,
    left = 0;
  if (element) {
    const rect = element.getBoundingClientRect();
    left = rect.left;
    top = rect.top;
    wight = rect.width;
    height = rect.height;
  }
  return { wight, height, top, left };
}
