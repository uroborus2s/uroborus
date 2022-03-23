import LogoIcon from '@ibr/ibr-icon/LogoIcon';
import styled from '@mui/styles/styled';
import { FC, memo } from 'react';

const Title = styled('span')({
  marginLeft: '0.5rem',
  marginRight: '1rem',
  fontSize: '2rem',
  fontWeight: 900,
  color: 'hsl(0,0%,20%)',
  fontFamily: 'ZoolXiaoWei',
  textAlign: 'center',
  lineHeight: '32px',
  opacity: 0.8,
});

const Des = styled('span')({
  marginLeft: '0.5rem',
  marginRight: '1rem',
  fontSize: '1.1rem',
  fontWeight: 400,
  color: 'hsl(0,0%,20%)',
  fontFamily: 'ZoolXiaoWei',
  textAlign: 'center',
  lineHeight: '32px',
  opacity: 0.6,
});

const Logo: FC = () => {
  return (
    <>
      <LogoIcon />
      <Title>
        图云在线表格<Des>数据使用更简单，却更强大</Des>
      </Title>
    </>
  );
};

export default memo(Logo);
