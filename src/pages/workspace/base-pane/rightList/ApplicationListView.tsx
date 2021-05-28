import React from 'react';
import { CSSPrefixRequiredProps } from '@/util';
import { Applications, WorkspaceMode } from '@/models';
import { useRecoilValue } from 'recoil';
import ApplicationItem from '@/pages/workspace/base-pane/rightList/ApplicationItem';
import AddItem from '@/pages/workspace/base-pane/rightList/AddItem';

interface ApplicationListViewProps extends CSSPrefixRequiredProps {
  workspace: WorkspaceMode;
}

const ApplicationListView: React.FC<ApplicationListViewProps> = ({
  prefixCls,
  workspace,
}) => {
  const applications = useRecoilValue(Applications).getSortResultOfKey(
    workspace.id,
  );

  return (
    <div className={`${prefixCls}-app-view`}>
      {applications.map((app, index) => (
        <ApplicationItem key={app.id} app={app} prefixCls={prefixCls} />
      ))}
      <AddItem prefixCls={prefixCls} workspaceId={workspace.id}></AddItem>
    </div>
  );
};
export default ApplicationListView;
