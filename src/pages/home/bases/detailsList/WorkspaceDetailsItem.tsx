import { workspaces as workspacesObject } from '@/domain';
import { WorkspaceItemRect } from '@/pages/home/hooks/useBaseItemWidth';
import { VirtualList } from '@ibr/ibr-virtual-list/types';
import VariableSizeList from '@ibr/ibr-virtual-list/VariableSizeList';
import AddIcon from '@mui/icons-material/Add';
import makeStyles from '@mui/styles/makeStyles';
import trimEnd from 'lodash.trimend';
import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  MouseEventHandler,
  Ref,
  useCallback,
  useEffect,
} from 'react';
import { useRecoilValue } from 'recoil';
import {
  maxScreen,
  middleScreen,
  minScreen,
  OriginDataType,
} from '../../types';
import { alignmentState } from '../itemList/SearchInput';
import BaseList from './baseList/BaseList';
import BaseSmallList from './baseList/BaseSmallList';
import WorkspaceTitle from './title/WorkspaceTitle';

const calcWorkspaceItemHeightOfGrid = (
  listWidth: number,
  baseNumber: number,
  globalFontSize: number,
) => {
  const maxWidth = maxScreen * globalFontSize;
  const midieWidth = middleScreen * globalFontSize;
  const minWidth = minScreen * globalFontSize;

  let height = 0;
  let row = 1;
  if (baseNumber !== undefined && baseNumber !== null) {
    if (listWidth >= maxWidth) {
      row = 6;
    } else if (listWidth >= midieWidth) {
      row = 5;
    } else if (listWidth >= minWidth) {
      row = 4;
    } else {
      row = 3;
    }

    baseNumber += 1;
    height = 299 + 171 * (Math.ceil(baseNumber / row) - 1);
  }
  return height;
};

const calcWorkspaceItemHeightOfList = (
  width: number,
  itemNum: number,
  globalFontSize: number,
) => {
  const midieWidth = middleScreen * globalFontSize;

  let height = 0;
  let row = 1;
  if (itemNum !== undefined && itemNum !== null) {
    if (width >= midieWidth) {
      row = 2;
    } else {
      row = 1;
    }

    itemNum += 1;
    height = 184 + 56 * (Math.ceil(itemNum / row) - 1);
  }
  return height;
};

interface WorkspaceDetailsListProps extends WorkspaceItemRect {
  addWorkspaceClick: MouseEventHandler<HTMLElement>;
}

interface ItemProps {
  workspace: OriginDataType;
  alignment: 'grid' | 'list';
}

const useStytel = makeStyles({
  workspaceContainer: {
    position: 'relative',
    marginBottom: '4rem',
  },
  header: {
    marginBottom: '1rem',
    '& > div': {
      display: 'flex',
      padding: '0.5rem 0',
      alignItems: 'center',
      width: '100%',
    },
  },
  baseContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-0.5rem',
    marginRight: '-0.5rem',
  },
});

const WorkspaceDetailsItem: FC<ItemProps> = (props) => {
  const { workspace, alignment } = props;
  const classes = useStytel();

  // useEffect(() => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     console.log('初始化WorkspaceDetailsItem');
  //   }
  // }, []);

  return (
    <div className={classes.workspaceContainer}>
      <div className={classes.header}>
        <div>
          <WorkspaceTitle data={workspace} />
        </div>
      </div>
      <div className={classes.baseContainer}>
        {alignment == 'grid' ? (
          <BaseList workspaceId={workspace.id} />
        ) : (
          <BaseSmallList workspaceId={workspace.id} />
        )}
      </div>
    </div>
  );
};

const useListStyel = makeStyles({
  addWorkspaceButton: {
    padding: '0.5rem 0',
    marginBottom: '8rem',
    fontSize: '1.4rem',
    fontWeight: 500,
    opacity: 0.5,
    cursor: 'pointer',
    lineHeight: 1.25,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover,&:focus': {
      opacity: 1,
    },
  },
});

const WorkspaceDetailsList: ForwardRefRenderFunction<
  any,
  WorkspaceDetailsListProps
> = (
  { itemWidth, itemLeft, listWidth, listHeight, addWorkspaceClick },
  ref,
) => {
  const alignment = useRecoilValue(alignmentState);
  const classes = useListStyel();
  const workspaces = useRecoilValue(workspacesObject.workspaces);

  const getItemSize = useCallback(
    (index: number) => {
      const globalFontSize = Number(
        trimEnd(
          getComputedStyle(document.documentElement).fontSize.trim(),
          'px',
        ).trim(),
      );
      let height;
      if (index === workspaces.length) {
        height = 180;
      } else if (alignment === 'grid') {
        height = calcWorkspaceItemHeightOfGrid(
          listWidth,
          workspaces[index].baseNumber,
          globalFontSize,
        );
      } else {
        height = calcWorkspaceItemHeightOfList(
          listWidth,
          workspaces[index].baseNumber,
          globalFontSize,
        );
      }
      return height;
    },
    [alignment, listWidth, workspaces],
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('初始化WorkspaceDetailsList');
    }
  }, []);

  const itemCount = workspaces.length + 1;

  return (
    <VariableSizeList
      key={alignment}
      ref={ref as Ref<VirtualList>}
      height={listHeight}
      itemCount={itemCount}
      itemSize={getItemSize}
      width={listWidth}
      className="scrollbar"
      sx={{
        overflowX: 'hidden',
        overflowY: 'auto',
        '& .IuiVirtualList-content': {
          marginTop: '2rem',
          position: 'relative',
        },
        '& .IuiVirtualList-item': {
          left: itemLeft,
          width: itemWidth,
        },
      }}
    >
      {({ index }) =>
        index == itemCount - 1 ? (
          <div
            className={classes.addWorkspaceButton}
            onClick={addWorkspaceClick}
          >
            <AddIcon sx={{ marginRight: '0.5rem' }} />
            新建工作区
          </div>
        ) : (
          <WorkspaceDetailsItem
            key={workspaces[index].id}
            workspace={workspaces[index]}
            alignment={alignment}
          />
        )
      }
    </VariableSizeList>
  );
};

export default memo(forwardRef(WorkspaceDetailsList));
