import React from 'react';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import AppTopBar from '@/pages/application/AppTopBar';
import { useParams } from 'umi';
import './index.scss';
import AppMainPage from './main/AppMainPage';
import {
  useReqestApplication,
  useTableDetails,
} from '@/api/hooks/useTableInit';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';
import { RecoilRoot } from 'recoil';
import { initializeLastTableIdsUsedState } from '@/models';

interface ApplicationDTO {
  appId: string;
}

const ApplicationPage: React.FC<CSSPrefixProps> = ({ prefixCls }) => {
  const preCls = getPrefixCls('app', prefixCls);
  const { appId } = useParams<ApplicationDTO>();
  const tableRes = useTableDetails(appId);
  const appRes = useReqestApplication(appId);

  if (tableRes === null) return <div>table error!</div>;
  const loading = appRes.loading || tableRes.loading;
  if (appRes.loading || tableRes.loading)
    return <BackdropLoading open={loading} />;
  if (appRes.error || tableRes.error) return <div>error</div>;

  return (
    <div className={preCls}>
      <AppTopBar prefixCls={preCls} />
      <AppMainPage prefixCls={preCls} />
    </div>
  );
};

const RecoilWarp = (
  Node: React.FC<CSSPrefixProps>,
  // eslint-disable-next-line react/display-name
): React.FC<CSSPrefixProps> => (props) => {
  return (
    <RecoilRoot initializeState={initializeLastTableIdsUsedState}>
      <Node {...props}></Node>
    </RecoilRoot>
  );
};

export default RecoilWarp(ApplicationPage);
