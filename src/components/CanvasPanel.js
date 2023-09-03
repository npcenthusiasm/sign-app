import { useEffect, useRef, useState } from "react"
import { pdfToImage, printMultiPage,} from '../helpers/pdf'
import { downloadMultiPagePDF } from '../helpers/downloadPDF'
import CanvasItem from "./CanvasItem"
import { Button, Input, Layout, Menu, Modal, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectShowModal, setShowModal } from "../slice/SignSlice";

const CanvasPanel = ({ pdfUrl, uploadFile }) => {
  // console.log('pdfFileList: ', pdfFileList);
  const [pdfDataList, setPdfDataList] = useState([])
  // const renderPDF = async (file) => {
  //   const { pagesCanvas, pages } = await printMultiPage(file)
  //   console.log('pages: ', pages);
  //   console.log('pagesCanvas: ', pagesCanvas);
  //   setPdfDataList(pagesCanvas)
  // }

  // const inputOnChange2 = (e) => {
  //   renderPDF(e.target.files[0])
  // }
  const childRef = useRef(null);
  const [inputText, setInputText] = useState('')

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpen = useSelector(selectShowModal)

  const dispatch = useDispatch()

  const showModal = () => {
    dispatch(setShowModal(true))
    // setIsModalOpen(true);
  };
  const handleOk = () => {
    handleTextPaste()
    dispatch(setShowModal(false))

    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    dispatch(setShowModal(false))
  };
  const clickUseTexteBtn = () => {
    // setIsModalOpen(false);
    handleTextPaste()
  };
  const onInputChange = (e) => {
    setInputText(e.target.value)
    
  }
  const handleTextPaste = () => {
    childRef.current.updateText(inputText)
  }
  

  const downloadPDF2 = () => {
    //
    // downloadPDF(canvasInstanceList.value[0])
    // downloadMultiPagePDF(pdfDataList)
    downloadPDFSelf()
  }

  const downloadPDFSelf = () => {
    childRef.current.downloadPDFSelf(downloadMultiPagePDF)
  }

  return (
    <div>
      <button onClick={downloadPDF2}>downloadPDF2</button>

      <div className="" style={{
        margin: '24px 32px'
      }}>
         <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>

<Modal title="新增簽名" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="使用" cancelText="取消">
        <Space size={16} direction="vertical" style={{
             display: 'flex'
           }}>
          <Input
            defaultValue={inputText}
            size="large"
            placeholder="請輸入文字"
            onChange={onInputChange}
          >
          </Input>

          {/* <Button className="save" type="primary" onClick={handleTextPaste}
            >使用
          </Button> */}
        </Space>
        </Modal>


        
              <CanvasItem  pdfUrl={pdfUrl} uploadFile={uploadFile} ref={childRef}></CanvasItem>
        
        {/* {
          pdfFileList.map((pdf,i) => {
            return (
              <CanvasItem key={i} pdfData={pdf}></CanvasItem>
            )
          })
        } */}
      </div>
    </div>
  )
}
export default CanvasPanel