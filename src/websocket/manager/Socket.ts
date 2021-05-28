import Emitter from 'component-emitter';
import Websocket from "./websocket";

export default class Socket extends Emitter {
  constructor(uri: string, opts = {}) {
    super();
    if (typeof addEventListener === 'function') {
      addEventListener('beforeunload', () => {});
    }
    this.open();
  }

  open() {
    let transport;
    try {
      transport=new Websocket()
    }
  }
}
