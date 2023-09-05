import { Content, Header } from 'antd/es/layout/layout'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import { Layout, Menu, message } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useEffect, useState } from 'react'
import CanvasPanel from './CanvasPanel'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../config/firebase'
import { selectSignToEditRefPath, setShowModal } from '../slice/SignSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getFileNameFromRefPath } from '../utils'

const headerStyle = {
  textAlign: 'center',
  height: 65,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  boxShadow: '0px 0px 15px 0px rgba(25, 26, 27, 0.08)'
}

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff'
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
    label
  }
}

const Sign = () => {
  const [menuActiveKey, setMenuActiveKey] = useState('sign')
  const [uploadFile, setUploadFile] = useState(null)
  const [pdfUrl, setPdfUrl] = useState('')
  const signToEditRefPath = useSelector(selectSignToEditRefPath)
  // const signCanvas = useSelector(selectSignCanvas)
  const dispatch = useDispatch()

  const menuItems = [
    getItem('簽名', 'sign', <PieChartOutlined />),
    // getItem('日期', '2', <DesktopOutlined />),
    getItem('文字', 'text', <DesktopOutlined />)
  ]

  const handleMenuClick = ({ item, key, keyPath }) => {
    setMenuActiveKey(key)
    if (key === 'text') {
      const data = {
        title: '新增文字'
      }
    } else if (key === 'sign') {
      const data = {
        title: '新增簽名'
      }
    }
    dispatch(setShowModal(true))
  }

  useEffect(() => {
    const getSingleFileUrl = async () => {
      if (!signToEditRefPath) {
        return
      }
      try {
        message.info(`載入中 ...`)

        //
        const pathRef = ref(storage, signToEditRefPath)
        const url = await getDownloadURL(pathRef)

        setUploadFile(null)
        setPdfUrl(url)
        message.success(`載入成功`)
      } catch (error) {
        console.error(error)
        message.error(`載入失敗`)
      }
    }
    getSingleFileUrl()
  }, [signToEditRefPath])

  const inputOnChange2 = (e) => {
    setPdfUrl('')
    setUploadFile(e.target.files[0])
  }

  // useEffect(() => {
  //
  // }, [pdfFileList])
  return (
    <>
      <Header style={headerStyle}>
        <div>
          <PieChartOutlined style={{ marginRight: '20px' }} />
          {signToEditRefPath && getFileNameFromRefPath(signToEditRefPath)}
        </div>
      </Header>
      <Layout hasSider>
        <Sider style={siderStyle}>
          <div className="demo-logo-vertical" />
          <Menu
            defaultSelectedKeys={menuActiveKey}
            mode="inline"
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Content style={contentStyle}>
          {/* <Button type="primary" onClick={saveFile}>
            saveFile
          </Button> */}
          <div>
            {/* <input
            type="file"
            className="select"
            accept="application/pdf"
            onChange={inputOnChange2}></input> */}

            {/* { JSON.stringify(pdfUrl)  } */}
            <br />
            {/* { state } */}
          </div>
          <CanvasPanel
            pdfUrl={pdfUrl}
            uploadFile={uploadFile}
            menuActiveKey={menuActiveKey}
          ></CanvasPanel>
          {/* <CanvasPanel pdfFileList={[fileInfo.url]}></CanvasPanel> */}
        </Content>
      </Layout>
    </>
  )
}

export default Sign
