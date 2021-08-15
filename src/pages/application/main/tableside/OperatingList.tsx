import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import React from 'react';
import { CSSPrefixRequiredProps, iconColors } from '@/util';
import Icon from '@ibr/ibr-icon/Icon';
import {
  FaFileAlt,
  FaFileCsv,
  FaFileExcel,
  FaFileSignature,
} from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

const OperatingList: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  return (
    <List
      subheader={
        <ListSubheader
          style={{
            color: '#CED9E0',
            lineHeight: '1.5rem',
            fontSize: '0.75rem',
            marginTop: '2rem',
            paddingLeft: '0px',
          }}
          component="div"
        >
          新建表格
        </ListSubheader>
      }
      classes={{ root: `${prefixCls}-operating` }}
    >
      <ListItem
        button
        classes={{
          root: `${prefixCls}-table-item`,
        }}
      >
        <Icon icon={FaFileSignature} colorName={iconColors.cyan} size={20} />
        <ListItemText
          primary="新建空白表"
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
        />
        <Icon icon={MdAdd} size={20} />
      </ListItem>
      <ListSubheader
        style={{
          color: '#CED9E0',
          lineHeight: '1.5rem',
          fontSize: '0.75rem',
          marginTop: '0.3rem',
          paddingLeft: '0px',
        }}
        component="div"
      >
        从数据导入
      </ListSubheader>
      <ListItem
        button
        classes={{
          root: `${prefixCls}-table-item`,
        }}
      >
        <Icon icon={FaFileCsv} colorName={iconColors.green} size={20} />
        <ListItemText
          primary="导入csv"
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
        />
        <Icon icon={MdAdd} size={20} />
      </ListItem>
      <ListItem
        button
        classes={{
          root: `${prefixCls}-table-item`,
        }}
      >
        <Icon icon={FaFileExcel} colorName={iconColors.red} size={20} />
        <ListItemText
          primary="导入Excel"
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
        />
        <Icon icon={MdAdd} size={20} />
      </ListItem>
      <ListItem
        button
        classes={{
          root: `${prefixCls}-table-item`,
        }}
      >
        <Icon icon={FaFileAlt} colorName={iconColors.pink} size={20} />
        <ListItemText
          primary="导入Numbers"
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
        />
        <Icon icon={MdAdd} size={20} />
      </ListItem>
    </List>
  );
};

export default OperatingList;
