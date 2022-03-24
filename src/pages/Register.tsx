import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from '../store'

const Wrapper = styled.div`
  width: 600px;
  margin: 50px auto;
  padding: 20px 50px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 700px) {
    width: 500px;
    padding: 20px 20px;
  }

  @media (max-width: 575px) {
    width: 300px;
    padding: 20px 20px;
  }

  .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
  }

  > h2 {
    text-align: center;
    padding: 8px 0;
  }
`

const Register: React.FC = () => {
  const { AuthStore } = useStore()
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.register().then(
      (user) => {
        console.log(user)
        console.log('注册成功')
        navigate('/')
      },
      (err) => {
        if(err.code === 202) {
          message.error('该用户名已被使用, 请换一个吧');
        } else {
          console.log('注册失败')
          console.dir(err)
        }

      }
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Wrapper>
      <h2>用户注册</h2>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名!' },
            () => ({
              validator(_, value = '') {
                if (/\W/.test(value))
                  return Promise.reject('只能由字母数字下划线组成')
                if (value.length > 10) return Promise.reject('最多10个字符')
                if (value.length < 3) return Promise.reject('最少3个字符')
                return Promise.resolve()
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码!' },
            {
              min: 4,
              message: '最少4个字符',
            },
            {
              max: 16,
              message: '最多16个字符',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="ConfirmPassword"
          rules={[
            { required: true, message: '请输入确认密码!' },
            ({ getFieldValue }) => ({
              validator(_, value = '') {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码输入不一致!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default Register
