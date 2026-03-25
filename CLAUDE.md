# 甜酒账簿 - 项目规范

## 项目结构

Monorepo，使用 pnpm workspaces 管理：

```
account-book/
├── client/          # 微信小程序前端（Taro）
│   ├── src/
│   │   ├── pages/   # 页面
│   │   ├── app.ts   # 应用入口
│   │   └── app.config.ts  # 全局路由配置
│   └── config/      # Taro 构建配置
├── cloud/
│   └── functions/   # 微信云函数（wx-server-sdk）
└── docs/            # 产品文档（PRD）
```

## 常用命令

```bash
pnpm dev      # 启动 client 微信小程序 watch 模式
pnpm build    # 构建 client 微信小程序
```

云函数在微信开发者工具中右键上传部署，不通过命令行构建。

## 技术栈

| 层 | 技术 |
|----|------|
| 前端框架 | Taro 4.1.11 + React 18 |
| 语言 | TypeScript（严格模式） |
| UI 组件库 | NutUI React Taro（`@nutui/nutui-react-taro` v2.6.14） |
| 样式 | Sass（`.scss`），**不使用 CSS Modules** |
| 包管理 | pnpm |
| 构建 | Webpack 5 |
| 后端 | 微信云开发（CloudBase），wx-server-sdk |

## Taro 编码规范

### 组件

- 必须用 `@tarojs/components` 中的组件，**不能用 HTML 标签**
  ```tsx
  // ✅
  import { View, Text, Image } from '@tarojs/components'
  // ❌
  <div> <span> <img>
  ```

### API

- 用 `@tarojs/taro` 的 API，**不能用 window / document / location**
  ```ts
  import Taro from '@tarojs/taro'
  Taro.navigateTo({ url: '/pages/add/index' })
  Taro.showToast({ title: '已保存' })
  ```

### 尺寸单位

- 设计稿基准宽度 **375px**，写样式直接用 `rpx`，不使用 `px`
- NutUI 组件的 class（`nut-` 前缀）不参与 px 转换，无需处理

### 样式

- 每个页面/组件对应同名 `.module.scss` 文件
- **强制使用 CSS Modules**，类名通过 `styles.xxx` 引用
- 不使用内联 style，除非动态计算值

### 文件结构（页面示例）

```
src/pages/home/
├── index.tsx        # 页面组件
├── index.scss       # 页面样式
└── index.config.ts  # 页面配置（navigationBarTitleText 等）
```

## NutUI React Taro 使用规范

- 引入路径：`@nutui/nutui-react-taro`
- 图标引入：`@nutui/icons-react-taro`
- 需要在页面外层包裹 `<ConfigProvider locale={zhCN}>` 以启用中文
- 组件文档参考：https://nutui.jd.com/taro/react/2x/

## 云函数规范

- 每个云函数放在 `cloud/functions/<name>/` 目录下
- 入口文件为 `index.js`，导出 `exports.main = async (event, context) => {}`
- 使用 `wx-server-sdk`，init 时传入 `env: cloud.DYNAMIC_CURRENT_ENV`
- 云函数通过微信开发者工具上传，不在本项目 CI 中处理

## 导航规范

- **无底部 TabBar**，所有页面通过代码导航
- 用 `Taro.navigateTo` 进入二级页，`Taro.navigateBack` 返回
- 首页路径：`pages/index/index`

## 注意事项

- 新增页面后必须在 `client/src/app.config.ts` 的 `pages` 数组中注册
- 云函数调用统一使用 `Taro.cloud.callFunction`，不做 HTTP 请求
- 金额在数据层统一使用**分**（整数）存储，展示层再转换为元
