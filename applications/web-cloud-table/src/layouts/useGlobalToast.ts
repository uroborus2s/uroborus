import { atom, useRecoilCallback } from 'recoil';

type Severity = 'error' | 'warning' | 'info' | 'success';

export interface GlobalToastState {
  open: boolean;
  message: string;
  severity: Severity;
  key: number;
}

export const globalToastState = atom<GlobalToastState>({
  key: 'GlobalToastState',
  default: {
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  },
});

export const messageSnackPack = atom<GlobalToastState[]>({
  key: 'MessageSnackPack',
  default: [],
});

export default function () {
  const hanldeOpen = useRecoilCallback(
    ({ set }) =>
      (message: string, severity?: Severity) => {
        set(messageSnackPack, (prev) => {
          prev.push({
            open: true,
            message: message,
            severity: severity ?? 'success',
            key: new Date().getTime(),
          });
          return prev;
        });
      },
  );

  return hanldeOpen;
}
