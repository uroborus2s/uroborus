import ErrorBoundary from '@/layouts/ErrorBoundary';
import LoginPane from '@/pages/account/LoginPane';
import ScrollBarSize from '@ibr/ibr-scrollbar-size/ScrollbarSize';
import { ThemeProvider } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC, StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import Logo from './Logo';

const LoginWrapper = styled('div')({
  position: 'absolute',
  background: 'url(/bg_login.png)',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 2rem',
});

const LoginTitle = styled('div')({
  display: 'flex',
  textDecoration: 'none',
  padding: '0.5rem 0',
});

const LoginBody = styled('div')({
  flex: 'auto',
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '86rem',
  width: '100%',
  alignItems: 'center',
});

const LoginFooter = styled('div')({
  flex: 'none',
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(0, 0, 0, 0.16)',
});

const SoloWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flex: 'auto',
});

const ImgWrapper = styled('img')({
  padding: '2rem',
  flex: 'none',
  width: '30%',
});

const TextWrapper = styled('div')({
  flex: 'auto',
  wordBreak: 'normal',
});

const LoginPaneRoot = styled('div')({
  border: 'none',
  boxShadow: '0 8px 23px 0 rgb(12 17 55 / 8%)',
  marginLeft: '2rem',
  marginRight: '4rem',
  flex: '0 0 420px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const LoginPage: FC = () => {
  return (
    <StrictMode>
      <RecoilRoot>
        <div className="baymax">
          <LoginWrapper>
            <LoginTitle>
              <Logo />
            </LoginTitle>
            <LoginBody>
              <SoloWrapper>
                <ImgWrapper src="/data.png" />
                <TextWrapper>
                  <Typography
                    sx={{
                      padding: '1rem',
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      fontFamily: 'ZoolGDHei',
                    }}
                  >
                    欢迎使用图云在线表格
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'GenJyuuGothicExtraLight',
                      fontSize: '1rem',
                      fontWeight: 400,
                      marginLeft: '1rem',
                    }}
                  >
                    高效协作的智能多维表格，创造更轻松的一站式工作平台
                  </Typography>
                </TextWrapper>
              </SoloWrapper>
              <LoginPaneRoot>
                <LoginPane />
              </LoginPaneRoot>
            </LoginBody>
            <LoginFooter>
              鄂ICP备 19106018号 公安备案 44030402004286
            </LoginFooter>
          </LoginWrapper>
        </div>
        <ScrollBarSize />
      </RecoilRoot>
    </StrictMode>
  );
};

export default LoginPage;
