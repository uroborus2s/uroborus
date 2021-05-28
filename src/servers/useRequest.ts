import { useRequest as useUmiRequest } from 'ahooks';

export function useRequest(service: any, options: any = {}) {
  const { loading, data, ...res } = useUmiRequest(service, {
    // refreshOnWindowFocus: true,
    // focusTimespan: 600000,
    ...options,
  });

  return { loading, data, ...res };
}
