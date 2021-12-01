import AddIcon from '@ibr/ibr-icon/AddIcon';
import IosSwitch from '@ibr/ibr-switch/IosSwitch';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import Popover from '@mui/material/Popover';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import uniqueid from 'lodash.uniqueid';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FiledComponentProps } from '../types';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

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
  gridColumnGap: '1rem',
  padding: '0.5rem',
});

const SingleSelectFiled: FC<FiledComponentProps> = ({
  setParameters,
  parameters,
}) => {
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

  const handleClose = () => {
    setColorEl(null);
  };

  const onDragEnd = () => {};

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <Typography sx={{ opacity: 0.75, marginBottom: '0.5rem' }}>
        单选列表允许您从下拉列表中选择单一选项。
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
        <div style={{ flex: 'auto' }}></div>
        <Button
          variant="contained"
          startIcon={<SwapVertRoundedIcon />}
          size="small"
          color="inherit"
          disableElevation
          disableRipple
          disableTouchRipple
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
        }}
      >
        {parameters.choiceOrder && parameters.choiceOrder.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="column-single-select-item">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {(parameters.choiceOrder as string[]).map((id, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <EditSelectItem ref={provided.innerRef}>
                          <DragIndicatorIcon
                            sx={{
                              opacity: 0.5,
                              fontSize: '13px',
                              marginRight: '0.25rem',
                            }}
                          />
                          {!parameters.disableColors && (
                            <IconButton
                              size="small"
                              disableRipple
                              disableFocusRipple
                              sx={{
                                backgroundColor: '#cfdfff',
                                padding: 0,
                                marginRight: '0.25rem',
                                '&:hover': {
                                  backgroundColor: 'rgba(207,223, 255, 0.4)',
                                },
                              }}
                              onClick={handleClick}
                            >
                              <ArrowDropDownRoundedIcon
                                sx={{ fontSize: '16px' }}
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
                          />
                          <ClearRoundedIcon
                            sx={{
                              marginLeft: '0.25rem',
                              opacity: 0.6,
                              fontSize: '16px',
                              cursor: 'pointer',
                            }}
                          />
                        </EditSelectItem>
                      )}
                    </Draggable>
                  ))}
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
            const uId = uniqueid('ssf');
            console.log(parameters);
            setParameters((pState) => ({
              ...pState,
              choiceOrder: [...pState.choiceOrder, uId],
              choices: {
                ...pState.choices,
                uId: { id: uId, name: '', color: 'blue' },
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
        <ColorPopover />
      </Popover>
    </div>
  );
};

export default SingleSelectFiled;
