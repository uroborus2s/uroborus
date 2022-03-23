import SelectRoleInput from '@ibr/ibr-input/SelectRoleInput';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import styled from '@mui/material/styles/styled';
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { FC, useState } from 'react';

interface ShareDialogProps {
  name: string;
}

const CopyIcon = (props: SvgIconTypeMap['props']) => (
  <SvgIcon {...props} viewBox="0 0 12 12">
    <path
      fill="currentColor"
      d="M4.48 1l-.045.094c-.24.501.017.906.574.906h1.982c.566 0 .807-.395.558-.883L7.489 1H9v1a1 1 0 0 1-.99 1H3.99A.993.993 0 0 1 3 2V1h1.48l.045-.094C4.765.406 5.408 0 5.97 0c.558 0 1.216.405 1.46.883L7.49 1h2.014A1.5 1.5 0 0 1 11 2.506v7.988C11 11.326 10.328 12 9.503 12H2.497A1.5 1.5 0 0 1 1 10.494V2.506C1 1.674 1.672 1 2.497 1H4.48zM9 9v-.505A.494.494 0 0 0 8.5 8c-.268 0-.5.222-.5.495V9h-.505A.494.494 0 0 0 7 9.5c0 .268.222.5.495.5H8v.505c0 .28.224.495.5.495.268 0 .5-.222.5-.495V10h.505c.28 0 .495-.224.495-.5 0-.268-.222-.5-.495-.5H9zM2 5.5c0 .268.225.5.503.5h5.994C8.767 6 9 5.776 9 5.5c0-.268-.225-.5-.503-.5H2.503A.507.507 0 0 0 2 5.5zm0 2c0 .268.22.5.49.5h3.02c.275 0 .49-.224.49-.5a.5.5 0 0 0-.49-.5H2.49a.492.492 0 0 0-.49.5zm0 2c0 .268.222.5.495.5h2.01c.28 0 .495-.224.495-.5 0-.268-.222-.5-.495-.5h-2.01A.494.494 0 0 0 2 9.5z"
    />
  </SvgIcon>
);

const LinkIcon = styled(LinkSharpIcon)({
  marginRight: '0.5rem',
  fontSize: '16px',
});

const ItemContain = styled('div')({
  display: 'flex',
  paddingTop: '2rem',
  fontWeight: 500,
  flexDirection: 'column',
});

const useStyel = makeStyles({
  root: {
    width: '704px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    flex: 'auto',
  },
  title: {
    flex: 'none',
    padding: '1rem 0',
    margin: '0 2rem',
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderColor: 'rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: 500,
  },
  pane: {
    flex: 'auto',
    padding: '1rem 2rem',
    overflow: 'scroll',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  tipText: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    opacity: 0.75,
    marginBottom: '1rem',
    letterSpacing: '2px',
    ['& span']: {
      fontFamily: 'ZoolGDHei',
      fontWeight: 500,
      letterSpacing: '5px',
      fontSize: '1rem',
    },
  },
  creatInvite: {
    borderRadius: '3px',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: '0.5rem 1rem',
  },
  emailPuxx: {
    width: '25px',
    color: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteItemTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  inviteItemInput: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& >:nth-child(1)': {
      flex: 'none',
    },
    '& >:nth-child(2)': {
      flex: 'auto',
    },
    '& >:nth-child(3)': {
      flex: 'none',
    },
    '& >:nth-child(4)': {
      flex: 'none',
    },
  },
  workBlank: {
    flex: 'auto',
  },
  workRole: {
    flex: 'none',
    marginLeft: '0.5rem',
    marginRight: '20px',
    width: '102px',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3px',
    boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
    lineHeight: 1.5,
    ['&:hover']: {
      boxShadow: '0 0 0 2px rgb(0 0 0 / 25%)',
    },
  },
});

