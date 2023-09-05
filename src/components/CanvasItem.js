import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react'
import { pdfCanvasToImage } from '../helpers/pdf'
import { useDispatch } from 'react-redux'
import { setSignCanvasToList } from '../slice/SignSlice'

const CanvasItem = forwardRef(({ pdfCanvas, index }, ref) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('CanvasItem render')
  }

  const dispatch = useDispatch()
  const canvasDom = useRef(null)
  const fabricCanvas = useRef(null)
  // 測試用
  // const pdfData = 'https://firebasestorage.googleapis.com/v0/b/river-runner-369506.appspot.com/o/pdfFiles%2Fdownload.pdf969f82ac-c10e-424f-aa37-b9813adcf368?alt=media&token=2d9bd387-9505-4a76-98ea-f1878809de71'

  useEffect(() => {
    const canvas = new window.fabric.Canvas(canvasDom.current)
    fabricCanvas.current = canvas
  }, [])

  useEffect(() => {
    console.log('onchnge')
    preparePage(pdfCanvas)
  }, [pdfCanvas])

  const preparePage = async () => {
    await handlePdfCanvasToFabricCanvas(pdfCanvas)
    dispatch(
      setSignCanvasToList({
        fabricCanvas: fabricCanvas.current,
        index
      })
    )
  }

  /**
   * 將原本的 pdf canvas 轉成圖片之後，設定到 fabricCanvas 當成背景圖片
   */
  const handlePdfCanvasToFabricCanvas = async (pageCamvas) => {
    const pdfImage = await pdfCanvasToImage(pageCamvas)
    // 透過比例設定 canvas 尺寸
    fabricCanvas.current.setWidth(pdfImage.width / window.devicePixelRatio)
    fabricCanvas.current.setHeight(pdfImage.height / window.devicePixelRatio)
    // 將 PDF 畫面設定為背景
    fabricCanvas.current.setBackgroundImage(
      pdfImage,
      fabricCanvas.current.renderAll.bind(fabricCanvas.current)
    )
  }

  const updateText = (signText) => {
    const text = new window.fabric.Text(signText, {
      left: 50,
      top: 50,
      hasControls: true
    })
    fabricCanvas.current.add(text)
  }

  // const addImgToCanvasBySrc = (canvas, options) => {
  //   // const vm = this
  //   // TODO: retur promise to await
  //   window.fabric.Image.fromURL(options.imgSrc, function (image) {
  //     const left = canvas._previousPointer.x

  //     const top = canvas._previousPointer.y

  //     // 設定簽名出現的位置及大小，後續可調整
  //     image.top = top
  //     image.left = left
  //     image.scaleX = 0.4
  //     image.scaleY = 0.4

  //     canvas.add(image)
  //   })
  // }

  const downloadPDFSelf = (downloadFn) => {
    console.log(123)
    downloadFn([fabricCanvas.current])
  }

  const getPDFCanvas = () => {
    return fabricCanvas.current
  }

  useImperativeHandle(ref, () => {
    return {
      updateText,
      downloadPDFSelf,
      getPDFCanvas
    }
  })

  return (
    <div>
      <canvas ref={canvasDom} width={500} height={300}></canvas>
    </div>
  )
})

export default CanvasItem
