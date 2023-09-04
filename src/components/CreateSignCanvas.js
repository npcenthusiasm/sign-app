import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'

const CreateSignCanvas = forwardRef((_, ref) => {
  const canvasDom = useRef(null)
  const isPainting = useRef(false)

  console.log('render')

  const getPaintPosition = (e) => {
    const canvasSize = canvasDom.current.getBoundingClientRect()

    if (e.type === 'mousemove') {
      return {
        x: e.clientX - canvasSize.left,
        y: e.clientY - canvasSize.top
      }
    } else {
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top
      }
    }
  }

  const draw = (e) => {
    // 滑鼠移動過程中，若非繪圖狀態，則跳出
    if (!isPainting.current) return

    // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
    const paintPosition = getPaintPosition(e)

    // 移動滑鼠位置並產生圖案
    const ctx = canvasDom.current.getContext('2d')
    ctx.lineTo(paintPosition.x, paintPosition.y)
    ctx.stroke()
  }

  const startPosition = (e) => {
    e.preventDefault()
    isPainting.current = true
  }

  const finishedPosition = () => {
    isPainting.current = false
    const ctx = canvasDom.current.getContext('2d')

    ctx.beginPath()
  }

  useEffect(() => {
    const canvas = canvasDom.current

    const ctx = canvas.getContext('2d')

    ctx.lineWidth = 4
    ctx.lineCap = 'round'

    // event listener 電腦板
    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', finishedPosition)
    canvas.addEventListener('mouseleave', finishedPosition)
    canvas.addEventListener('mousemove', draw)

    // // event listener 手機板
    // canvas.addEventListener('touchstart', startPosition)
    // canvas.addEventListener('touchend', finishedPosition)
    // canvas.addEventListener('touchcancel', finishedPosition)
    // canvas.addEventListener('touchmove', draw)
    return () => {
      console.log('destroyed')
      canvas.removeEventListener('mousedown', startPosition)
      canvas.removeEventListener('mouseup', finishedPosition)
      canvas.removeEventListener('mouseleave', finishedPosition)
      canvas.removeEventListener('mousemove', draw)
    }
  }, [])

  const getCanvas = () => {
    return canvasDom.current
  }

  useImperativeHandle(ref, () => {
    return {
      getCanvas
    }
  })

  return (
    <div>
      <canvas
        ref={canvasDom}
        id="canvas"
        width="470"
        height="202"
        style={{
          border: '1px solid #DADBE1',
          backgroundColor: '#F1F2F5'
        }}
      ></canvas>
    </div>
  )
})

export default CreateSignCanvas
