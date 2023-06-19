import {
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  PropsWithChildren,
} from 'react';
import { styled } from '../styles';

export interface TabGuardCompCallback {
  forceFocusOutOfContainer(): void;
}

interface TabGuardProps {
  onTabKeyDown: (e: KeyboardEvent) => void;
}

const TabGuardCompStyles = styled('div')({});

const TabGuardComp: ForwardRefRenderFunction<
  TabGuardCompCallback,
  PropsWithChildren<TabGuardProps>
> = ({ children }) => {
  return (
    <>
      <TabGuardCompStyles />
      {children}
      <TabGuardCompStyles />
    </>
  );
};

export default memo(forwardRef(TabGuardComp));
