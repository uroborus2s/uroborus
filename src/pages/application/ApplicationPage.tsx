import React from 'react';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';

const ApplicationPage: React.FC = () => {
  return (
    <React.Suspense fallback={<BackdropLoading open={true} />}>
      <div>
        {/*<AppTopBar prefixCls={preCls} />*/}
        {/*<AppMainPage prefixCls={preCls} />*/}
      </div>
    </React.Suspense>
  );
};

export default ApplicationPage;
