declare namespace API {
  export interface Response<T> {
    errno: number;
    errmsg: string;
    data: T;
  }



  // 消息类型定义
  export interface MessageType {
    id: any;
    msg_id: any;
    msg: string;
    self: boolean;
    is_end: boolean;
    time: string;
    avatar: string;
  };


  export enum GoodsType {
    QnA = 0, // AI问答
    Drawing = 1, // AI画图
    DigitalPackage = 2, // 数字人套餐
    ConversationCount = 3, // 与数字人对话次数
  }
  
  // 示例用法
  const scenario: Scenario = Scenario.Drawing;
  console.log(scenario); // 输出: 1
  

  export interface ReqGoodsType {
    type: GoodsType;
  };



  
}
