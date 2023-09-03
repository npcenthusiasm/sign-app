import { useEffect, useImperativeHandle, useRef,forwardRef } from "react"
import { pdfToImage, printMultiPage } from '../helpers/pdf'

const CanvasItem = forwardRef(({ pdfUrl, uploadFile, handleTextPaste }, ref) => {
  console.log('render');
  // const pdfData = 'https://firebasestorage.googleapis.com/v0/b/river-runner-369506.appspot.com/o/pdfFiles%2Fdownload.pdf969f82ac-c10e-424f-aa37-b9813adcf368?alt=media&token=2d9bd387-9505-4a76-98ea-f1878809de71'
  console.log('pdfUrl: ', pdfUrl);
  console.log('uploadFile: ', uploadFile);
  const canvasDom = useRef(null)
  const fabricCanvas = useRef(null)
  // const pdfDataList = useRef([])

  useEffect(() => {
    const canvas = new window.fabric.Canvas(canvasDom.current)
    fabricCanvas.current = canvas
  }, [])

  const loadFromUrl = (url) => {
    // const url = "https://firebasestorage.googleapis.com/v0/b/river-runner-369506.appspot.com/o/pdfFiles%2F%E5%90%8C%E6%84%8F%E6%9B%B8%E7%AF%84%E6%9C%AC.pdf?alt=media&token=3cd0032c-0abd-4c54-84d8-a0858c7961f7"
    // const canvas = new window.fabric.Canvas(canvasDom.current)
  console.log('pdfData: ', pdfUrl);
    const loadingTask = window.pdfjsLib.getDocument(url);
    console.log('loadingTask: ', loadingTask);
    

    loadingTask.promise.then((pdf) => {
      console.log('pdf: ', pdf);
      // 加載第一頁
      pdf.getPage(1).then((page) => {
          const viewport = page.getViewport({ scale: 1 });
  
          // 將 Canvas 調整為 PDF 頁面大小
          // console.log('canvasDom.current: ', canvasDom.current);
          fabricCanvas.current.setWidth(viewport.width);
          fabricCanvas.current.setHeight(viewport.height);
  
          // 渲染 PDF 到 Canvas
          page.render({
              canvasContext: fabricCanvas.current.getContext('2d'),
              viewport: viewport,
          });
      });
  });

  }

  const updateText = (signText) => {
    // console.log('c: ', c);
    // console.log('updateText');

    // console.log('childRef.current.fabricCanvas.current: ', childRef.current.fabricCanvas.current);
    console.log('fabricCanvas.current: ', fabricCanvas.current);
    // const left = fabricCanvas.current._previousPointer.x
    // const top = fabricCanvas.current._previousPointer.y

    const text = new window.fabric.Text(signText, {
      left: 50,
      top: 50,
      hasControls: true
    })
    console.log('text: ', text);

    fabricCanvas.current.add(text)
    // fabricCanvas.current.renderAll()

    // handleTextPaste(fabricCanvas.current)
  }

  const downloadPDFSelf = (downloadFn) => {
    downloadFn([fabricCanvas.current])
  }

  useImperativeHandle(ref, () => {
    return {
      updateText,
      downloadPDFSelf
    };
  });


  const loadFromFile = async (file) => {

    const readBlob = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result))
        reader.addEventListener('error', reject)
        reader.readAsDataURL(blob)
      })
    }

    const Base64Prefix = 'data:application/pdf;base64,'

    // 將檔案處理成 base64
    let pdfData = await readBlob(file)
  
    // 將 base64 中的前綴刪去，並進行解碼
    const data = atob(pdfData.substring(Base64Prefix.length))
    const pdfDoc = await window.pdfjsLib.getDocument({ data }).promise
    const totalPages = pdfDoc.numPages
    console.log('totalPages: ', totalPages)

    const createPageCanvas = async (page = 1) => {
      const pdfPage = await pdfDoc.getPage(page)
  
      // 設定尺寸及產生 canvas
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
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

    // step 將PDF
    const pdfImgCanvas = await createPageCanvas()


    const pdfImage = await pdfToImage(pdfImgCanvas)

      // 透過比例設定 canvas 尺寸
      fabricCanvas.current.setWidth(pdfImage.width / window.devicePixelRatio)
      fabricCanvas.current.setHeight(pdfImage.height / window.devicePixelRatio)

      // 將 PDF 畫面設定為背景
      fabricCanvas.current.setBackgroundImage(pdfImage, fabricCanvas.current.renderAll.bind(fabricCanvas.current))
  }

  useEffect(() => {
    console.log('onchnge');
    if (pdfUrl && pdfUrl !== '') {
      loadFromUrl(pdfUrl)
    } else if (uploadFile) {
      loadFromFile(uploadFile)
    }
  }, [pdfUrl, uploadFile])


  return (
    <div>
      <canvas ref={canvasDom} width={500} height={300}></canvas>
    </div>
  )
})
export default CanvasItem