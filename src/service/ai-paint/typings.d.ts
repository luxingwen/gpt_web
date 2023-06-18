/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-06-16 14:05:03
 * @LastEditTime: 2023-06-16 15:07:11
 */
declare namespace API {
  interface SDTextToImageParam {
    rate: string;
    quality: string;
    model: string; // 模型
    prompt: string[]; // 正向提示词
    styles: string[]; // 风格
    height: number; // 图片高度，值越大，越耗显存
    width: number; // 图片宽度，值越大，越耗显存
    batch_size: number; // 单批数量
    batchCount: number; // 总批次数
    steps: number; // 迭代次数
    seed?: number; // 种子（输入源图片seed）
    negative_prompt: string[]; // 反向提示词
    cfg_scale: number; // 分类器自由引导量表
    restore_faces?: boolean; // 面部修复
    tiling?: boolean; // 平铺图
    denoising_strength: number;
    sampler_name: string;
    hr_upscaler: string;
  }

  interface SDImageToImageParam {
    rate: string; // 比率
    quality: string; // 质量
    init_images: string[]; // 要作为基本/原始图像发送的base64编码图像的列表

    image_cfg_scale: number; // 图像分类器自由引导量表

    steps: number; // 迭代次数
    model: string; // 模型
    prompt: string[]; // 正向提示词
    negativePrompt: string[]; // 反向提示词

    restore_faces?: boolean; // 面部修复（可选）
    tiling?: boolean; // 平铺图（可选）
    styles?: string[]; // 风格（可选）

    cfg_scale: number; // 分类器自由引导量表

    height: number; // 图片高度，值越大，越耗显存
    width: number; // 图片宽度，值越大，越耗显存
    batch_size: number; // 单批数量
    batchCount: number; // 总批次数

    denoising_strength: number; // 重绘幅度，确定算法对图像内容的尊重程度

    seed?: number; // 种子（输入源图片seed）

    samplerName: string; // 采样器名称
  }

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
