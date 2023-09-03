import React from 'react'
import { Card, Layout } from 'antd';

import UploadCard from '../components/UploadCard';
import StepProgress from '../components/StepProgress';
import { Link } from 'react-router-dom';
const { Content } = Layout;
const contentStyle = {
  backgroundColor: '#F1F2F5',
  minHeight: 'calc(100vh - 65px)'
}
export const UploadDocView = () => {
  return (
    <>
      <Layout >
        <StepProgress currentStep="1">
          {/* <Link to="/confirmDoc">confirmDoc</Link> */}
        </StepProgress>
        <Content style={contentStyle}>
          <Card style={{
            maxWidth: '1010px',
            margin: '116px auto 0'
          }}>
            <UploadCard  />
          </Card>
        </Content>
      </Layout>
    </>
  );
}

export default UploadDocView