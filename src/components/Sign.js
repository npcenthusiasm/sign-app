import { Content, Header } from "antd/es/layout/layout"
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Input, Layout, Menu,  message } from "antd";
import Sider from "antd/es/layout/Sider";
import {  useEffect, useState } from "react";
import CanvasPanel from "./CanvasPanel";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase";
import { selectCurrentSign, selectSignToEditRefPath, setShowModal } from "../slice/SignSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFileNameFromRef } from "../utils";


const headerStyle = {
  textAlign: 'center',
  height: 65,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  boxShadow: '0px 0px 15px 0px rgba(25, 26, 27, 0.08)'
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
}

const contentStyle = {
  backgroundColor: '#F1F2F5',
  // FIXME:
  minHeight: 'calc(100vh - 65px)'
}

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Sign = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [uploadFile, setUploadFile] = useState(null)
  const [pdfUrl, setPdfUrl] = useState('')
  const signToEditRefPath = useSelector(selectSignToEditRefPath)
  
  const dispatch = useDispatch()
  
  const currentSign = useSelector(selectCurrentSign)
  console.log('currentSign: ', currentSign);
  // const selectedFileRef = ref(storage, `pdfFiles/${docId}`)
  const menuItems = [
    getItem('簽名', '1', <PieChartOutlined />),
    getItem('日期', '2', <DesktopOutlined />),
    getItem('文字', '3', <DesktopOutlined />,),
  ];

  const handleMenuClick = ({ item, key, keyPath }) => {
    console.log('key: ', key);
    if (key === '1') {
      console.log(11);
      dispatch(setShowModal(true))

    }
    console.log('ok');
    // console.log('keyPath: ', keyPath);
    // console.log('key: ', key);
    // console.log('item: ', item);
    
  }


  // useEffect(() => {
      
  // }, [currentStep])


  useEffect(() => {
    const getSingleFileUrl = async () => {
      if (!currentSign) {
        return
      }
      try {
        message.info(`載入中 ...`);
        
        console.log('state.selectedFileRef: ', currentSign);
        const pathRef = ref(storage, signToEditRefPath)
        const url = await getDownloadURL(pathRef)
        console.log('url: ', url);
        setUploadFile(null)
        setPdfUrl(url)
        message.success(`載入成功`);
      } catch (error) {
        console.error(error)
        message.error(`載入失敗`);
      }

    }
    getSingleFileUrl()
  }, [currentSign])

    const inputOnChange2 = (e) => {
      setPdfUrl('')
      setUploadFile(e.target.files[0])
  }

  // useEffect(() => {
  //   console.log(pdfFileList);
  // }, [pdfFileList])
  return (
    <>
      <Header style={headerStyle}>
        <div>
        <PieChartOutlined style={{marginRight: '20px'}}/>
        {currentSign && getFileNameFromRef(currentSign)}
      </div>  
      </Header>
      <Layout hasSider>
        <Sider  style={siderStyle} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu defaultSelectedKeys={['1']} mode="inline" items={menuItems} onClick={handleMenuClick} />
        </Sider>
          <Content style={contentStyle}>
            
          <div>
          {/* <input
            type="file"
            className="select"
            accept="application/pdf"
            onChange={inputOnChange2}></input> */}
      
            { JSON.stringify(pdfUrl)  }
            <br />
            {/* { state } */}
            </div>
            <CanvasPanel pdfUrl={pdfUrl} uploadFile={uploadFile}></CanvasPanel>
            {/* <CanvasPanel pdfFileList={[fileInfo.url]}></CanvasPanel> */}
          </Content>
      </Layout>
    </>
  )
}

export default Sign