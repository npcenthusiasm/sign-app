/**
 * NOTE: require jsPDF library
 */
export const downloadPDF = (canvas) => {
  console.log('canvas: ', canvas)
  // 引入套件所提供的物件
  // eslint-disable-next-line new-cap
  const pdf = new window.jsPDF()

  // 將 canvas 存為圖片
  const image = canvas.toDataURL('image/JPEG')

  // 設定背景在 PDF 中的位置及大小
  const width = pdf.internal.pageSize.width
  const height = pdf.internal.pageSize.height
  pdf.addImage(image, 'JPEG', 0, 0, width, height)

  // 將檔案取名並下載
  pdf.save('download.pdf')
}

export const downloadMultiPagePDF = (canvasList) => {
  console.log('canvasList: ', canvasList)
  // eslint-disable-next-line new-cap
  const pdf = new window.jsPDF()

  canvasList.forEach((instance, index) => {
    if (index > 0) {
      pdf.addPage()
    }

    const imgWidth = pdf.internal.pageSize.width
    const imgHeight = pdf.internal.pageSize.height
    const canvasUrl = instance.toDataURL('image/JPEG')
    pdf.addImage(canvasUrl, 'JPEG', 0, 0, imgWidth, imgHeight)
  })
  pdf.save('download.pdf')
}
