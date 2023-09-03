import { Button, Card, Tabs, message } from "antd"
import Dragger from "antd/es/upload/Dragger";
import { ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../config/firebase";
import { v4 } from "uuid";
// import { useContext } from "react";
// import FirebaseContext from "../store/firebaseContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignToEdit, setSignToEditRefPath } from "../slice/SignSlice";

const UploadCard = () => {
  // const [state, dispatch] = useContext(FirebaseContext)
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const props = {
    name: 'file',
    accept: 'application/pdf',
    multiple: true,
    // action: '',
    async customRequest(fileInfo) {
      if (!auth?.currentUser?.uid) {
        message.error('尚未登入，或登入失效，請重新登入')
        return
      }
      console.log('fileInfo: ', fileInfo);
      const {file, onSuccess, onError} = fileInfo
      
      try {
        const uid = auth?.currentUser?.uid
        const pdfFilesFolderRef = ref(storage, `pdfFiles/${uid}/${v4()}.${file.name}`)
        const res = await uploadBytes(pdfFilesFolderRef, file)
        // dispatch(setSignToEdit(res.ref))
        dispatch(setSignToEditRefPath(res.ref.fullPath))
        onSuccess(res)
        console.log('res: ', res);
      } catch (error) {
        onError(error)
      console.error(error)
      }
    },
    onChange(info) {
      console.log('info: ', info);
      console.log('onChange');
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`上傳成功`);
        
        setTimeout(() => {
          navigate('/confirmDoc')
          // onUploadSuccess()
        },1000)
        // setFileUpload(info.file)
        // form.setFieldValue('fileName', info.file.name)
        
      } else if (status === 'error') {
        message.error(`上傳失敗`);
      }

      // next()

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
          <Button type='primary'>選擇檔案 (PDF)</Button>
        </p>
        <p className="ant-upload-hint">或直接拖放檔案進來</p>
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
    <Tabs defaultActiveKey='1' items={tabItems} > </Tabs>
  )
}

export default UploadCard