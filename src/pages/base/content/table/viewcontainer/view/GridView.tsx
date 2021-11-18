import { Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Property } from 'csstype';

interface StyelProps {
  width: Property.Width;
}

const useStyel = makeStyles({
  gridRoot: {
    fontSize: '13px',
    zIndex: 4,
    borderColor: 'inherit',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  verticalScrollButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '32px',
    bottom: 0,
    zIndex: 4,
    pointerEvents: 'none',
    opacity: 0.7,
    transition: 'opacity 200ms ease-in-out',
  },
  dataContainer: {
    borderColor: 'inherit',
    position: 'absolute',
    top: 0,
    bottom: '34px',
    left: 0,
    right: 0,
  },
  leftPaneWrapper: (props: StyelProps) => ({
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: '1px',
    zIndex: 3,
    boxShadow: '4px 0 0 0 transparent',
    transition: 'border-color, box-shadow 200ms ease-in-out',
    overflow: 'visible',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: props.width,
  }),
  divider: (props) => ({
    marginLeft: '-1px',
    left: props.width,
    opacity: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '6px',
    overflow: 'visible',
    '&:hover': {
      opacity: 1,
      cursor: 'grabbing',
    },
    '& .pane-line': {
      height: '100%',
      width: '2px',
      backgroundColor: '#aaa',
      pointerEvents: 'none',
    },
    '& .drag-handle': {
      top: '255px',
      left: '-2px',
      borderRadius: '10px',
      width: '6px',
      height: '32px',
      backgroundColor: '#2d7ff9',
      position: 'absolute',
      zIndex: 4,
    },
  }),
});

const GridView = () => {
  const ownerState = { width: '288px' };

  const classes = useStyel(ownerState);

  return (
    <div className={classes.gridRoot}>
      <div className={classes.dataContainer}>
        <div className={classes.leftPaneWrapper} />
        <div className={classes.divider}>
          <div className="pane-line" />
          <Tooltip title="拖动调整冻结列数" placement="right-end">
            <div className="drag-handle" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default GridView;
