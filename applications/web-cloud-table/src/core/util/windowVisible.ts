import { isDocumentVisible, isOnline } from '@/core/util/index';

type ListenerFun = () => void;

const listeners: ListenerFun[] = [];

function subscribe(listener: ListenerFun) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

let eventsBinded = false;

if (typeof window !== 'undefined' && window.addEventListener && !eventsBinded) {
  const revalidate = function revalidate() {
    if (!isDocumentVisible() || !isOnline()) return;

    listeners.forEach((listener) => listener());
  };

  document.addEventListener('visibilitychange', revalidate, false);

  // only bind the events once
  eventsBinded = true;
}

export default subscribe;
