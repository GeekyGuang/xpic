import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from '../store'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const Wrapper = styled.div`
  max-width: 270px;
  margin: 50px auto;

  > .notes {
    font-size: 16px;
    line-height: 16px;
    padding: 10px;
    border-radius: 4px;
    background-color: #c3f5cf;
    border: 1px solid #7ee281;
    color: #155724;
    margin-bottom: 20px;
  }

  > div {
    padding: 20px 20px;
    border-radius: 4px;
    box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.2);

    > h2 {
      text-align: center;
      padding: 8px 0;
    }
  }

  .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 576px) {
    max-width: 270px;
    > div {
      padding: 20px 20px;
    }
  }

  @media (min-width: 768px) {
    max-width: 360px;
    > div {
      padding: 20px 30px;
    }
  }

  @media (min-width: 992px) {
    max-width: 480px;
    > div {
      padding: 20px 50px;
    }
  }
`

const Login: React.FC = () => {
  const { AuthStore } = useStore()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 3000)
  }, [])

  const onFinish = (values: any) => {
    console.log('Success:', values)
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.login().then(
      (user) => {
        console.log(user)
        console.log('登录成功')
        navigate('/')
      },
      (err) => {
        message.error('用户名或密码错误, 请重试')
        console.log('登录失败')
        console.log(err)
      }
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Wrapper>
      {show ? <p className="notes">请先登录才能上传图片哦~</p> : ''}
      <div>
        <h2>用户登录</h2>
        <Form
          name="basic"
          initialValues={{ username: 'jack', password: '1234', remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="密码"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          还没有账号？去<Link to="/register">注册</Link>
        </div>
      </div>
    </Wrapper>
  )
}

export default Login
