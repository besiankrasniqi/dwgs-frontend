import * as React from 'react'
import '../canvas/sass/Canvas.style.sass'

interface Props {
  brushColor: string
  brushStrokeSize: number
  brushType: string
  eraseMode: boolean
  canvasInfoCallback: Function
  drawingStartTimeCallback: Function
}

const Canvas = ({
  brushColor,
  brushStrokeSize,
  brushType,
  eraseMode,
  canvasInfoCallback,
  drawingStartTimeCallback,
}: Props): React.ReactElement => {
  let sketch = false
  const BUTTON = 0b01
  const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON
  const [drawingStartTime, setDrawingStartTime] = React.useState(null)
  const [isDrawingStarted, setIsDrawingStarted] = React.useState(false)

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  let canvas, contextCanvas
  let lastDot, brush

  React.useEffect(() => {
    canvas = canvasRef.current
    if (canvas) {
      contextCanvas = canvas.getContext('2d')
      canvasInfoCallback(canvas)
    }
  }, [
    canvas,
    contextCanvas,
    brushColor,
    brushStrokeSize,
    brushType,
    isDrawingStarted,
    eraseMode,
  ])

  React.useEffect(() => {
    drawingStartTimeCallback(drawingStartTime)
  }, [drawingStartTime])

  const brushContinue = newDot => {
    contextCanvas.beginPath()
    contextCanvas.moveTo(lastDot[0], lastDot[1])

    contextCanvas.globalCompositeOperation = eraseMode
      ? 'destination-out'
      : 'source-over' //added

    contextCanvas.lineCap = brushType
    contextCanvas.lineJoin = brushType
    contextCanvas.strokeStyle = brushColor
    contextCanvas.lineWidth = brushStrokeSize
    contextCanvas.lineTo(newDot[0], newDot[1])
    contextCanvas.stroke()
    lastDot = newDot
  }

  const startStroke = point => {
    console.log('Canvas - startStroke')

    sketch = true
    lastDot = point
  }

  const getTouchPoint = e => {
    if (!e.currentTarget) {
      return [0, 0]
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.targetTouches[0]
    return [touch.clientX - rect.left, touch.clientY - rect.top]
  }

  const mouseMove = e => {
    console.log('Canvas - mouseMove')

    if (!sketch) {
      return
    }
    brushContinue([e.offsetX, e.offsetY])
  }

  const mouseDown = e => {
    console.log('Canvas - mouseDown')

    if (sketch) {
      return
    }
    e.preventDefault()
    if (canvas) {
      if ('undefined' !== typeof canvas['addEventListener']) {
        canvas['addEventListener']('mousemove', mouseMove, false)
        startStroke([e.offsetX, e.offsetY])
      }
    }
  }

  const mouseEnter = e => {
    console.log('Canvas - mouseEnter')

    if (!mouseButtonIsDown(e.buttons) || sketch) return
    mouseDown(e)
  }

  const endStroke = e => {
    console.log('Canvas - endStroke')

    if (!sketch) {
      return
    }
    sketch = false
    e.currentTarget.removeEventListener('mousemove', mouseMove, false)

    if (!isDrawingStarted) {
      console.log('Canvas startStroke drawing started')
      setIsDrawingStarted(true)
      setDrawingStartTime(new Date().getTime())
    }
  }

  const touchStart = e => {
    if (sketch) {
      return
    }

    console.log('Canvas - touchStart:', touchStart)

    e.preventDefault()
    startStroke(getTouchPoint(e))
  }

  const touchMove = e => {
    console.log('Canvas - touchMove')

    if (!sketch) {
      return
    }
    brushContinue(getTouchPoint(e))
  }

  const touchEnd = e => {
    console.log('Canvas - touchEnd')

    sketch = false
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <canvas
            id="canvas"
            className="canvas-drawing"
            ref={canvasRef}
            width="800"
            height="300"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            onTouchCancel={touchEnd}
            onTouchMove={touchMove}
            onMouseDown={mouseDown}
            onMouseUp={endStroke}
            onMouseOut={endStroke}
            onMouseEnter={mouseEnter}
          ></canvas>
        </div>
      </div>
    </>
  )
}

export default Canvas