const ShareWorkspace: FC<ShareDialogProps> = ({ name }) => {
  const classes = useStyel();

  const [roleState, setRole] = useState(0);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span>
          分享工作区〖 <strong>{name}</strong> 〗
        </span>
      </div>
      <div className={classNames(classes.pane, 'scrollbar')}>
        <span className={classes.tipText}>邀请更多人加入协作</span>
        <div className={classes.creatInvite}>
          <div>
            创建一个指定
            <SelectRoleInput
              name="role-select"
              IconComponent={ArrowDropDownIcon}
              value={roleState}
              onChange={(value) => {
                setRole(value);
              }}
            />
            权限的工作区邀请链接。
          </div>
          <RadioGroup
            sx={{ marginTop: '0.5rem', marginBottom: '1rem' }}
            defaultValue="all"
          >
            <FormControlLabel
              value="all"
              control={<Radio sx={{ fontSize: '14px' }} />}
              label="任何电子邮件地址"
            />
            <FormControlLabel
              value="range"
              control={<Radio sx={{ fontSize: '14px' }} />}
              sx={{
                whiteSpace: 'nowrap',
              }}
              label={
                <>
                  {'仅允许  '}
                  <InputBase
                    sx={{
                      width: '140px',
                      boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
                      borderRadius: '3px',
                    }}
                    placeholder="example.com"
                    startAdornment={<div className={classes.emailPuxx}>@</div>}
                  />
                  {'  的域名地址'}
                </>
              }
            />
          </RadioGroup>
          <Button
            sx={{
              opacity: 0.5,
              padding: '0.5rem 1rem',
              marginBottom: '0.5rem',
            }}
            variant="contained"
          >
            新建邀请
          </Button>
        </div>
        <ItemContain>
          <Typography sx={{ opacity: 0.5 }} component="div">
            邀请链接列表
          </Typography>
          <List sx={{ padding: 0, margin: 0 }}>
            <ListItem
              sx={{
                padding: '0.5rem 0',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <div className={classes.inviteItemTitle}>
                <LinkIcon />
                <Typography>分享给所有人仅能查看</Typography>
              </div>
              <div className={classes.inviteItemInput}>
                <InputBase
                  readOnly
                  onFocus={(e) => {
                    e.currentTarget.select();
                  }}
                  value="https://airtable.com/invite/l?inviteId=invmYGgCAPJzT1Ywt&inviteToken=615d8cfd24f8e86213d6a0e60273ae871c5271ff691ab5692b838475efe26f70&utm_source=email"
                  sx={{
                    padding: 0,
                    margin: 0,
                    ['& .MuiInputBase-input']: {
                      color: 'rgb(179, 179, 179)',
                      margin: '2px',
                      padding: '0.25rem 0.5rem',
                      borderColor: 'rgba(0,0,0,0)',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      appearance: 'none',
                      width: '375px',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      lineHeight: 1.5,
                      ['&:focus']: {
                        borderColor: 'rgba(0,0,0,0.25)',
                      },
                    },
                  }}
                  endAdornment={
                    <CopyIcon
                      sx={{
                        marginLeft: '0.25rem',
                        marginRight: '0.5rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        opacity: 0.5,
                      }}
                    />
                  }
                  type="text"
                />
                <div />
                <SelectRoleInput
                  name="edit-role"
                  IconComponent={ArrowDropDownIcon}
                  value={roleState}
                  onChange={(value) => {
                    setRole(value);
                  }}
                />
                <CloseSharpIcon
                  sx={{
                    fontSize: '13px',
                    opacity: 0.75,
                    cursor: 'pointer',
                    fontWeight: 800,
                  }}
                />
              </div>
            </ListItem>
          </List>
        </ItemContain>
        <ItemContain>
          <Typography sx={{ opacity: 0.5 }} component="div">
            工作空间有<span>1人</span>成员。
          </Typography>
          <List>
            <ListItem sx={{ margin: '0.25rem 0 0 0', padding: '0.5rem 0' }}>
              <AccountCircleIcon sx={{ color: '#20c933' }} />
              <ListItemText
                sx={{ marginLeft: '0.5rem' }}
                primary="TTYY Blue"
                primaryTypographyProps={{
                  sx: {
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 500,
                  },
                }}
                secondary="yangqiuji81@gmail.com"
                secondaryTypographyProps={{
                  sx: {
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                }}
              />
              <div className={classes.workBlank} />
              <div className={classes.workRole}>可管理</div>
            </ListItem>
          </List>
        </ItemContain>
      </div>
    </div>
  );
};

export default ShareWorkspace;
