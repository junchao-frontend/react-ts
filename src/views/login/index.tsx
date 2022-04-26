import './index.scss'
import { Card, Form, Input, Checkbox, Button } from 'antd'
import { loginForm } from '../../types/login'
import { useStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
const Login = () => {
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async (values: any) => {
    let loginData: loginForm = {
      mobile: values.mobile,
      code: values.code,
    }
    await loginStore.setToken(loginData)
    navigate('/')
    message.success('登录成功！')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={require('@/assets/logo.png')} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateTrigger={['onBlur', 'onChange']}>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur',
              },
              { required: true, message: '请输入手机号' },
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
              { required: true, message: '请输入验证码' },
            ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
