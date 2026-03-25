import { useEffect } from 'react'
import { View } from '@tarojs/components'
import { callFn } from '../../utils/cloud'

function Home() {
  useEffect(() => {
    callFn('login').then((res) => {
      console.log('[login]', res)
    })
  }, [])

  return <View />
}

export default Home
