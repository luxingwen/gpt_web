import WebSocketClient from './WebSocketClient';

import { STATUS, WS_CMD } from './constant';

const wsRootUrl = 'wss://chat.kimways.com/acc';

const NOT_LOGIN = 1000;

const getTimestampId = (id) => {
  return `${id}${Date.now()}`;
};

class Socket {
  constructor(url) {
    this.url = url;
    this.socketClient = null;
    this.handlers = [];
    this.socketOpen = false;
    this.timer = null;
  }

  async create(id) {
    if (this.socketClient) return this.socketClient;

    this.id = id;
    const socket = await this.setSocket();
    return socket;
  }

  connectSocket() {
    console.log('api.wsRootUrl >>>>', wsRootUrl);
    const socketTask = new WebSocketClient(this.url);
    this.socketClient = socketTask;
    return socketTask.connect();
  }

  setSocket() {
    if (this.socketClient) {
      this.socketClient.close();
      this.socketClient = null;
    }

    return new Promise(async (resolve, reject) => {
      await this.connectSocket();

      this.socketClient.addMessageHandler((msg) => {
        //  console.log('socketTask.onMessage >>>', msg);
        const data = JSON.parse(msg);
        switch (data.cmd) {
          case WS_CMD.LOGIN:
            this.handleLogin(data);
            break;
          case WS_CMD.PING:
            this.handlePing(data);
            break;
          case WS_CMD.HEART_BEAT:
            this.handleHeartBeat(data);
            break;
          case WS_CMD.MSG:
            this.handleMsg(data);
            break;
          default:
        }
      });

      this.socketClient.addOpenHandler(async () => {
        const response = await this.sendLogin();
        resolve(response);
      });

      this.socketClient.addErrorHandler((error) => {
        console.log('socketTask.onError >>>', error);
        reject(error);
      });
    });
  }

  async sendLogin() {
    const response = await this.handleSend(WS_CMD.LOGIN, {
      userId: `${this.id}`,
      appId: 101,
    });
    return response;
  }

  handleMsg(data) {
    this.handlers.forEach((h) => {
      h(data);
    });
  }

  handleLogin(data) {
    const isSuccess = data.response.code === STATUS.SUCCESS;
    if (isSuccess) {
      this.socketOpen = true;
    }
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      console.log('send heart beat');
      this.handleSend(WS_CMD.HEART_BEAT, { userId: `${this.id}` });
    }, 10000);
  }

  addHandler(fn) {
    this.handleRemoveHandler(fn.name);
    this.handlers.push(fn);
    console.log('this.handlers >>>>>>>', this.handlers);
  }

  handleSend(cmd, reqData = {}) {
    return new Promise((resolve, reject) => {
      if (!this.socketOpen) resolve();

      const data = JSON.stringify({
        seq: getTimestampId(this.id),
        cmd,
        data: reqData,
      });

      this.socketClient.send(data, {
        success: (msg) => resolve(msg),
        fail: async (error) => resolve(await this.setSocket()),
      });
    });
  }

  handleHeartBeat(data) {
    if (data.response.code === NOT_LOGIN) {
      this.setSocket();
    }
  }

  handleRemoveHandler(name) {
    console.log(
      'this.handlers >>>>>> before',
      this.handlers.map((h) => h.name),
      name,
    );
    this.handlers = this.handlers.filter((h) => h.name !== name);
    console.log(
      'this.handlers >>>>>> after',
      this.handlers.map((h) => h.name),
    );
  }
}

export const wssocket = new Socket(wsRootUrl);
