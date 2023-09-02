import { Button, Card, Tabs, message } from "antd"
import Dragger from "antd/es/upload/Dragger";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 } from "uuid";

const UploadCard = ({ onUploadSuccess }) => {
  const props = {
    name: 'file',
    accept: 'application/pdf',
    multiple: true,
    // action: '',
    async customRequest(fileInfo) {
      console.log('fileInfo: ', fileInfo);
      const {file, onSuccess, onError} = fileInfo
      // console.log('info: ', info);

      // setTimeout(() => {
        
      //   info.onError('商船失敗', {data: '123'})
      //   // info.onSuccess({data: '123'})
      // }, 2000);
      // // info.stats = 'done'
      // console.log('info, k,v: ', info, k,v);
      // console.log(123);


      
      try {
        const pdfFilesFolderRef = ref(storage, `pdfFiles/${file.name + v4()}`)
        const res = await uploadBytes(pdfFilesFolderRef, file)
        onSuccess(res)
        console.log('res: ', res);
      // getFiles()
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

          onUploadSuccess()
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
    <div style={{
      // maxWidth: '1010px',
      // margin: '116px auto 0'
    }}>
      {/* <button onClick={addData}>addData</button>
      <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
      <button onClick={uploadFile}>uploadFile file</button> */}

      {/* {
        fileList.map(fileItem => {
          return (
            <div>
              <div>title: { fileItem.title}</div>
              <div>size: { fileItem.size}</div>
              <div>id: { fileItem.id}</div>
              <div>name: { fileItem.name}</div>
              <div >createdAt: {fileItem.createdAt}</div>
          <button onClick={() => deleteData(fileItem.id)}>deleteData</button>
          <button onClick={() => updateData(fileItem)}>updateData</button>
              
            </div>
          )

        })
      } */}
      {/* {
        
        currentStep - 1 >= 0 && (
          <div style={{marginBottom: '40px'}}>
            &lt; 上一頁
          </div>
        )
      } */}

      {
        // currentStep === 0 && (
          <Tabs defaultActiveKey='1' items={tabItems} > </Tabs>
        // )
      }
   
    </div>
  )

}

export default UploadCard