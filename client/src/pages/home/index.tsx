import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Avatar } from '@nutui/nutui-react-taro'
import { User } from '@nutui/icons-react-taro'
import { callFn } from '../../utils/cloud'
import PageContainer from '../../components/PageContainer'
import AddBillDrawer from '../../components/AddBillDrawer'
import styles from './index.module.scss'

function Home() {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    callFn('login').then((res: any) => {
      console.log('[login]', res)
      if (res?.result?.avatarUrl) {
        setAvatarUrl(res.result.avatarUrl)
      }
    })
  }, [])

  const navLeft = (
    <View className={styles.avatarWrap} onClick={() => Taro.navigateTo({ url: '/pages/profile/index' })}>
      <Avatar size='32' src={avatarUrl} icon={avatarUrl ? undefined : <User />} />
    </View>
  )

  return (
    <PageContainer title='甜酒账簿' left={navLeft}>
      <View className={styles.fab} onClick={() => setDrawerVisible(true)}>
        <Text className={styles.fabText}>＋ 记一笔</Text>
      </View>
      <AddBillDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </PageContainer>
  )
}

export default Home
