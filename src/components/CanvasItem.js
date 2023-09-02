import { useEffect, useRef } from "react"
import { pdfToImage, printMultiPage } from '../helpers/pdf'

const CanvasItem = ({ pdfUrl, uploadFile }) => {
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


  const loadFromFile = (file) => {

    const readBlob = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result))
        reader.addEventListener('error', reject)
        reader.readAsDataURL(blob)
      })
    }

    const createPageCanvas = async (page = 1) => {

    const Base64Prefix = 'data:application/pdf;base64,'

    // 將檔案處理成 base64
    file = await readBlob(file)

    // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(file.substring(Base64Prefix.length))
      const pdfDoc = await window.pdfjsLib.getDocument({ data }).promise
      const totalPages = pdfDoc.numPages
      
      const pdfPage = await pdfDoc.getPage(page)
  
      // 設定尺寸及產生 canvas
      const viewport = pdfPage.getViewport({ scale: 1 })
      // const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
      // const canvas = canvasDom.current
      // const context = canvas.getContext('2d')
  
      // 設定 PDF 所要顯示的寬高及渲染
      // canvas.height = viewport.height
      // canvas.width = viewport.width
      fabricCanvas.current.setWidth(viewport.width);
      fabricCanvas.current.setHeight(viewport.height);
      const renderContext = {
        canvasContext: fabricCanvas.current.getContext('2d'),
        viewport
      }
      const renderTask = pdfPage.render(renderContext)
  
      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => fabricCanvas.current)
    }

    createPageCanvas()
  }
//   const renaderCanvas = async () => {
// console.log('pdfData instanceof File', pdfData instanceof File);
//     if (pdfData !== '') {
//       loadFromUrl(pdfData)
//     }



//   // 從 url 讀取圖片
  
//   // 回傳圖片
//   // return new window.fabric.Image(pdfData, {
//     //   id: 'renderPDF',
//     //   scaleX: scale,
//     //   scaleY: scale
//     // })
    

//      // ------------------------------------------------------------------------
//     // ------------------------------------------------------------------------
//     // ------------------------------------------------------------------------
//     // ------------------------------------------------------------------------

  
//     // const fabricCanvas = new window.fabric.Canvas(canvasDom.current)
//   //   window.fabric.Image.fromURL(pdfData, img => {
//   //     console.log('img: ', img);
//   //     const oImg = img.set({
//   //     // 這邊可以設定上下左右距離、角度、寬高等等
//   //       left: 0,
//   //       top: 100,
//   //       angle: 15,
//   //       width: 500,
//   //       height: 500
//   //     })


//   //     // 將圖片縮放到寬高
//   // // const scale = 1 / window.devicePixelRatio

//   //     // oImg.scaleToWidth(img.width)
//   //     // oImg.scaleToHeight(img.height)
//   //     // 記得要加進入才會顯示
//   //     // console.log('fabricCanvas: ', fabricCanvas);
//   //     // fabricCanvas.add(img)
//   //     // 使用亮度濾鏡
//   //     // const filter = new fabric.Image.filters.Brightness({
//   //     //   brightness: 0.5
//   //     // })
//   //     // oImg.filters.push(filter)
//   //     // oImg.applyFilters()
//   //     fabricCanvas.setWidth(img.width / window.devicePixelRatio)
//   //      // // 透過比例設定 canvas 尺寸
//   //     fabricCanvas.setHeight(img.height / window.devicePixelRatio)
//   //     fabricCanvas.setBackgroundImage(oImg, fabricCanvas.renderAll.bind(fabricCanvas))

//   //   })


//     // ------------------------------------------------------------------------
//     // ------------------------------------------------------------------------
//     // ------------------------------------------------------------------------
//     // ------------------------------------------------------------------------

//     //  from file
//     // const canvas = new window.fabric.Canvas(canvasDom.current)

//     // const pdfImage = await pdfToImage(pdfData)
//     // // 透過比例設定 canvas 尺寸
//     // canvas.setWidth(pdfImage.width / window.devicePixelRatio)
//     // canvas.setHeight(pdfImage.height / window.devicePixelRatio)
//     // // 將 PDF 畫面設定為背景
//     // canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
//   }


  useEffect(() => {
    if (pdfUrl && pdfUrl !== '') {
      loadFromUrl(pdfUrl)
    } else if (uploadFile) {
      loadFromFile(uploadFile)
    }

    
    // console.log('pdfData: ', pdfData);
    // renaderCanvas()
  }, [pdfUrl, uploadFile])


  return (
    <div>
      <canvas ref={canvasDom} width={500} height={300}></canvas>
    </div>
  )
}
export default CanvasItem