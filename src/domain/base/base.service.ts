import {
  DataResponse,
  EditBaseReq,
  EditBaseService,
  PromiseResponse,
} from '@ibr-types/index';
import { useRecoilCallback } from 'recoil';
import { api, request } from '@ibr-request/index';
import { useEffect, useState } from 'react';

export function useEditBaseService(
  baseId: string,
  workId?: string,
): EditBaseService {
  const editBaseRequestService = useRecoilCallback(
    ({ set }) => async (data: EditBaseReq) => {
      if (baseId)
        try {
          const resp = await request(api.path.base(baseId), {
            method: 'put',
            data: data,
          });
          if (data.name)
            if (data.color)
              if (data.icon) if (data.desc) return resp.data as DataResponse;
        } catch (err) {
          console.error(err);
          throw err;
        }
    },
    [],
  ) as EditBaseService;

  editBaseRequestService.workspaceId = workId;
  editBaseRequestService.baseId = baseId;

  return editBaseRequestService;
}

// export function useGetCurrentBaseService(baseId: string) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(true);
//
//   useEffect(() => {
//     const abortController = new AbortController();
//     let isUnmounted = false;
//     fetchCurrentBase(abortController.signal, baseId)
//       .then(() => {
//         if (!isUnmounted) setLoading(false);
//       })
//       .catch((error) => {
//         console.log(`请求/workspace发生错误，错误信息：${error}`);
//         if (!isUnmounted) setError(error);
//       });
//
//     return () => {
//       console.time('清理workspace localStorage');
//       isUnmounted = true;
//       abortController.abort();
//       clearAllWorkspace().then(() => {
//         console.timeEnd('清理workspace localStorage');
//       });
//     };
//   }, []);
//
//   const service: PromiseResponse = {
//     loading: loading,
//     error: error,
//   };
//
//   return service;
// }
