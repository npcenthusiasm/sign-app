import React, { useRef, useState } from 'react'
import { Button, Card, Input, Layout ,message, Steps, Tabs, Upload, Form, Menu } from 'antd';
// import { InboxOutlined } from '@ant-design/icons';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const { Dragger } = Upload;

const { Header, Sider, Content } = Layout;

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
  // FIXME:
  minHeight: 'calc(100vh - 65px)'
}

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
}

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


// const SubmitButton = ({ form }) => {
//   const [submittable, setSubmittable] = useState(false);

//   // Watch all values
//   const values = Form.useWatch([], form);
//   React.useEffect(() => {
//     form
//       .validateFields({
//         validateOnly: true,
//       })
//       .then(
//         () => {
//           setSubmittable(true);
//         },
//         () => {
//           setSubmittable(false);
//         },
//       );
//   }, [values]);
//   return (
//     <Button type="primary" htmlType="submit" disabled={!submittable}>
//       Submit
//     </Button>
//   );
// };


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const menuItems = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];


export const Home = () => {
  // const { token } = theme.useToken();
  const currentStep = useRef(2);
  const [form] = Form.useForm()
  const [collapsed, setCollapsed] = useState(false);
  console.log('form: ', form);
  
  const next = () => {
    console.log('call next method');
    currentStep.current = (currentStep.current + 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onChange = (key) => {
    console.log(key);
  };

  const props = {
    name: 'file',
    multiple: true,
    action: '',
    onChange(info) {
      console.log('onChange');
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }

      next()

    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


  const tabItems = [
    {
      key: '1',
      label: '上傳檔案',
      children:  <Dragger {...props} style={{
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <p className="ant-upload-text">
          <Button type='primary'>選擇檔案 (PDF / png)</Button>
        </p>
        <p className="ant-upload-hint">
        或直接拖放檔案進來
        </p>
      </Dragger>,
    },
    {
      key: '2',
      label: '掃描檔案',
      children: '',
    },
    {
      key: '3',
      label: '歷史上傳',
      children: '',
    },
    
  ];
  return (
    <>
      <Layout>
        <Header style={headerStyle}>
          <Steps current={currentStep.current} items={items} />
        </Header>
        {
          currentStep.current >= 2 && (
            <>
              <Header style={headerStyle}>
                <div>產品測試文件</div>  
              </Header>
              {/* <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore similique corrupti assumenda libero? Temporibus explicabo fugiat pariatur, odio consectetur cupiditate, sequi magni saepe alias mollitia doloremque enim repellat esse nam.
              </div> */}
            <Layout hasSider>
              <Sider  style={siderStyle} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu  defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
              </Sider>
              <Content style={contentStyle}>Content</Content>
            </Layout>
            
            </>
          )
        }
        
        {
          currentStep.current <= 1 && (
            
            <Content style={contentStyle}>

              <Card style={{
                maxWidth: '1010px',
                margin: '116px auto 0'
              }}>
                {
                  
                  currentStep.current - 1 >= 0 && (
                    <div style={{marginBottom: '40px'}}>
                      &lt; 上一頁
                    </div>
                  )
                }

                {
                  currentStep.current === 0 && (
                    <Tabs defaultActiveKey='1' items={tabItems} onChange={onChange}> </Tabs>
                  )
                }
                {
                  currentStep.current === 1 && (
                    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                      <Form.Item
                        name="fileName"
                        label="文件名稱"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="uploadFile"
                        label="上傳文件"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="tag"
                        label="建立標籤"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      {/* <Form.Item>
                        <Space>
                          <SubmitButton form={form} />
                          <Button htmlType="reset">Reset</Button>
                        </Space>
                      </Form.Item> */}
                    </Form>
                  )
                }
              </Card>
            </Content>
          )
        }
      </Layout>
    </>
  );
}

export default Home