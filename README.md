# 开发者工具箱（DevTools）

本项目是一个基于 **Vue 3 + TypeScript + Vite** 的前端开发者工具箱，旨在集成多个实用的开发辅助工具，提升开发效率。每个工具均为独立模块，便于扩展和维护。

---

## 目录结构

```
my-vue-app/
├── src/
│   ├── tools/                # 各类开发工具目录（每个工具一个子目录）
│   │   └── bookmark-converter/   # 书签转换器工具
│   │       ├── index.vue
│   │       ├── converter.ts
│   │       ├── types.ts
│   │       └── README.md     # 工具专属说明文档
│   ├── components/           # 公共UI组件
│   ├── lib/                  # 公共工具函数
│   ├── router/               # 路由配置
│   ├── views/                # 首页、导航等
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── public/
├── package.json
├── README.md                 # 工具箱总说明（本文件）
└── ...
```

---

## 如何添加新工具

1. 在 `src/tools/` 下新建一个以工具英文名命名的文件夹（如 `my-tool/`）。
2. 在该文件夹下编写工具主页面（如 `index.vue`）、逻辑代码、类型定义等。
3. 为每个工具单独编写 `README.md`，介绍该工具的功能、用法、参数等。
4. 在 `src/router/routes.ts` 中添加新工具的路由配置。
5. （可选）在首页导航中添加该工具入口。

---

## 依赖与技术栈

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [lucide-vue-next](https://github.com/lucide-icons/lucide)
- [vue-sonner](https://github.com/emilkowalski/vue-sonner)
- [Shadcn-vue](https://www.shadcn-vue.com/)

---

## 安装与运行

1. **安装依赖**

   ```bash
   npm install
   ```

2. **本地开发**

   ```bash
   npm run dev
   ```

   启动后浏览器会自动打开项目首页。

3. **打包构建**

   ```bash
   npm run build
   ```

4. **预览生产环境构建**

   ```bash
   npm run preview
   ```

---

## 工具文档管理建议

- 每个工具目录下应有独立的 `README.md`，专门介绍该工具的功能、用法、原理等。
- 根目录 `README.md` 只介绍整个工具箱、如何添加新工具、全局依赖、运行方式等。

---

## 贡献与反馈

如有建议、Bug 反馈或功能需求，欢迎提交 Issue 或 PR。

---

如需进一步补充（如详细组件文档、API 说明等），请告知你的具体需求！