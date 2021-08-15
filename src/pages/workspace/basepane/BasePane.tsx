import React from 'react';
import classNames from 'classnames';
import LeftNav from '@/pages/workspace/basepane/leftnavigation/LeftNav';
import { CSSPrefixRequiredProps } from '@/util';
import RightList from '@/pages/workspace/basepane/rightList/RightList';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';
import NewWorkspaceDialog from '@/pages/workspace/newworkspace/NewWorkspaceDialog';
import { useInitPromiseService } from '@/domain/request.hooks';
import { viewCommand } from '@/domain/view.command';
import { initByReadWorkspaceList } from '@/core/event-hub';

const BasePane: React.FC<CSSPrefixRequiredProps> = ({
  prefixCls,
  className,
}) => {
  const currentPrefixCls = prefixCls.concat('-basepane');
  const { loading, error } = useInitPromiseService(
    viewCommand.dispatch(initByReadWorkspaceList),
    clearWorkspaceAndBase,
  );

  if (loading) return <BackdropLoading open={loading} />;
  if (error) return <div>数据加载错误！</div>;

  return (
    <>
      <NewWorkspaceDialog />
      <div className={classNames(currentPrefixCls, className)}>
        <LeftNav prefixCls={currentPrefixCls} />
        <RightList prefixCls={currentPrefixCls} />
      </div>
    </>
  );
};

export default BasePane;
