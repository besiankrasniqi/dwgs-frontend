import * as React from 'react'
import './sass/create-drawing.style.sass'
import Canvas from './../Canvas.component'
import NavBar from '../navbar/navbar.component'

const CreateDrawing = props => {
  const BRUSH_COLOR_RED = '#d44a4a'
  const BRUSH_COLOR_BLUE = '#1866bb'
  const BRUSH_COLOR_DARK_GREY = '#5a4e4e'
  const BRUSH_COLOR_ORANGE = '#f19019'
  const BRUSH_COLOR_GREEN = '#799c79'
  const BRUSH_COLOR_YELLOW = '#ecdd2d'
  const BRUSH_SIZE_EXTRA_LARGE = 35
  const BRUSH_SIZE_LARGE = 30
  const BRUSH_SIZE_MEDIUM = 25
  const BRUSH_SIZE_SMALL = 20
  const BRUSH_SIZE_EXTRA_SMALL = 15
  const BRUSH_TYPE_ROUND = 'round'
  const BRUSH_TYPE_SQUARE = 'square'

  const [brushColor, setBrushColor] = React.useState<string>(BRUSH_COLOR_RED)
  const [brushStrokeSize, setBrushStrokeSize] = React.useState<number>(
    BRUSH_SIZE_EXTRA_SMALL,
  )
  const [brushType, setBrushType] = React.useState<string>(BRUSH_TYPE_ROUND)
  const brushColors = {
    red: BRUSH_COLOR_RED,
    blue: BRUSH_COLOR_BLUE,
    darkGrey: BRUSH_COLOR_DARK_GREY,
    orange: BRUSH_COLOR_ORANGE,
    green: BRUSH_COLOR_GREEN,
    yellow: BRUSH_COLOR_YELLOW,
  }

  const brushSizes = {
    extraLarge: BRUSH_SIZE_EXTRA_LARGE,
    large: BRUSH_SIZE_LARGE,
    medium: BRUSH_SIZE_MEDIUM,
    small: BRUSH_SIZE_SMALL,
    extraSmall: BRUSH_SIZE_EXTRA_SMALL,
  }

  const brushTypes = {
    round: BRUSH_TYPE_ROUND,
    square: BRUSH_TYPE_SQUARE,
  }

  return (
    <>
      <div className="section-dashboard mx-auto mt-5">
        <div className="content">
          <NavBar />

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">Create Drawing</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <Canvas
                        brushColor={brushColor}
                        brushStrokeSize={brushStrokeSize}
                        brushType={brushType}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      {Object.keys(brushColors).map(item => (
                        <div
                          key={item}
                          className="rounded-circle brush-colors"
                          style={{
                            backgroundColor: brushColors[item],
                          }}
                          onClick={() => setBrushColor(brushColors[item])}
                        ></div>
                      ))}
                    </div>
                    <div className="col-md-4">
                      {Object.keys(brushSizes).map((item, index) => (
                        <div
                          key={item}
                          className="rounded-circle brush-sizes"
                          style={{
                            width: brushSizes[item],
                            height: brushSizes[item],
                            marginTop: (index + 2) * 2 + 'px',
                          }}
                          onClick={() => setBrushStrokeSize(brushSizes[item])}
                        ></div>
                      ))}
                    </div>
                    <div className="col-md-4">
                      {Object.keys(brushTypes).map(item => (
                        <div
                          key={item}
                          className={`brush-types ${
                            brushTypes[item] === BRUSH_TYPE_ROUND
                              ? 'rounded-circle'
                              : ''
                          }`}
                          onClick={() => setBrushType(brushTypes[item])}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateDrawing
