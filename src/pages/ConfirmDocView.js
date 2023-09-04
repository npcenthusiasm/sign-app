import React from 'react'
import { Card, Layout } from 'antd'
import ConfirmUpload from '../components/ConfirmUpload'
import StepProgress from '../components/StepProgress'
import { Link } from 'react-router-dom'
const { Content } = Layout
const contentStyle = {
  backgroundColor: '#F1F2F5',
  minHeight: 'calc(100vh - 65px)'
}

export const ConfirmDocView = () => {
  return (
    <>
      <Layout>
        <StepProgress currentStep="2">
          {/* <Link to="/uploadDoc">prev</Link>
          <Link to="/signDoc">next</Link> */}
        </StepProgress>
        <Content style={contentStyle}>
          <Card
            style={{
              maxWidth: '1010px',
              margin: '116px auto 0'
            }}
          >
            <ConfirmUpload />
          </Card>
        </Content>
      </Layout>
    </>
  )
}

export default ConfirmDocView
