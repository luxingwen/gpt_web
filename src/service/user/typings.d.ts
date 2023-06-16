declare namespace API {
  interface User {
    agree_privacy_policy: boolean;
    avatar: string;
    bank_name: string;
    bank_no: string;
    birthday: number;
    chat_expired_at: number;
    chat_times: number;
    gender: number;
    id: number;
    identify_num: string;
    is_block: boolean;
    is_kol: boolean;
    is_vip: boolean;
    last_login_ip: string;
    last_login_time: number;
    last_reward_update_time: number;
    mobile: string;
    nickname: string;
    parent_id: number;
    password: string;
    public_openid: string;
    real_name: string;
    register_ip: string;
    register_time: number;
    reward_amount: number;
    reward_rate: number;
    skip_invite: number;
    union_id: string;
    user_level_id: number;
    username: string;
    web_openid: string;
    weixin_openid: string;
  }
}
