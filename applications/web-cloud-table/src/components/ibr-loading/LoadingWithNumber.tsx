import { CommonProps } from '@/core/ibr-types';
import useAnimate from '@hooks/useAnimate';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { DefaultTheme } from '@mui/styles/defaultTheme';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { FC, useEffect } from 'react';

interface LoadingWithNumber extends CommonProps {
  loading: boolean;
  duration?: number;
}

const useStyel = makeStyles<DefaultTheme, { loading: boolean }>({
  fspLoading: ({ loading }) => ({
    display: loading ? 'inline-block' : 'none',
    position: 'absolute',
  }),

  fspLoadingText: ({ loading }) => ({
    display: loading ? 'inline-block' : 'none',
  }),
  root: ({ loading }) => ({
    display: loading ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }),
});

const CircularProgressWithNumber: FC<LoadingWithNumber> = ({
  loading,
  duration = 3000,
  className,
}) => {
  const classes = useStyel({ loading: loading });

  const { state: progress, animate } = useAnimate(
    (salt) => {
      if (salt === undefined) return 0;
      return Math.round(100 * salt);
    },
    { duration: duration },
  );

  useEffect(() => {
    if (loading) animate();
  }, [loading]);

  return (
    <div className={classNames(className, classes.root)}>
      <CircularProgress
        classes={{ root: classes.fspLoading }}
        value={progress}
        variant="determinate"
      />
      <Typography
        classes={{ root: classes.fspLoadingText }}
        variant="caption"
        component="div"
      >
        {`${Math.round(progress)}%`}
      </Typography>
    </div>
  );
};

export default CircularProgressWithNumber;
