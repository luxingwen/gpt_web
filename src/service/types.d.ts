declare namespace API {
  export interface Response<T> {
    errno: number;
    errmsg: string;
    data: T;
  }



  // 消息类型定义
  export interface MessageType {
    msg_id: any;
    msg: string;
    self: boolean;
    is_end: boolean;
    time: string;
    avatar: string;
  };


  
}
