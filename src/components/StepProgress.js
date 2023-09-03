import React, { useEffect, useRef, useState } from 'react'
import { Card, Layout ,message, Steps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


const { Header,  Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  height: 65,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  boxShadow: '0px 0px 15px 0px rgba(25, 26, 27, 0.08)'
};

const steps = [
  {
    title: '上傳檔案',
    content: '',
    children: ''
  },
  {
    title: '確認上傳檔案',
    content: '',
  },
  {
    title: '製作簽署檔案',
    content: '',
  },
  {
    title: '下載簽署檔案',
    content: '',
  },  
];


export const StepProgress = ({ currentStep, children }) => {
  const navigate = useNavigate()
  // const [currentStep, setCurrentStep] = useState(defaultCurrentStep)

  // useEffect(() => {
  //   if (currentStep === 2) {
  //     message.info(`載入中 ...`);
  //   }
  // }, [currentStep])
  

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
 
  return (
    <>
      <Header style={headerStyle}>
        <Steps current={currentStep} items={items} />
        {/* <button onClick={logFiles}>logFiles</button> */}
        {/* <Link to="/docView" >docView</Link> */}
        { children }
        {/* <button onClick={() => navigate('/main')}>prev</button> */}
        {/* <button onClick={() => setCurrentStep(currentStep + 1)}>next</button> */}
      </Header>
    </>
  );
}

export default StepProgress