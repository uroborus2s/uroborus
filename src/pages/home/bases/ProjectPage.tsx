import { useRefFun } from '@/core/hooks';
import { CommonProps } from '@/core/ibr-types';
import filterSearchValue from '@/core/util/filterSearchValue';
import { base, READWORKSPACELIST, useDispath, workspaces } from '@/domain';
import Loading from '@/Loading';
import { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import { VirtualList } from '@ibr/ibr-virtual-list/types';
import useAutocomplete from '@mui/material/useAutocomplete';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import {
  FC,
  LegacyRef,
  MouseEventHandler,
  Ref,
  useEffect,
  useRef,
} from 'react';
import { useRecoilValue } from 'recoil';
import useBaseItemWidth from '../hooks/useBaseItemWidth';
import {
  DataType,
  maxScreen,
  middleScreen,
  OriginDataType,
  ResultDataType,
} from '../types';
import SearchBaseList from './detailsList/SearchBaseList';
import WorkspaceDetailsList from './detailsList/WorkspaceDetailsItem';
import SearchInput from './itemList/SearchInput';
import WorkspaceList from './itemList/WorkspaceList';

const useStyels = makeStyles({
  root: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    textAlign: 'left',
  },
  left: {
    pointerEvents: 'none',
    zIndex: 1,
    position: 'fixed',
    left: 0,
    right: 0,
    top: 48,
    bottom: 0,
    padding: '2rem 1rem',
    [`@media (max-width: ${middleScreen}rem)`]: { display: 'none' },
  },
  leftMaxwidth: {
    maxWidth: `${maxScreen - 2}rem`,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  leftFlexContainer: {
    pointerEvents: 'all',
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
  },
  rightContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    outlineColor: 'initial',
    outlineStyle: 'initial',
    outlineWidth: '0px',
    overflow: 'hidden',
  },
});

function tranArray<T extends OriginDataType>(
  datas: T[],
  t: DataType,
): ResultDataType[] {
  return datas.map((data) => ({ ...data, type: t }));
}

const ProjectPage: FC<CommonProps> = ({ className }) => {
  const { loading, error } = useDispath(READWORKSPACELIST);
  const workspacesDatas = useRecoilValue(workspaces.workspaces);

  const baseIds = useRecoilValue(workspaces.baseIdsAll);
  const baseDatas = useRecoilValue(base.bases(baseIds));

  const classes = useStyels();

  const { groupedOptions, getInputProps, getClearProps, inputValue } =
    useAutocomplete({
      getOptionLabel: (option) =>
        typeof option == 'string' ? option : option.name,
      options: [
        ...tranArray(workspacesDatas, 'workspace'),
        ...tranArray(baseDatas, 'base'),
      ],
      id: 'home-list-of-fit',
      filterOptions: filterSearchValue,
      freeSolo: true,
      open: true,
    });

  const dirty = inputValue !== '';

  const containerRef = useRef<HTMLDivElement>();

  const workspaceListRef = useRef<VirtualList>();

  useEffect(() => {
    console.log('初始化ProjectPage');
  }, []);

  const wItemRect = useBaseItemWidth(containerRef);

  const filterWorkspaces = (groupedOptions as ResultDataType[]).filter(
    (item) => item.type == 'workspace',
  );

  const filterBases = (groupedOptions as ResultDataType[]).filter(
    (item) => item.type == 'base',
  );

  const handleScrollToItem = useRefFun((id: string) => {
    if (dirty) return;
    if (workspaceListRef.current) {
      const index = workspacesDatas.findIndex((w) => w.id == id);
      workspaceListRef.current.scrollToItem(index);
    }
  });

  const addWorkspaceRef = useRef<HandleFun>();

  const handlerAddWorkspace: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    addWorkspaceRef.current?.open();
  };

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.left}>
        <div className={classes.leftMaxwidth}>
          <div className={classes.leftFlexContainer}>
            <SearchInput
              clearProps={{ ...getClearProps() }}
              inputProps={{ ...getInputProps() }}
              dirty={dirty}
            />
            {loading ? (
              <Loading />
            ) : (
              <WorkspaceList
                dirty={dirty}
                workspaces={filterWorkspaces}
                matchingValue={inputValue}
                onClick={handleScrollToItem}
                addWorkspaceClick={handlerAddWorkspace}
                ref={addWorkspaceRef as Ref<HandleFun>}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={classes.rightContainer}
        ref={containerRef as LegacyRef<HTMLDivElement>}
      >
        {loading ? (
          <Loading />
        ) : dirty ? (
          <SearchBaseList leftOffset={wItemRect.itemLeft} />
        ) : (
          <WorkspaceDetailsList
            ref={workspaceListRef as Ref<any>}
            addWorkspaceClick={handlerAddWorkspace}
            {...wItemRect}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
