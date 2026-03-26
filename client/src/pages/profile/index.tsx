import { View, Text } from '@tarojs/components'
import { Avatar } from '@nutui/nutui-react-taro'
import { ArrowRight, User } from '@nutui/icons-react-taro'
import PageContainer from '../../components/PageContainer'
import styles from './index.module.scss'

const menuItems = [
  { label: '分类管理', icon: '🗂️' },
  { label: '设置', icon: '⚙️' },
]

export default function Profile() {
  return (
    <PageContainer title='我的'>
      <View className={styles.userSection}>
        <Avatar size='80' icon={<User />} className={styles.avatar} />
        <Text className={styles.nickname}>微信用户</Text>
      </View>

      <View className={styles.menuList}>
        {menuItems.map((item) => (
          <View key={item.label} className={styles.menuItem}>
            <View className={styles.menuLeft}>
              <Text className={styles.menuIcon}>{item.icon}</Text>
              <Text className={styles.menuLabel}>{item.label}</Text>
            </View>
            <ArrowRight size='16' color='#999' />
          </View>
        ))}
      </View>
    </PageContainer>
  )
}
