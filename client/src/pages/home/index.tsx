import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { callFn } from '../../utils/cloud'
import PageContainer from '../../components/PageContainer'
import AddBillDrawer from '../../components/AddBillDrawer'
import styles from './index.module.scss'

function Home() {
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    callFn('login').then((res) => {
      console.log('[login]', res)
    })
  }, [])

  return (
    <PageContainer title='甜酒账簿'>
      <View className={styles.fab} onClick={() => setDrawerVisible(true)}>
        <Text className={styles.fabText}>＋ 记一笔</Text>
      </View>
      <AddBillDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </PageContainer>
  )
}

export default Home
