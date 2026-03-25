import { useEffect } from 'react'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
import './app.scss'

// TODO: 替换为微信开发者工具中的云环境 ID
Taro.cloud.init({ env: 'cloud1-3g63vlst5e372c09' })

function App(props: { children: React.ReactNode }) {
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
