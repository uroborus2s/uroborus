import SettingBar from '@/pages/setting/SettingBar';
import { maxScreen } from './types';
import Tabs, { Tab } from '@ibr/ibr-tabs';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import ProjectPage from './bases/ProjectPage';
import Logo from './WebLogo';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    background: 'hsl(0,0%,99%)',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
  },
  tabHeader: {
    zIndex: 3,
  },
  nav: {
    width: '100%',
    boxShadow: 'rgb(0,0,0, 3%) 0px 2px 0px 0px',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: `${maxScreen - 2}rem`,
  },
  tabNode: {
    fontSize: '0.9rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  pane: {
    position: 'absolute',
    top: '48px',
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
  },
});

const HomePage: React.FC = () => {
  const classes = useStyles();

  const topBarContent = {
    left: <Logo />,
    right: <SettingBar />,
  };

  return (
    <Tabs
      classes={{
        root: classes.root,
        tabNav: classes.nav,
        tabNode: classes.tabNode,
        tabHeader: classes.tabHeader,
      }}
      tabBarExtraContent={topBarContent}
    >
      <Tab key="bases" tab="工作空间">
        <ProjectPage />
      </Tab>
      <Tab key="templates" tab="模版" />
    </Tabs>
  );
};
export default HomePage;
