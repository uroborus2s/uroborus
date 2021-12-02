import { textColors } from '@/core/util';
import { generateUUID } from '@/core/util/date';
import { textSort } from '@/core/util/sort';
import { SelectOptions } from '@/domain/types';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import IosSwitch from '@ibr/ibr-switch/IosSwitch';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import { ChangeEvent, FC, memo, MouseEvent, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { FiledComponentProps } from '../types';

const ColorOptionCol = styled('div')({
  display: 'flex',
  padding: '0.5rem 0',
  alignItems: 'center',
});

const EditSelectItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '32px',
});

const ColorPopover = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(10,36px)',
  gridTemplateRows: 'repeat(4,36px)',
  gridColumnGap: '0.5rem',
  padding: '0.5rem',
  placeItems: 'center',
});

const SingleSelectFiled: FC<
  FiledComponentProps<SelectOptions> & { text: string }
> = ({ setParameters, parameters, text }) => {
  useEffect(() => {
    setParameters({
      //选择项目排序顺序
      choiceOrder: [],
      //是否包含颜色属性
      disableColors: false,
      //选择项目属性，字段结构：{id:string,name:string,color:string}
      choices: {},
    });
  }, []);

  const [colorEl, setColorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setColorEl(event.currentTarget);
  };

  const handleClearItem = (id: string) => {
    setParameters((p) => {
      const order = [...p.choiceOrder];
      const newChoices = { ...p.choices };
      order.splice(
        order.findIndex((oId) => oId === id),
        1,
      );
      delete newChoices[id];
      return {
        choiceOrder: order,
        choices: newChoices,
        disableColors: p.disableColors,
      };
    });
  };

  const handleChangeItemName = (
    enent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
  ) => {
    setParameters((p) => {
      let currentItem = p.choices[id];
      if (currentItem) {
        currentItem = { ...currentItem, name: enent.target.value };
        p.choices[id] = currentItem;
        return { ...p };
      } else return p;
    });
  };

  //点击颜色标记按钮
  const handleClose = () => {
    setColorEl(null);
  };

  const [sortType, setSortType] = useState<'asce' | 'desc'>('asce');

  //点击排序按钮
  const handleSortSelectItem = () => {
    const itemNames = parameters.choiceOrder.map((id) => ({
      name: parameters.choices[id].name,
      id: id,
    }));
    const res = textSort(itemNames, sortType, (data) => data.name);
    if (sortType == 'asce') setSortType('desc');
    else setSortType('asce');
    setParameters((p) => ({ ...p, choiceOrder: res.map((r) => r.id) }));
  };

  const textColorType = Object.keys(textColors);

  const onDragEnd = (
    { destination, source }: DropResult,
    provided: ResponderProvided,
  ) => {
    if (!destination || destination.index === source.index) {
      return;
    }
    const order = Array.from(parameters.choiceOrder);
    const [moved] = order.splice(source.index, 1);
    order.splice(destination.index, 0, moved);

    setParameters((p) => ({ ...p, choiceOrder: order }));
  };

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <Typography sx={{ opacity: 0.75, marginBottom: '0.5rem' }}>
        {text}
      </Typography>
      <ColorOptionCol>
        <IosSwitch
          checked={!parameters.disableColors}
          onChange={(event, checked) => {
            setParameters((pstate) => ({ ...pstate, disableColors: !checked }));
            event.preventDefault();
            event.stopPropagation();
          }}
        />
        <Typography sx={{ opacity: 0.8, marginLeft: '0.25rem' }}>
          是否配置颜色属性
        </Typography>
        <div style={{ flex: 'auto' }} />
        <Button
          variant="contained"
          startIcon={<SwapVertRoundedIcon />}
          size="small"
          color="inherit"
          disableRipple
          disableTouchRipple
          disableElevation
          onClick={handleSortSelectItem}
        >
          按首字母排序
        </Button>
      </ColorOptionCol>
      <List
        sx={{
          padding: '0.25rem 0',
          borderBottomWidth: '2px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'rgba(0,0,0,0.05)',
          borderTopWidth: '2px',
          borderTopStyle: 'solid',
          borderTopColor: 'rgba(0,0,0,0.05)',
          maxHeight: '460px',
          overflow: 'auto',
        }}
        className="scrollbar"
      >
        {parameters.choiceOrder && parameters.choiceOrder.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="column-single-select-item"
              type="SELECT-ITEM"
            >
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <SelectItemList
                    parameters={parameters}
                    onClearItem={handleClearItem}
                    onOpenColorPover={handleClick}
                    onChangeName={handleChangeItemName}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div
            style={{
              margin: '0.5rem 0',
              opacity: 0.3,
              textAlign: 'center',
              fontSize: '11px',
            }}
          >
            未定义任何选项
          </div>
        )}
        <ListItemButton
          sx={{
            padding: '0.25rem 0',
            fontWeight: 500,
            borderRadius: '6px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          }}
          onClick={() => {
            const uId = generateUUID('ssf', 16);
            setParameters((pState) => ({
              ...pState,
              choiceOrder: [...pState.choiceOrder, uId],
              choices: {
                ...pState.choices,
                [uId]: {
                  id: uId,
                  name: '',
                  color:
                    textColorType[
                      pState.choiceOrder.length >= 40
                        ? pState.choiceOrder.length - 40
                        : pState.choiceOrder.length
                    ],
                },
              },
            }));
          }}
        >
          <AddIcon sx={{ fontSize: '12px', margin: '0 0.5rem' }} />
          添加选项
        </ListItemButton>
      </List>
      <Popover
        open={!!colorEl}
        anchorEl={colorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ColorPopover>
          {Object.entries(textColors).map(([type, color], index) => (
            <div
              key={index}
              style={{
                fontSize: '4px',
                backgroundColor: color,
                cursor: 'pointer',
                borderRadius: '9999px',
                height: '18px',
                width: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                padding: '0 0.5rem',
              }}
              onClick={(e) => {
                e.stopPropagation();
                const id = colorEl?.dataset.id;
                if (id)
                  setParameters((p) => ({
                    ...p,
                    choices: {
                      ...p.choices,
                      [id]: { ...p.choices[id], color: type },
                    },
                  }));
                handleClose();
              }}
            >
              文
            </div>
          ))}
        </ColorPopover>
      </Popover>
    </div>
  );
};

export default SingleSelectFiled;

const SelectItemList = memo(
  ({
    parameters,
    onClearItem,
    onOpenColorPover,
    onChangeName,
  }: {
    parameters: SelectOptions;
    onOpenColorPover: (event: MouseEvent<HTMLElement>) => void;
    onClearItem: (id: string) => void;
    onChangeName: (
      enent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: string,
    ) => void;
  }) => {
    const { choiceOrder, disableColors, choices } = parameters;

    return (
      <>
        {choiceOrder.map((id, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => (
              <EditSelectItem
                ref={provided.innerRef}
                {...provided.draggableProps}
              >
                <div {...provided.dragHandleProps}>
                  <DragIndicatorIcon
                    sx={{
                      opacity: 0.5,
                      fontSize: '13px',
                      marginRight: '0.25rem',
                    }}
                  />
                </div>
                {!disableColors && (
                  <IconButton
                    size="small"
                    disableRipple
                    disableFocusRipple
                    sx={{
                      backgroundColor:
                        textColors[parameters.choices[id]['color']],
                      padding: 0,
                      marginRight: '0.25rem',
                      '&:hover': {
                        opacity: 0.7,
                        backgroundColor:
                          textColors[parameters.choices[id]['color']],
                      },
                    }}
                    data-id={id}
                    onClick={onOpenColorPover}
                  >
                    <ArrowDropDownRoundedIcon
                      sx={{ fontSize: '16px', color: '#fff' }}
                    />
                  </IconButton>
                )}
                <Input
                  sx={{
                    flex: 'auto',
                    padding: 0,
                    borderRadius: '3px',
                    backgroundColor: 'rgba(0,0,0,0)',
                    '&.Mui-focused': {
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: 'rgba(0,0,0,0.1)',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                  placeholder="空"
                  disableUnderline
                  value={choices[id].name}
                  onChange={(event) => {
                    onChangeName(event, id);
                  }}
                />
                <ClearRoundedIcon
                  sx={{
                    marginLeft: '0.25rem',
                    opacity: 0.6,
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onClearItem(id);
                  }}
                />
              </EditSelectItem>
            )}
          </Draggable>
        ))}
      </>
    );
  },
);
