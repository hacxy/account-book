import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

function Home() {
  useEffect(() => {
    Taro.cloud.callFunction({ name: 'login' }).then((res) => {
      console.log('[login]', res.result)
    }).catch((err) => {
      console.error('[login error]', err)
    })
  }, [])

  return <View />
}

export default Home
