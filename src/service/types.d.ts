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
    user_id: number;
  }

  export enum GoodsType {
    QnA = 0, // AI问答
    Drawing = 1, // AI画图
    DigitalPackage = 2, // 数字人套餐
    ConversationCount = 3, // 与数字人对话次数
    Enterprise = 4, // 企业信息
  }

  // 示例用法
  const scenario: Scenario = Scenario.Drawing;
  console.log(scenario); // 输出: 1

  export interface ReqGoodsType {
    type: GoodsType;
  }

  export interface ReqOrdersType {
    page: number;
    per_page: number;
    type: GoodsType; // -1返回全部  0: AI问答 1: AI画图 2: 数字人套餐 3: 与数字人对话次数
  }

  export interface ReqPageType {
    page: number;
    per_page: number;
  }

  export interface ReqChatOrderParams {
    order_sn: string; // 订单编号
  }

  export interface ChatOrder {
    id?: number; // 订单id
    type?: number; // 0 AI问答、1 AI画图、2 个性化数字人、3 与个性化数字人对话次数
    discount?: number; // 享受的折扣
    actual_price?: number; // 实际价格
    pay_price?: number; // 实际价格
    add_time?: number; // 提交订单时间
    pay_time?: number; // 支付完成时间
    product_id?: number;
    create_time?: string;
    chat_times?: number; // 次数
    draw_score?: number; // 画贝数量
    time_period?: number; // 购买时间长度
    price?: number; // 原价
    order_sn?: string; // 订单编号
    status?: number; // 订单状态 0 未支付、1 已支付、2 已取消
    user_id?: number; // 用户ID
    remark?: string; // 备注
  }
}
