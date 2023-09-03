import { Button, Form, Input, Space } from "antd"
import { addSign } from "../apis/firebaseApi"
import { useContext, useEffect } from "react"
import { auth, storage } from "../config/firebase"
import { getDownloadURL, ref } from "firebase/storage"
import { useNavigate } from "react-router-dom"
import { selectSignToEditRefPath } from "../slice/SignSlice"
import { useSelector } from "react-redux"
import { getFileNameFromRefPath } from "../utils"

const ConfirmUpload = () => {
  const navigete = useNavigate()
  const [form] = Form.useForm()
  const signToEditRefPath = useSelector(selectSignToEditRefPath)
  console.log('signToEditRefPath: ', signToEditRefPath);

  useEffect(() => {
    const getSingleFileUrl = async () => {
      // console.log('state.selectedPdfRef: ', state.selectedPdfRef);
      if (!signToEditRefPath) {
        return
      }
      try {
        // console.log('state.selectedFileRef: ', state.selectedPdfRef);
        // const pathRef = ref(storage, `pdfFiles/${state.selectedPdfRef?.name}`)
        console.log('signToEditRefPath: ', signToEditRefPath);
        const name = getFileNameFromRefPath(signToEditRefPath)
        console.log('name: ', name);
        form.setFieldValue('docName', name)
        form.setFieldValue('uploadFile', name)
        // const pathRef = ref(storage, selectSignToEditRefPath)
        // const url = await getDownloadURL(pathRef)
        // console.log('url: ', url);
        // setUploadFile(null)
        // setPdfUrl(url)
      } catch (error) {
        console.error(error)
      }

    }
    getSingleFileUrl()
  }, [signToEditRefPath])
  const goNextPage = () => {
    console.log('form: ', form);
    console.log('goNextPage');
    console.log('auth?.currentUser?.uid: ', auth?.currentUser?.uid);
    addSign(
      {
        uid: auth?.currentUser?.uid,
        docName: form.getFieldValue('docName'),
        docRef: signToEditRefPath,
        signd: false,
      }
    )
    navigete('/signDoc')
  }
  
  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
      <Form.Item
        name="docName"
        label="文件名稱"
        rules={[
          {
            required: true,
            message: '文件名稱必填'
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
        <Input disabled/>
      </Form.Item>
      {/* <Form.Item
        name="tag"
        label="建立標籤"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item>
        <Space style={{
          display: 'flex',
          justifyContent: 'space-between'
          
        }}>
          {/* <SubmitButton form={form} /> */}
          <Button onClick={() => {
            navigete('/uploadDoc')
            // goPrev()
          }}>上一步</Button>
          <Button type="primary" onClick={goNextPage}>下一步</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default ConfirmUpload