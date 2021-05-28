import React, { memo } from 'react';
import { Link } from 'umi';
import { FaLaravel } from 'react-icons/fa';
import { Typography } from '@material-ui/core';
import { CommonProps } from '@/util';

const TopBarLeft: React.FC<CommonProps> = ({ className }) => {
  return (
    <Link className={className} to="/">
      <FaLaravel size={24} color="#D9822B"></FaLaravel>
      <Typography variant="h6" display="block">
        经纬表
      </Typography>
    </Link>
  );
};

export default memo(TopBarLeft);
