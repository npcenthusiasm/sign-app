import { Content, Header } from "antd/es/layout/layout"
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect, useState } from "react";
import CanvasPanel from "./CanvasPanel";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase";
import FirebaseContext from "../store/firebaseContext";

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
  const [pdfFileList, setPdfFileList] = useState([])
  const [uploadFile, setUploadFile] = useState(null)
  const [pdfUrl, setPdfUrl] = useState('')
  // get single file
  const pdfFileListRef = ref(storage, 'pdfFiles/')
  const docId = ''
  const [state, dispatch] = useContext(FirebaseContext)
  console.log('state: ', state);
  
  // const selectedFileRef = ref(storage, `pdfFiles/${docId}`)

  const menuItems = [
    getItem('簽名', '1', <PieChartOutlined />),
    getItem('日期', '2', <DesktopOutlined />),
    getItem('文字', '3', <DesktopOutlined />),
  ];

  useEffect(() => {
    const getSingleFileUrl = async () => {
      if (!state.selectedPdfRef) {
        return
      }
      try {
        console.log('state.selectedFileRef: ', state.selectedPdfRef);
        const pathRef = ref(storage, `pdfFiles/${state.selectedPdfRef?.name}`)
        const url = await getDownloadURL(pathRef)
        console.log('url: ', url);
        setUploadFile(null)
        setPdfUrl(url)
      } catch (error) {
        console.error(error)
      }

    }
    getSingleFileUrl()
  }, [state.selectedPdfRef])

    const inputOnChange2 = (e) => {
      setPdfUrl('')
      setUploadFile(e.target.files[0])
  }

  useEffect(() => {
    console.log(pdfFileList);
  }, [pdfFileList])
  return (
      <>
        <Header style={headerStyle}>
          <div>
          <PieChartOutlined style={{marginRight: '20px'}}/>
          {state.selectedPdfRef?.name}
        </div>  
        </Header>
      
      <Layout hasSider>
        <Sider  style={siderStyle} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu  defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>
          <Content style={contentStyle}>
            
          <div>
          <input
        type="file"
        className="select"
        accept="application/pdf"
        onChange={inputOnChange2}></input>
      
            123
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