import Taro from '@tarojs/taro'

interface NavBarInfo {
  statusBarHeight: number
  navBarHeight: number
  totalHeight: number
}

let cache: NavBarInfo | null = null

/**
 * 获取导航栏尺寸信息（结果缓存，只计算一次）
 *
 * navBarHeight 计算规则：
 *   胶囊上边距到状态栏底部的间距 = capsule.top - statusBarHeight
 *   导航栏高度 = 胶囊高度 + 上下各一个间距
 *              = capsule.bottom + capsule.top - 2 * statusBarHeight
 */
export function useNavBarInfo(): NavBarInfo {
  if (cache) return cache

  const { statusBarHeight = 0 } = Taro.getSystemInfoSync()
  const capsule = Taro.getMenuButtonBoundingClientRect()
  const navBarHeight = capsule.bottom + capsule.top - 2 * statusBarHeight

  cache = {
    statusBarHeight,
    navBarHeight,
    totalHeight: statusBarHeight + navBarHeight,
  }

  return cache
}
