declare namespace API {
  export interface ReqHotImages {
    page: number; // 页码
    per_page: number; // 每页数量
  }

  // 模型
  export interface SdModel {
    id: number;
    model: string;
    model_name: string; // 模型名称
    img: string; // 模型图片
    is_del: number;
    is_default: number;
    sampler_name: string;
    hr_upscaler: string;
  }
}
