import { DataResponse, EditBaseReq, EditWorkspaceReq } from '@ibr-types/index';

export interface PromiseService<
  P extends any[] = [],
  R extends any = DataResponse
> {
  (...args: P): Promise<R>;

  [key: string]: any;
}

export interface AbortPromiseService<
  P extends any[] = [],
  R extends any = DataResponse
> {
  (signal: AbortSignal, ...args: P): Promise<R>;

  [key: string]: any;
}

export interface UIService<P extends any[] = []> {
  loading: boolean;
  error: any;

  (...args: P): void;
}

export interface Service<R = void, P extends any[] = []> {
  (...args: P): Promise<R> | R | void;
}

export interface WorkspaceService extends PromiseService<[], void> {
  ids: string[];
}

export type PromiseResponse = {
  loading: boolean;
  error: any;
};

export interface EditBaseService extends PromiseService<[EditBaseReq]> {
  workspaceId: string | undefined;
  baseId: string;
}
