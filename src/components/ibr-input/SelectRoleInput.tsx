import ListItemText from '@mui/material/ListItemText';
import Menu, { MenuProps } from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@mui/material/styles/styled';
import useForkRef from '@mui/material/utils/useForkRef';
import {
  ElementType,
  FocusEvent,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  KeyboardEvent,
  LegacyRef,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

interface SelectRoleInputProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  autoFocus?: boolean;
  autoWidth?: boolean;
  disabled?: boolean;
  IconComponent?: ElementType;
  MenuProps?: Partial<MenuProps>;
  name?: string;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  tabIndex?: number;
  value?: number;
}

const SelectSelect = styled('div')({
  flex: 'auto',
  outline: 'none',
});

const SelectIcon = styled('svg')<{ open: boolean }>(({ open }) => ({
  flex: 'none',
  transform: open ? 'rotate(180deg)' : undefined,
  height: '18px',
  width: '18px',
}));

const SelectRoot = styled('div')({
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  padding: '0.25rem',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: 1.5,
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: '#fff',
  boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
  borderRadius: '3px',
  width: '66px',
});

const roles = [
  {
    role: 0,
    tilte: '管理',
    des: '可以完全配置和编辑此文件库',
  },
  {
    role: 1,
    tilte: '编辑',
    des: '可以编辑记录和视图，但不能配置表或字段',
  },
  {
    role: 2,
    tilte: '评论',
    des: '可以评论记录并创建个人视图',
  },
  {
    role: 3,
    tilte: '查看',
    des: '仅查看记录和视图,无法编辑或评论',
  },
];

const SelectRoleInput: ForwardRefRenderFunction<unknown, SelectRoleInputProps> =
  (
    {
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      autoWidth,
      disabled,
      IconComponent,
      MenuProps = {},
      name,
      onBlur,
      onChange,
      onFocus,
      readOnly,
      tabIndex: tabIndexProp,
      value = 0,
      autoFocus,
      ...other
    },
    ref,
  ) => {
    const displayRef = useRef<Element>();
    const [menuMinWidthState, setMenuMinWidthState] = useState<number>();
    const [openState, setOpenState] = useState(false);
    const handleDisplayRef = useForkRef(ref, displayRef);

    useEffect(() => {
      if (autoFocus) {
        if (displayRef.current) (displayRef.current as HTMLElement).focus();
      }
    }, [autoFocus]);

    const update = (open: boolean) => {
      setMenuMinWidthState(
        autoWidth ? undefined : displayRef.current?.clientWidth,
      );
      setOpenState(open);
    };

    const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
      // Ignore everything but left-click
      if (event.button !== 0) {
        return;
      } // Hijack the default focus behavior.

      event.preventDefault();
      if (displayRef.current) (displayRef.current as HTMLElement).focus();
      update(true);
    };

    const handleClose = () => {
      update(false);
    };

    const handleItemClick = (event: MouseEvent<HTMLElement>) => {
      if (!event.currentTarget.hasAttribute('tabindex')) {
        return;
      }
      const newValue = Number((event.currentTarget as HTMLButtonElement).value);

      if (value !== newValue) {
        if (onChange) {
          onChange(newValue);
        }
      }

      update(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      if (!readOnly) {
        const validKeys = [' ', 'ArrowUp', 'ArrowDown', 'Enter'];

        if (validKeys.indexOf(event.key) !== -1) {
          event.preventDefault();
          update(true);
        }
      }
    };

    const handleBlur = (event: FocusEvent<HTMLElement>) => {
      // if open event.stopImmediatePropagation
      if (!open && onBlur) {
        // Preact support, target is read only property on a native event.
        Object.defineProperty(event, 'target', {
          writable: true,
          value: {
            value,
            name,
          },
        });
        onBlur(event);
      }
    };

    delete other['aria-invalid'];

    let tabIndex;

    if (typeof tabIndexProp !== 'undefined') {
      tabIndex = tabIndexProp;
    } else {
      tabIndex = disabled ? undefined : 0;
    }

    const buttonId = name ? `mui-component-select-${name}` : undefined;

    return (
      <SelectRoot
        ref={handleDisplayRef as LegacyRef<HTMLDivElement>}
        onKeyDown={handleKeyDown}
        onMouseDown={disabled || readOnly ? undefined : handleMouseDown}
      >
        <SelectSelect
          tabIndex={tabIndex}
          role="button"
          aria-disabled={disabled ? 'true' : undefined}
          aria-expanded={openState ? 'true' : 'false'}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          onBlur={handleBlur}
          onFocus={onFocus}
          id={buttonId}
        >
          <span>{roles[value].tilte}</span>
        </SelectSelect>
        <SelectIcon as={IconComponent} open={openState} />
        <Menu
          id={`menu-${name || ''}`}
          anchorEl={displayRef.current}
          open={openState}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            style: {
              minWidth: menuMinWidthState,
              ...(MenuProps.PaperProps && MenuProps.PaperProps.style),
            },
            ...MenuProps.PaperProps,
          }}
          {...{
            ...MenuProps,
            MenuListProps: {
              role: 'listbox',
              disableListWrap: true,
              ...MenuProps.MenuListProps,
            },
          }}
          sx={{
            ['& .MuiMenu-list']: {
              padding: 0,
              whiteSpace: 'nowrap',
            },
          }}
        >
          {roles.map((role) => (
            <MenuItem
              key={role.role}
              value={role.role}
              aria-selected={value == role.role ? 'true' : undefined}
              onKeyUp={(event: KeyboardEvent<HTMLElement>) => {
                if (event.key === ' ') {
                  // otherwise our MenuItems dispatches a click event
                  // it's not behavior of the native <option> and causes
                  // the select to close immediately since we open on space keydown
                  event.preventDefault();
                }
              }}
              role="option"
              selected={value == role.role}
              onClick={handleItemClick}
              sx={{
                padding: '9px 20px 6px 8px',
                textDecoration: 'none',
              }}
            >
              <ListItemText
                primary={role.tilte}
                secondary={role.des}
                sx={{
                  ['& .MuiListItemText-secondary']: {
                    opacity: 0.75,
                  },
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </SelectRoot>
    );
  };

export default forwardRef(SelectRoleInput);
