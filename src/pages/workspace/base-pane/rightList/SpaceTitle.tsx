import React, { useState } from 'react';
import { cssFlex, cssFlexiCenter, CSSPrefixRequiredProps } from '@/util';
import { Button, TextField, Typography } from '@material-ui/core';
import { RiArrowDownSFill, RiUserShared2Fill } from 'react-icons/ri';
import classNames from 'classnames';
import Icon from '@ibr/ibr-icon/Icon';
import { WorkspaceMode } from '@/models';

//应用列表的标题
function TitleNode({ title, prefixCls }: { title: string; prefixCls: string }) {
  const claName = `${prefixCls}-label`;
  return (
    <span className={classNames(cssFlex, cssFlexiCenter, claName)}>
      <Typography variant="h6">{title}</Typography>
      <Icon button icon={RiArrowDownSFill} size={16}></Icon>
    </span>
  );
}

function TextFiledNode({ title }: { title: string }) {
  return (
    <TextField
      id="outlined-margin-dense"
      defaultValue={title}
      margin="dense"
      variant="outlined"
    />
  );
}

interface SpaceTitleProps extends CSSPrefixRequiredProps {
  workspace: WorkspaceMode;
}

const SpaceTitle: React.FC<SpaceTitleProps> = ({ prefixCls, workspace }) => {
  const [isText, setIsText] = useState(false);

  return (
    <div className={`${prefixCls}-title`}>
      {isText ? (
        <TextFiledNode title={workspace.name} />
      ) : (
        <TitleNode title={workspace.name} prefixCls={prefixCls} />
      )}
      <Button
        className={`${prefixCls}-share`}
        variant="contained"
        endIcon={<RiUserShared2Fill size={16}></RiUserShared2Fill>}
      >
        分享
      </Button>
    </div>
  );
};

export default SpaceTitle;
