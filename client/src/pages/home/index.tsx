import { useEffect } from 'react'
import { callFn } from '../../utils/cloud'
import PageContainer from '../../components/PageContainer'

function Home() {
  useEffect(() => {
    callFn('login').then((res) => {
      console.log('[login]', res)
    })
  }, [])

  return <PageContainer title='甜酒账簿' />
}

export default Home
