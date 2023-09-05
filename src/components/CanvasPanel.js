import { useEffect, useRef, useState } from 'react'
// import { pdfToImage, printMultiPage } from '../helpers/pdf'
// import { downloadMultiPagePDF } from '../helpers/downloadPDF'
import CanvasItem from './CanvasItem'
import { Button, Input, Layout, Menu, Modal, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectShowModal, setShowModal } from '../slice/SignSlice'
import CreateSignCanvas from './CreateSignCanvas'

const CanvasPanel = ({ pdfUrl, menuActiveKey }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('CanvasPanel render')
  }
  // console.log('pdfFileList: ', pdfFileList);
  // const [pagesCanvas, setPdfDataList] = useState([])
  const [pagesCanvas, setPagesCanvas] = useState([])

  // const renderPDF = async (file) => {
  //   const { pagesCanvas, pages } = await printMultiPage(file)
  //   console.log('pages: ', pages);
  //   console.log('pagesCanvas: ', pagesCanvas);
  //   setPdfDataList(pagesCanvas)
  // }

  // const inputOnChange2 = (e) => {
  //   renderPDF(e.target.files[0])
  // }
  const childsRef = useRef([])
  const signCanvasdRef = useRef(null)
  const [inputText, setInputText] = useState('')

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpen = useSelector(selectShowModal)

  const dispatch = useDispatch()

  /**
   * 將 某一頁的 pdf 轉成 canvas
   * @param {*} pdfDoc
   * @param {*} page
   * @returns
   */
  const createPageCanvas = async (pdfDoc, page = 1) => {
    console.log('pdfDoc: ', pdfDoc)
    const pdfPage = await pdfDoc.getPage(page)
    const viewport = pdfPage.getViewport({
      scale: window.devicePixelRatio
    })
    // 將 Canvas 調整為 PDF 頁面大小
    // console.log('canvasDom.current: ', canvasDom.current);
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    // 設定 PDF 所要顯示的寬高及渲染
    canvas.height = viewport.height
    canvas.width = viewport.width
    const renderContext = {
      canvasContext: context,
      viewport
    }
    const renderTask = pdfPage.render(renderContext)

    // 回傳做好的 PDF canvas
    return renderTask.promise.then(() => canvas)
  }

  /**
   * 透過 pdfjsLib 取得所有頁面的 pdf canvas
   */
  const getPagesCanvas = async (pdfUrl) => {
    const pdfDoc = await window.pdfjsLib.getDocument(pdfUrl).promise
    console.log('pdfDoc: ', pdfDoc)

    const pagesCanvas = []
    for (let page = 1; page <= pdfDoc.numPages; page++) {
      const pCanvas = await createPageCanvas(pdfDoc, page)
      console.log('pCanvas: ', pCanvas)
      pagesCanvas.push(pCanvas)
    }
    return pagesCanvas
  }

  const prepareItems = async () => {
    const pagesCanvas = await getPagesCanvas(pdfUrl)
    console.log('pagesCanvas: ', pagesCanvas)
    setPagesCanvas(pagesCanvas)
  }

  useEffect(() => {
    prepareItems()
  }, [pdfUrl])

  const showModal = () => {
    dispatch(setShowModal(true))
    // setIsModalOpen(true);
  }
  const handleOk = () => {
    switch (menuActiveKey) {
      case 'sign':
        handleSignImgPaste()
        break
      case 'text':
        handleTextPaste()
        break
      default:
        break
    }
    dispatch(setShowModal(false))
    // setIsModalOpen(false);
  }

  const handleCancel = () => {
    // setIsModalOpen(false);
    dispatch(setShowModal(false))
  }
  const clickUseTexteBtn = () => {
    // setIsModalOpen(false);
    handleTextPaste()
  }
  const onInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleTextPaste = () => {
    console.log('childsRef.current[0]: ', childsRef.current[0])
    childsRef.current[0].updateText(inputText)
  }

  const handleSignImgPaste = () => {
    // NOTE: 流程要再條
    const signCanvas = signCanvasdRef.current.getCanvas()
    const imgSrc = signCanvas.toDataURL('image/png')
    //
    const getPDFCanvas = childsRef.current[0].getPDFCanvas()
    window.fabric.Image.fromURL(imgSrc, function (image) {
      // 設定簽名出現的位置及大小
      image.top = 20
      image.left = 20
      image.scaleX = 0.4
      image.scaleY = 0.4
      getPDFCanvas.add(image)
    })
  }

  const downloadPDF2 = () => {
    //
    // downloadPDF(canvasInstanceList.value[0])
    // downloadMultiPagePDF(pdfDataList)
    downloadPDFSelf()
  }

  const downloadPDFSelf = () => {
    console.log('childsRef.current: ', childsRef.current)
    // childsRef.current.downloadPDFSelf(downloadMultiPagePDF)
    // childsRef.current.downloadPDFSelf(downloadMultiPagePDF)
  }

  return (
    <div>
      {/* <button onClick={downloadPDF2}>downloadPDF2</button> */}

      <div
        className=""
        style={{
          margin: '24px 32px'
        }}
      >
        <Button type="primary" onClick={downloadPDFSelf}>
          downloadPDFSelf
        </Button>

        <Modal
          title="新增簽名"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="使用"
          cancelText="取消"
        >
          {menuActiveKey === 'text' && (
            <Space
              size={16}
              direction="vertical"
              style={{
                display: 'flex'
              }}
            >
              <Input
                defaultValue={inputText}
                size="large"
                placeholder="請輸入文字"
                onChange={onInputChange}
              ></Input>
            </Space>
          )}
          {menuActiveKey === 'sign' && (
            <CreateSignCanvas ref={signCanvasdRef} />
          )}
        </Modal>

        {/* <CanvasItem
          pdfUrl={pdfUrl}
          uploadFile={uploadFile}
          ref={childsRef}
        ></CanvasItem> */}

        {pagesCanvas.map((pdfCanvas, index) => {
          return (
            <div
              style={{
                marginBottom: '20px'
              }}
            >
              <CanvasItem
                key={index}
                pdfCanvas={pdfCanvas}
                index={index}
                // pdfUrl={pdfUrl}
                // uploadFile={uploadFile}
                ref={(ref) => (childsRef.current[index] = ref)}
              ></CanvasItem>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default CanvasPanel
