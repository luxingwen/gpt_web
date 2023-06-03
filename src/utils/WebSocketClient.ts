class WebSocketClient {
  static instance = null;

  constructor(url) {
    if (WebSocketClient.instance) {
      return WebSocketClient.instance;
    }

    this.url = url;
    this.socket = null;
    this.messageHandlers = [];
    this.openHandlers = [];
    this.closeHandlers = [];
    this.errorHandlers = [];
    this.heartbeatInterval = null; // 定时器 ID
    this.heartbeatTimeout = 10000; // 心跳间隔时间，单位：毫秒
    WebSocketClient.instance = this;
  }

  connect() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  handleOpen(event) {
    this.openHandlers.forEach((handler) => handler(event));
  }

  handleMessage(event) {
    this.messageHandlers.forEach((handler) => handler(event.data));
  }

  handleClose(event) {
    this.closeHandlers.forEach((handler) => handler(event));
  }

  handleError(event) {
    this.errorHandlers.forEach((handler) => handler(event));
  }

  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
  }

  addOpenHandler(handler) {
    this.openHandlers.push(handler);
  }

  addCloseHandler(handler) {
    this.closeHandlers.push(handler);
  }

  addErrorHandler(handler) {
    this.errorHandlers.push(handler);
  }

  removeMessageHandler(handler) {
    this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
  }

  removeOpenHandler(handler) {
    this.openHandlers = this.openHandlers.filter((h) => h !== handler);
  }

  removeCloseHandler(handler) {
    this.closeHandlers = this.closeHandlers.filter((h) => h !== handler);
  }

  removeErrorHandler(handler) {
    this.errorHandlers = this.errorHandlers.filter((h) => h !== handler);
  }
}

export default WebSocketClient;
