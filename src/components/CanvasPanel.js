import { useEffect, useRef, useState } from "react"
import { pdfToImage, printMultiPage,} from '../helpers/pdf'
import { downloadMultiPagePDF } from '../helpers/downloadPDF'
import CanvasItem from "./CanvasItem"

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
  const downloadPDF2 = () => {
    //
    // downloadPDF(canvasInstanceList.value[0])
    downloadMultiPagePDF(pdfDataList)
  }

  return (
    <div>
      <button onClick={downloadPDF2}>downloadPDF2</button>

      <div className="" style={{
        margin: '24px 32px'
      }}>
              <CanvasItem  pdfUrl={pdfUrl} uploadFile={uploadFile}></CanvasItem>
        
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