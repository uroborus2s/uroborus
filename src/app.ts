import { preLoad } from '@/domain';

export function onRouteChange() {
  preLoad().then();
}
