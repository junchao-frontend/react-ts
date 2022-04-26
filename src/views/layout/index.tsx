import { Button } from 'antd'
import { getUser } from '@/api/user'
const Layout = () => {
  const test = async () => {
    const res = await getUser()
    console.log(res)
  }
  return (
    <>
      <Button type="primary" onClick={test}>
        Button
      </Button>
    </>
  )
}

export default Layout
