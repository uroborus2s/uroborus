import React from 'react';
import { CSSPrefixRequiredProps } from '@/util';
import { useRecoilValue } from 'recoil';
import ApplicationItem from '@/pages/workspace/basepane/rightList/ApplicationItem';
import AddItem from '@/pages/workspace/basepane/rightList/AddItem';
import { baseIdsEntity } from '@/domain/workspace/workspace.entity';

interface ApplicationListViewProps extends CSSPrefixRequiredProps {
  workspaceId: string;
}

const ApplicationListView: React.FC<ApplicationListViewProps> = ({
  prefixCls,
  workspaceId,
}) => {
  const applications = useRecoilValue(baseIdsEntity(workspaceId));
  return (
    <div className={`${prefixCls}-app-view`}>
      {applications.map((appId) => (
        <ApplicationItem
          key={appId}
          appId={appId}
          prefixCls={prefixCls}
          workspaceId={workspaceId}
        />
      ))}
      <AddItem prefixCls={prefixCls} workspaceId={workspaceId} />
    </div>
  );
};
export default ApplicationListView;
