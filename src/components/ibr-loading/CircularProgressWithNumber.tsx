import useAnimate from '@hooks/useAnimate';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { DefaultTheme } from '@mui/styles/defaultTheme';
import makeStyles from '@mui/styles/makeStyles';
import { FC, useEffect } from 'react';

interface CircularProgressWithNumber {
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
});

const CircularProgressWithNumber: FC<CircularProgressWithNumber> = ({
  loading,
  duration = 3000,
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
    <>
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
    </>
  );
};

export default CircularProgressWithNumber;
