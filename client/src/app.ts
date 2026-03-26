import { useEffect } from 'react'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import { callFn } from './utils/cloud'
import { useUserInfo } from './store/user'

// TODO: 替换为微信开发者工具中的云环境 ID
Taro.cloud.init({ env: 'cloud1-3g63vlst5e372c09' })

function App(props: { children: React.ReactNode }) {
  const { setUserInfo } = useUserInfo()
  useEffect(() => {}, [])

  // 对应 onShow
  useDidShow(() => {
    callFn('login').then((res: any) => {
      if (res) {
        setUserInfo(res)
        Taro.setStorageSync('userInfo', res)
      }
    })
  })

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
