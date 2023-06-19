import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import { gridContext } from '@/hooks/core/useCreatContext';
import { LicenseManager } from '@/entity';
import Div from './box';

const shouldDisplayWatermark = (getDocument: () => Document): boolean => {
  const eDocument = getDocument();
  const win = eDocument.defaultView || window;
  const loc = win.location;
  const { hostname = '', pathname } = loc;

  const isDisplayWatermark = LicenseManager.isDisplayWatermark();
  const isWhiteListURL =
    hostname.match('^(?:127.0.0.1|localhost|(?:w+.)?ag-grid.com)$') != null;
  const isForceWatermark = pathname
    ? pathname.indexOf('forceWatermark') !== -1
    : false;

  return isForceWatermark || (isDisplayWatermark && !isWhiteListURL);
};

const WatermarkComp: FC<PropsWithChildren<{ getDocument: () => Document }>> = ({
  getDocument,
}) => {
  const isDisplay = shouldDisplayWatermark(getDocument);

  return (
    <Div
      sx={{
        position: 'absolute',
        bottom: '20px',
        right: '25px',
        opacity: '0.5',
        transition: 'opacity 1s ease-out 3s',
        fontWeight: 'bold',
        fontFamily: 'Impact, sans-serif',
        fontSize: '19px',
        paddingLeft: '0.7rem',
      }}
      className={classNames(isDisplay ?? 'uroborus-hidden')}
    >
      {isDisplay && LicenseManager.getWatermarkMessage()}
    </Div>
  );
};

export default WatermarkComp;
