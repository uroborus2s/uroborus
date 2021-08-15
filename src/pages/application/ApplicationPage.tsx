import React from 'react';
import { CSSPrefixProps, getPrefixCls } from '@/util';
import AppTopBar from '@/pages/application/AppTopBar';
import './index.scss';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';

const ApplicationPage: React.FC<CSSPrefixProps> = ({ prefixCls }) => {
  const preCls = getPrefixCls('app', prefixCls);

  return (
    <React.Suspense fallback={<BackdropLoading open={true} />}>
      <div className={preCls}>
        <AppTopBar prefixCls={preCls} />
        {/*<AppMainPage prefixCls={preCls} />*/}
      </div>
    </React.Suspense>
  );
};

export default ApplicationPage;
