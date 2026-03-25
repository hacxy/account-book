# Taro React WX Cloud Template

## 简介

这是一个专为微信小程序云开发而搭建的项目模板, 使用 Taro + React + Typescript

_Taro 官方提供的云开发模板严重越少依赖,导致项目无法正常跑起来_

使用此模板快速搭建基于 Tarojs + Typescript + React 的微信小程序云开发项目

## 特性

- 集成微信云开发,无需自己部署服务端,云开发代码位于 `cloud/function` (需开通微信云开发服务, 详见:[微信云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html) )

- 默认支持 CI/CD

  - --open 打开开发者工具，类似于网页开发中自动打开谷歌浏览器  
    --preview 上传代码作为开发版并生成预览二维码  
    --upload 上传代码作为体验版  
    详见: [微信小程序-ci-配置](https://docs.taro.zone/docs/plugin-mini-ci#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F-ci-%E9%85%8D%E7%BD%AE)

- 默认集成 devtools 调试工具, 启动 dev 命令后自动打开 react devtools 调试窗口

## 使用

项目结构采用 pnpm monorepo, 请确保全局安装 pnpm

### 安装依赖

```bash
pnpm install
```

### 运行开发环境

```bash
pnpm dev

# 或启动时自动打开微信开发者工具
pnpm dev:open
```

### 打包

```bash
pnpm build
```
