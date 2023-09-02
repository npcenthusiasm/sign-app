import { useContext, useEffect, useState } from "react";
import { Layout, Tabs, Card, Col, Row, Tag, Space } from "antd"
import { Header,  Content } from "antd/es/layout/layout"
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../store/firebaseContext";
import Logo from '../assets/images/Logo.png'
import './Main.scss'

const headerStyle = {
  textAlign: 'center',
  height: 65,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  boxShadow: '0px 0px 15px 0px rgba(25, 26, 27, 0.08)'
};
const contentStyle = {
  backgroundColor: '#F1F2F5',
  padding: '0 50px',
  // FIXME:
  minHeight: 'calc(100vh - 65px)'
}


const Main = () => {
  const navigate = useNavigate()
  const [state, dispatch]= useContext(FirebaseContext)
  const pdfFileListRef = ref(storage, 'pdfFiles/')
  const [pdfFileList, setPdfFileList] = useState([])
  const [storageList, setStorageList] = useState([])
  const tabItems = [
    {
      key: '1',
      label: '待自己簽署',
      children:  '',
    },
    {
      key: '2',
      label: '待他人簽署',
      children: '',
    },
    {
      key: '3',
      label: '已完成',
      children: '',
    },
    {
      key: '4',
      label: '已取消',
      children: '',
    },
    {
      key: '5',
      label: '草稿',
      children: '',
    },
  ];

  
  useEffect(() => {
    const getListAll = async () => {
      try {
        const res = await listAll(pdfFileListRef)
        setStorageList(res.items)
        console.log('res.items: ', res.items);
        // res.items.forEach((item) => {
        //   console.log('item: ', item);
        //   // const da = getBytes(pdfFileListRef)
        //   // console.log('da: ', da);
          
        //   // console.log('getBytes: ', getBytes);
        //   // console.log('item.storage: ', item.storage);
        //   getDownloadURL(item).then(url => {
        //     setPdfFileList((prev) => [...prev, url])
        //   })
        // })
        console.log('res: ', res);
        
      } catch (error) {
        console.error(error)
      }

    }
    getListAll()
  }, [])

  return (
    
    <Layout>
      <Header style={headerStyle}>
        <img src={Logo} alt="" className="logo" width="89" />
      </Header>
      <Header style={headerStyle}>
          <div>Main</div>
      </Header>
      <Content style={contentStyle}>
        <Tabs defaultActiveKey='1' items={tabItems} > </Tabs>
        <Row gutter={16}>
          {
            storageList.map(fileInfo => {
              return (
                <Col key={fileInfo.name}>
                  <Card
                    className="pdf-card"
                    onClick={() => {
                      dispatch({
                        type: 'SET_SELECTED_PDF_FILE_REF',
                        payload: fileInfo
                      })
                      navigate('/home')
                    }}
                  >
                    
                    <div className="pdf-card-header-wrapper">
                      <div className="pdf-card-header">
                        <div className="pdf-card-header__title"> {fileInfo.name}</div>
                        <div>
                          <Space size={[0, 8]} wrap>
                            <Tag color="gold">產品教學</Tag>

                            <Tag color="blue">產品測試</Tag>
                        
                          </Space>
                        </div>
                      </div>
                      <div className="pdf-card-header-icon">
                        <svg width="42" height="56" viewBox="0 0 42 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 0C3.13906 0 0 3.13906 0 7V49C0 52.8609 3.13906 56 7 56H35C38.8609 56 42 52.8609 42 49V17.5H28C26.0641 17.5 24.5 15.9359 24.5 14V0H7ZM28 0V14H42L28 0ZM7 24.5H9.625C13.0047 24.5 15.75 27.2453 15.75 30.625C15.75 34.0047 13.0047 36.75 9.625 36.75H8.75V40.25C8.75 41.2125 7.9625 42 7 42C6.0375 42 5.25 41.2125 5.25 40.25V35V26.25C5.25 25.2875 6.0375 24.5 7 24.5ZM9.625 33.25C11.0797 33.25 12.25 32.0797 12.25 30.625C12.25 29.1703 11.0797 28 9.625 28H8.75V33.25H9.625ZM17.5 26.25C17.5 25.2875 18.2875 24.5 19.25 24.5H21.875C24.7734 24.5 27.125 26.8516 27.125 29.75V36.75C27.125 39.6484 24.7734 42 21.875 42H19.25C18.2875 42 17.5 41.2125 17.5 40.25V26.25ZM21 38.5H21.875C22.8375 38.5 23.625 37.7125 23.625 36.75V29.75C23.625 28.7875 22.8375 28 21.875 28H21V38.5ZM31.5 24.5H36.75C37.7125 24.5 38.5 25.2875 38.5 26.25C38.5 27.2125 37.7125 28 36.75 28H33.25V31.5H36.75C37.7125 31.5 38.5 32.2875 38.5 33.25C38.5 34.2125 37.7125 35 36.75 35H33.25V40.25C33.25 41.2125 32.4625 42 31.5 42C30.5375 42 29.75 41.2125 29.75 40.25V33.25V26.25C29.75 25.2875 30.5375 24.5 31.5 24.5Z" fill="#4F8BFF"/>
                        </svg>
                      </div>
                      
                    </div>
                      <div className="updated-date">最後修改時間：2022-10-26</div>
                      
                      <div> 簽署者：Jenny Wu</div>
                     
                  
                </Card>
              </Col>    
              )
            })
          }
        </Row>
      </Content>
    </Layout>
  )
}


export default Main
