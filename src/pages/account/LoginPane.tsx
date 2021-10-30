import { LOGIN, useDispath } from '@/domain';
import {
  AlibabaIcon,
  DingTalkIcon,
  QQIcon,
  WeixinIcon,
} from '@ibr/ibr-icon/LoginIcon';
import Tabs, { Tab } from '@ibr/ibr-tabs';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC, useRef, useState } from 'react';
import MailSharpIcon from '@mui/icons-material/MailSharp';
import PhoneIcon from '@mui/icons-material/Phone';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import { useHistory } from 'umi';

const ContainerRoot = styled('div')({
  borderBottom: 'solid 1px #edeff1',
  padding: '20px 24px',
  display: 'flex',
  alignItems: 'center',
  flex: 'none',
});

const LoginModeWrapper = styled('div')({
  flex: 'none',
  padding: '0.5rem',
  marginBottom: '2rem',
  marginLeft: '1.5rem',
  marginRight: '1.5rem',
  display: 'flex',
  alignItems: 'center',
});

const useStyle = makeStyles({
  fromRoot: {
    flex: 'auto',
  },
  tabNode: {
    fontSize: '15px',
  },
  tabHeader: {
    boxShadow: 'none',
  },
  tabActive: { color: '#1890ff', textShadow: '0 0 .25px currentColor' },
  inkBar: { backgroundColor: '#1890ff' },
});

const LoginInputRoot = styled('div')({
  marginRight: '1.5rem',
  marginLeft: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

const Input = styled(InputBase)({
  fontSize: '14px',
  width: '100%',
  border: '1px solid #d9d9d9',
  padding: '0.5rem 0.4rem',
  '& > input': {
    padding: '0',
  },
});

const ButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
});

const AutoBlank = styled('div')({
  flex: 'auto',
});

const PasswordItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1.5rem',
});

const Line = styled('div')({
  width: '1px',
  backgroundColor: '#c9c9c9',
  marginRight: '0.5rem',
  marginLeft: '0.5rem',
  height: '16px',
});

const LoginInput: FC<{
  type: 'phone' | 'mail';
  isLogin: boolean;
  setIslogin: (value: boolean) => void;
}> = ({ type, isLogin, setIslogin }) => {
  const accountRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const history = useHistory();

  const { run: login, loading } = useDispath(LOGIN, { manual: true });

  return (
    <LoginInputRoot>
      <Input
        required
        startAdornment={
          type == 'mail' ? (
            <MailSharpIcon
              sx={{ opacity: 0.5, marginRight: '0.2rem', fontSize: '16px' }}
            />
          ) : (
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              +86
              <Line />
              <PhoneIcon
                sx={{ opacity: 0.5, marginRight: '0.2rem', fontSize: '16px' }}
              />
            </Typography>
          )
        }
        sx={{ marginBottom: '1.5rem' }}
        placeholder={type == 'mail' ? '请输入邮箱' : '请输入手机号'}
        inputRef={accountRef}
      />
      <PasswordItem>
        <Input
          inputRef={passwordRef}
          startAdornment={
            <LockSharpIcon
              sx={{ opacity: 0.5, marginRight: '0.2rem', fontSize: '16px' }}
            />
          }
          placeholder={isLogin ? '请输入密码' : '请输入验证码'}
          type="password"
        />
        <Button
          variant="outlined"
          sx={{
            fontSize: '13px',
            marginLeft: '0.5rem',
            display: isLogin ? 'none' : 'inline-flex',
            whiteSpace: 'nowrap',
            padding: '0.5rem 0.4rem',
            minWidth: 'auto',
            opacity: 0.4,
          }}
          disableRipple
        >
          获取验证码
        </Button>
      </PasswordItem>
      <Button
        disabled={loading}
        variant="contained"
        sx={{ opacity: 0.6, padding: '0.75rem', fontSize: '15px' }}
        onClick={() => {
          login({
            data: {
              account: accountRef.current?.value,
              password: passwordRef.current?.value,
            },
          }).then(() => {
            history.goBack();
          });
        }}
      >
        {loading ? <CircularProgress /> : isLogin ? '登录' : '登录/注册'}
      </Button>
      <Typography
        sx={{
          marginTop: '0.2rem',
          marginBottom: '0.2rem',
          opacity: isLogin ? 0 : 1,
        }}
      >
        注册即代表同意《服务条款》
      </Typography>
      <ButtonContainer>
        <Button
          onClick={() => {
            setIslogin(!isLogin);
          }}
        >
          {isLogin ? '验证码登录/注册' : '密码登录'}
        </Button>
        <AutoBlank />
        <Button>忘记密码</Button>
      </ButtonContainer>
    </LoginInputRoot>
  );
};

const LoginPane: FC = () => {
  const classes = useStyle();

  const [isLogin, setIslogin] = useState(true);

  const handleClickLogin = (login: boolean) => {
    setIslogin(login);
  };

  return (
    <>
      <ContainerRoot>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          个人身份登陆
        </Typography>
      </ContainerRoot>
      <Tabs
        centered
        classes={{
          root: classes.fromRoot,
          tabNode: classes.tabNode,
          tabHeader: classes.tabHeader,
          tabActive: classes.tabActive,
          inkBar: classes.inkBar,
        }}
        tabBarGutter={20}
      >
        <Tab key="mail" tab="邮箱">
          <LoginInput
            type="mail"
            isLogin={isLogin}
            setIslogin={handleClickLogin}
          />
        </Tab>
        <Tab key="phone" tab="手机号">
          <LoginInput
            type="phone"
            isLogin={isLogin}
            setIslogin={handleClickLogin}
          />
        </Tab>
      </Tabs>
      <LoginModeWrapper>
        <span>其他登录方式 :</span>
        <AlibabaIcon
          sx={{
            cursor: 'pointer',
            opacity: 0.5,
            margin: '0.25rem',
            fontSize: '18px',
          }}
        />
        <WeixinIcon
          sx={{
            cursor: 'pointer',
            opacity: 0.5,
            margin: '0.25rem',
            fontSize: '18px',
          }}
        />
        <QQIcon
          sx={{
            cursor: 'pointer',
            opacity: 0.5,
            margin: '0.25rem',
            fontSize: '18px',
          }}
        />
        <DingTalkIcon
          sx={{
            cursor: 'pointer',
            opacity: 0.5,
            margin: '0.25rem',
            fontSize: '18px',
          }}
        />
      </LoginModeWrapper>
    </>
  );
};

export default LoginPane;
