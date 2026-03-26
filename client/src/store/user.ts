import { atom, useAtom } from 'jotai'

export interface UserInfo {
  _id: string
  openid: string
  nickname: string
  avatarUrl: string
  reminderEnabled: boolean
  reminderTime: string
  reminderSubscribed: boolean
}

export const userInfoAtom = atom<UserInfo | null>(null)

export function useUserInfo() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const isLoggedIn = userInfo !== null
  return { userInfo, setUserInfo, isLoggedIn }
}
