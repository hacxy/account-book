import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ArrowLeft } from '@nutui/icons-react-taro'
import { useNavBarInfo } from '../../utils/useNavBarInfo'
import styles from './index.module.scss'

interface PageContainerProps {
  /** 导航栏标题 */
  title?: React.ReactNode
  /** 右侧自定义内容 */
  right?: React.ReactNode
  /** 是否显示返回按钮，默认根据页面栈自动判断 */
  showBack?: boolean
  /** 自定义返回逻辑，不传则默认 navigateBack */
  onBack?: () => void
  children?: React.ReactNode
}

export default function PageContainer({
  title,
  right,
  showBack,
  onBack,
  children,
}: PageContainerProps) {
  const { statusBarHeight, navBarHeight, totalHeight } = useNavBarInfo()

  const canGoBack = Taro.getCurrentPages().length > 1
  const shouldShowBack = showBack !== undefined ? showBack : canGoBack

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      Taro.navigateBack()
    }
  }

  return (
    <View className={styles.pageContainer}>
      {/* fixed 导航栏 */}
      <View className={styles.navbar} style={{ paddingTop: `${statusBarHeight}px` }}>
        <View className={styles.bar} style={{ height: `${navBarHeight}px` }}>
          <View className={styles.barLeft}>
            {shouldShowBack && (
              <View className={styles.back} onClick={handleBack}>
                <ArrowLeft />
              </View>
            )}
          </View>
          <View className={styles.barTitle}>{title}</View>
          <View className={styles.barRight}>{right}</View>
        </View>
      </View>

      {/* 占位，撑开 fixed 导航栏遮挡的高度 */}
      <View style={{ height: `${totalHeight}px` }} />

      <View className={styles.content}>{children}</View>
    </View>
  )
}
