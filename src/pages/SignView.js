import React, { useEffect, useRef, useState } from 'react'
import { Button, Layout, Space  } from 'antd';
import Sign from '../components/Sign';
import { Link, useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import { useDispatch, useSelector } from 'react-redux';
import { resetSignCanvas, selectSignCanvas } from '../slice/SignSlice';
import { downloadMultiPagePDF } from '../helpers/downloadPDF';

export const SignView = () => {
  const navigete = useNavigate()

  // const { token } = theme.useToken();
  // const currentStep = useRef('3');
  const dispatch = useDispatch()
  
  const [currentStep, setCurrentStep] = useState('3');
  // const [form] = Form.useForm()
  // const [collapsed, setCollapsed] = useState(false);
  // const [fileList, setFileList] = useState([])
  // const filesCollectionsRef = collection(db, 'files')
  // const pafFileListRef = ref(storage, 'pdfFiles/')
  // const [fileUpload, setFileUpload] = useState(null)
  const signCanvas = useSelector(selectSignCanvas)
  console.log('signCanvas: ', signCanvas);

  const hamdleDownload = () => {
    // downloadPDF(canvasInstanceList.value[0])
    console.log('signCanvas: ', signCanvas);
    downloadMultiPagePDF(signCanvas)
    setCurrentStep('4')
    // currentStep.current = '4'
  }

  // const [pdfFileList, setpdfFileList] = useState([])
  // const getFiles = async () => {
  //   // collection
  //   try {
  //     const data = await getDocs(filesCollectionsRef)
  //     console.log('data: ', data);
  //     const filterData = data.docs.map(doc => {
  //       return {
  //         ...doc.data(),
  //         id: doc.id
  //       }
  //     })
  //     setFileList(filterData)
  //     console.log('filterData: ', filterData);
      
  //   } catch (error) {
  //       console.error(error)
  //   }
  // }

 

  useEffect(() => {
    // getFiles()
  }, [])



  
  // useEffect(() => {
  //   const getListAll = async () => {
  //     try {
  //       const res = await listAll(pafFileListRef)
  //       res.items.forEach((item) => {
  //         // const da = getBytes(pafFileListRef)
  //         // console.log('da: ', da);
          
  //         // console.log('getBytes: ', getBytes);
  //         // console.log('item.storage: ', item.storage);
  //         getDownloadURL(item).then(url => {
  //           setpdfFileList((prev) => [...prev, url])
  //         })
  //       })
  //       console.log('res: ', res);
        
  //     } catch (error) {
  //       console.error(error)
  //     }

  //   }
  //   getListAll()
  // }, [])
  // const logFiles = () => {
  //   console.log(pdfFileList);

  // }

  
  // const updateData = async (fileItem) => {
    
  //   // const id= 'Vndvs0ARKZm7wnbtB0Hk'
  //   const fileDoc = doc(db, "files", fileItem.id )
  //   try {
      
  //     const res = await updateDoc(fileDoc, { title: 'updateTitle'})
  //     console.log('res: ', res);
  //   getFiles()

  //   } catch (error) {
  //     console.error(error)
      
  //   }
  // }
  // const deleteData = async (id) => {
    
  //   // const id= 'Vndvs0ARKZm7wnbtB0Hk'
  //   const fileDoc = doc(db, "files",id )
  //   try {
      
  //     const res = await deleteDoc(fileDoc)
  //     console.log('res: ', res);
  //   getFiles()

  //   } catch (error) {
  //     console.error(error)
      
  //   }
  // }

  // const addData = async () => {
  //   const data = {
  //       createdAt: new Date().getTime(),
  //         // "createdAt": {
  //         //     "seconds": 1693490207,
  //         //     "nanoseconds": 281000000
  //         // },
  //         size: 2235,
  //         name: "456",
  //     title: "456",
  //         userId: auth?.currentUser?.uid
  //   }
  //   try {
      
  //     const res = await addDoc(filesCollectionsRef, data)
  //     getFiles()
  //     console.log('res: ', res);
  //   } catch (error) {
  //     console.error(error)
      
  //   }
  // }

  // const uploadFile = async () => {
  //   if (!fileUpload) return
  //   console.log('fileUpload: ', fileUpload);
  //   const pdfFilesFolderRef = ref(storage, `pdfFiles/${fileUpload.name + v4()}`)
    
  //   try {
  //     const res =  await uploadBytes(pdfFilesFolderRef, fileUpload)
  //     console.log('res: ', res);
  //     // getFiles()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  useEffect(() => {
    // 離開始清除
    dispatch(resetSignCanvas())
  }, [navigete])
  
  
  return (
    <>
      {
        <Layout >
          <StepProgress currentStep={currentStep}>
            <Space size={8} style={{
            marginLeft: '20px'
          }}>
            <Button type="default" onClick={() => {
                navigete('/docView')
                dispatch(resetSignCanvas())
                
          }}>
              取消
            </Button>
            <Button type="primary" onClick={hamdleDownload}>
              下載檔案
              </Button>
              </Space>
            {/* <Link to="/confirmDoc">prev</Link> */}
            {/* <Link to="/signDoc">next</Link> */}
          </StepProgress>
          <Sign/>
        </Layout>
      }
    </>
  );
}

export default SignView