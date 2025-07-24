# 书签转换器（Bookmark Converter）

本工具用于将主流浏览器（如 Chrome、Firefox、Safari）导出的书签 HTML 文件转换为 JSON 格式，方便数据导入、导出和二次处理。

## 目录结构

```
bookmark-converter/
├── index.vue         # 工具主页面
├── converter.ts      # 书签解析与转换逻辑
├── types.ts          # 类型定义
└── README.md         # 当前说明文档
```

## 功能简介

- 拖拽或选择书签 HTML 文件上传
- 自动解析为 JSON，可选格式化
- 支持保留文件夹结构、包含图标/时间信息等配置
- 解析后可一键下载 JSON 文件

## 使用方法

1. 进入开发者工具箱首页，点击“书签转换器”进入本工具页面。
2. 按页面提示上传书签文件，选择配置，完成转换与下载。

## 支持的书签文件

- Chrome、Firefox、Safari 等浏览器导出的 `.html` 或 `.htm` 文件

## 依赖

- 依赖于主项目的 Vue 3、TypeScript、TailwindCSS、vue-sonner 等

---

如需了解开发者工具箱整体结构和运行方式，请查阅项目根目录的 [README.md](../../../../README.md)。 