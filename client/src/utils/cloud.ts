import Taro from '@tarojs/taro'

export async function callFn<T = any>(
  name: string,
  data?: Record<string, any>
): Promise<T | null> {
  try {
    const res = await Taro.cloud.callFunction({ name, data })
    const result = res.result as { code: number; message?: string; data: T }
    if (result.code !== 0) {
      Taro.showToast({ title: result.message || '请求失败', icon: 'none' })
      return null
    }
    return result.data
  } catch (err) {
    console.error(`[cloud:${name}]`, err)
    Taro.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
    return null
  }
}
