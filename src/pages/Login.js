import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Form, Tabs, Divider } from 'antd';
import './Login.scss';

import GoogleSvg from '../assets/images/google.svg'
import FacebookSvg from '../assets/images/facebook.svg'
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export default function Login() {
  const  navigate = useNavigate()
  const [allowSubmit, setAllowSubmit] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  console.log(auth?.currentUser?.email);
  const handleInputChnage = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    console.log(formData);
  }

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
    
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const canSubmit = formData.email.trim() !== '' && formData.password.trim() !== ''
    setAllowSubmit(canSubmit)
  }, [formData])

  // useEffect(() => {
  //   console.log(123);
  //   if (auth?.currentUser?.email) {
  //     console.log('auth?.currentUser?.email: ', auth?.currentUser?.email);
  //     navigate('/')
  //   }
  // }, [])

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
    signIn()
    // navigate('/')
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
                } onClick={signInWithGoogle}>
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
          name="email"
          rules={[
            {
              required: true,
              message: '請輸入您的電子信箱',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="請輸入您的電子信箱" onChange={handleInputChnage} name='email' value={formData.email} />
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
        {/* <Button type="primary" htmlType="submit" block className="login-form-button" onClick={logout}>
          登出
          </Button> */}
        </Form.Item>
      </Form>
          </Card>
        </Space>
      </div>
    </div>
  )
}

