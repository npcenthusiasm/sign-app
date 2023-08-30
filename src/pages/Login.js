import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Form, Tabs, Divider } from 'antd';
import './Login.scss';

import GoogleSvg from '../assets/images/google.svg'
import FacebookSvg from '../assets/images/facebook.svg'

export default function Login() {
  const [allowSubmit, setAllowSubmit] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const handleInputChnage = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    console.log(formData);
  }
  useEffect(() => {
    const canSubmit = formData.username.trim() !== '' && formData.password.trim() !== ''
    setAllowSubmit(canSubmit)
  }, [formData])

  const items = [
    {
      key: '1',
      label: '登入',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '註冊',
      children: 'Content of Tab Pane 2',
    },
  ];
  
  const onChange = (key) => {
    console.log(key);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div className="home-page">

      <div className='home'>
        <Space direction="vertical" size={16}>
          <Card
            headStyle={
              {
                borderBottom: 'none'
              }
            }
            title={
            <Tabs centered defaultActiveKey='1' items={items} onChange={onChange}>
            
            </Tabs>
          } style={{ width: 300 }}>

            <div>

            <Space size={32} className="oauth-btn-wrap">
                <Button type="primary" size="large" className="oauth-login-btn" icon={
                  <img
                    src={FacebookSvg}
                    alt=""
                    width="30"
                    height="30"
                  />

                }>
                </Button>
                <Button type="primary" size="large"  className="oauth-login-btn" icon={

                    <img src={GoogleSvg} alt="" />
                }>
                </Button>
              </Space>
            </div>

        <Divider className="home-divider text-gray">或使用電子信箱登入</Divider>
            
          <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '請輸入您的電子信箱',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="請輸入您的電子信箱" onChange={handleInputChnage} name='username' value={formData.username} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '請輸入您的密碼',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
                  placeholder="請輸入您的密碼"
                  name='password'
            value={formData.password}
            onChange={handleInputChnage}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="login-form-button" disabled={!allowSubmit}>
          登入
          </Button>
        </Form.Item>
      </Form>
          </Card>
        </Space>
      </div>
    </div>
  )
}

