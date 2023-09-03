import React, { useEffect, useRef, useState } from 'react'
import { Card, Layout ,message, Steps } from 'antd';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getBytes, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../config/firebase';
import { v4 } from 'uuid';
import UploadCard from '../components/UploadCard';
import ConfirmUpload from '../components/ConfirmUpload';
import Sign from '../components/Sign';
import { Link } from 'react-router-dom';
import StepProgress from '../components/StepProgress';


const { Header,  Content } = Layout;

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


export const SignView = () => {
  // const { token } = theme.useToken();
  // const currentStep = useRef(2);
  const [currentStep, setCurrentStep] = useState(2)
  // const [form] = Form.useForm()
  // const [collapsed, setCollapsed] = useState(false);
  const [fileList, setFileList] = useState([])
  const filesCollectionsRef = collection(db, 'files')
  // const pafFileListRef = ref(storage, 'pdfFiles/')
  const [fileUpload, setFileUpload] = useState(null)

  // const [pdfFileList, setpdfFileList] = useState([])
  const getFiles = async () => {
    // collection
    try {
      const data = await getDocs(filesCollectionsRef)
      console.log('data: ', data);
      const filterData = data.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
      setFileList(filterData)
      console.log('filterData: ', filterData);
      
    } catch (error) {
        console.error(error)
    }
  }
  useEffect(() => {
  
    getFiles()
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
 
  return (
    <>
      {
        <Layout >
          <StepProgress currentStep="3">
            <Link to="/confirmDoc">prev</Link>
            {/* <Link to="/signDoc">next</Link> */}
          </StepProgress>
          <Sign/>
        </Layout>
      }
    </>
  );
}

export default SignView