import * as React from 'react'
import './sass/create-drawing.style.sass'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Canvas from '../canvas/Canvas.component'
import NavBar from '../navbar/navbar.component'
import useHttp from '../../hooks/useHttp'
import ModalInfo from '../ModalInfo'
import AuthenticationUtils from '../../utils/AuthenticationUtils'
import useCommonUtils from '../../hooks/useCommonUtils'
import RoutesConfig from '../../config/routes-config'
import Config from '../../config/config'

const CreateDrawing = props => {
  const httpRequest = useHttp('axios')
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
  const history = useHistory()
  const CommonUtils = useCommonUtils()
  const [saveModal, setSaveModal] = React.useState({
    show: false,
    title: 'Success!',
    body: '',
    bodyInfo: '',
    bodyInfoClass: '',
  })

  const [drawingName, setDrawingName] = React.useState<string>('')
  const [isBackendError, setIsBackendError] = React.useState<boolean>(false)
  const [canvasInfo, setCanvasInfo] = React.useState(null)
  const [drawingStartTime, setDrawingStartTime] = React.useState(null)
  const [brushColor, setBrushColor] = React.useState<string>(
    () => BRUSH_COLOR_RED,
  )
  const [brushStrokeSize, setBrushStrokeSize] = React.useState<number>(
    BRUSH_SIZE_EXTRA_SMALL,
  )
  const [brushType, setBrushType] = React.useState<string>(
    () => BRUSH_TYPE_ROUND,
  )
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

  const [eraseMode, setEraseMode] = React.useState<boolean>(false)

  const onHideSaveModal = () => {
    return
  }

  const modalHideHandler = () => {
    console.log('hiding the modal')
    setSaveModal(prevState => {
      const prevStateCopy = Object.assign({}, prevState)
      prevStateCopy.show = false
      return prevStateCopy
    })

    if (!isBackendError) history.push(RoutesConfig.drawingList.route)
  }

  const drawingNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setDrawingName(target.value)
  }

  const saveDrawing = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('saveDrawing was invoked')
    const drawingEndTime = new Date().getTime()
    const timeDifferenceInSeconds = CommonUtils.calculateTimeDifferenceInSeconds(
      drawingStartTime,
      drawingEndTime,
    )

    console.log(
      'saveDrawing - startTime:',
      drawingStartTime,
      ' - endTime:',
      drawingEndTime,
    )
    console.log(
      'saveDrawing - timeDifferenceInSeconds is:',
      timeDifferenceInSeconds,
    )
    const imageData = canvasInfo.toDataURL('image/png', 1.0)
    console.log('imageData:', imageData)

    const saveModalCopy = Object.assign({}, saveModal)

    try {
      const save = await httpRequest({
        method: 'post',
        url: `${Config.settings.endpoint}/images/save`,
        data: {
          drawingName,
          imageData,
          userId: AuthenticationUtils.getAuth().userId,
          creationTime: timeDifferenceInSeconds,
        },
      })

      const {
        data: {isSaved},
      } = save

      const {
        data: {message},
      } = save

      saveModalCopy.title = isSaved ? 'Success!' : 'Error'
      saveModalCopy.bodyInfo = message
      saveModalCopy.bodyInfoClass = `alert ${
        isSaved ? 'alert-success' : 'alert-info'
      }`
      setIsBackendError(!isSaved)
    } catch (error) {
      setIsBackendError(true)
      saveModalCopy.title = 'Error!'
      saveModalCopy.bodyInfo = error.message
      saveModalCopy.bodyInfoClass = 'alert alert-danger'
    }

    saveModalCopy.show = true
    setSaveModal(saveModalCopy)
  }

  return (
    <>
      <NavBar />
      <div className="section-dashboard mx-auto">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header drawing-section-header text-light">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="drawing-title-create text-dark">
                        Drawing
                      </h1>

                      <form
                        onSubmit={saveDrawing}
                        className="float-right create-drawing-save-section"
                      >
                        <div className="form-group form-inline form-wrapper-save-section mb-0">
                          <input
                            type="text"
                            className="form-control float-right drawing-name-input"
                            placeholder="Enter drawing name"
                            value={drawingName}
                            onChange={drawingNameHandler}
                            required={true}
                          />

                          <input
                            type="submit"
                            value="Save"
                            className="btn btn-warning float-right ml-2"
                          />
                        </div>
                      </form>
                    </div>

                    {/* <div className="col-md-6">
                      
                    </div> */}
                  </div>
                </div>
                <div className="card-body pt-5">
                  <div className="row">
                    <div className="col-md-12">
                      {React.useMemo(() => {
                        return (
                          <Canvas
                            brushColor={brushColor}
                            brushStrokeSize={brushStrokeSize}
                            brushType={brushType}
                            canvasInfoCallback={setCanvasInfo}
                            drawingStartTimeCallback={setDrawingStartTime}
                            eraseMode={eraseMode}
                          />
                        )
                      }, [brushColor, brushStrokeSize, brushType, eraseMode])}
                    </div>
                  </div>
                  <div className="row mt-5 p-0 m-0 bg-light">
                    <div className="col-md-4 p-3 drawing-section">
                      <div className="drawing-title mb-2 w-100">Colors:</div>

                      {Object.keys(brushColors).map(item => (
                        <div
                          key={item}
                          className="rounded-circle brush-colors"
                          style={{
                            backgroundColor: brushColors[item],
                          }}
                          onClick={() => {
                            setBrushColor(brushColors[item])
                            setEraseMode(false)
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="col-md-3 p-3 drawing-section">
                      <div className="drawing-title mb-2 w-100">
                        Brush Sizes:
                      </div>

                      {Object.keys(brushSizes).map((item, index) => (
                        <div
                          key={item}
                          className="rounded-circle brush-sizes"
                          style={{
                            width: brushSizes[item],
                            height: brushSizes[item],
                            marginTop: (index + 2) * 2 + 'px',
                          }}
                          onClick={() => {
                            setBrushStrokeSize(brushSizes[item])
                            setEraseMode(false)
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="col-md-3 p-3 drawing-section">
                      <div className="drawing-title mb-2 w-100">
                        Brush Types:
                      </div>

                      {Object.keys(brushTypes).map(item => (
                        <div
                          key={item}
                          className={`brush-types ${
                            brushTypes[item] === BRUSH_TYPE_ROUND
                              ? 'rounded-circle'
                              : ''
                          }`}
                          onClick={() => {
                            setBrushType(brushTypes[item])
                            setEraseMode(false)
                          }}
                        ></div>
                      ))}
                    </div>

                    <div className="col-md-2 p-3 drawing-section">
                      <div className="drawing-title mb-2 w-100">Erase:</div>
                      <div
                        className="eraser-wraper"
                        onClick={() => setEraseMode(true)}
                      >
                        <FontAwesomeIcon
                          className="brush-eraser"
                          icon={['fas', 'eraser']}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalInfo
          show={saveModal.show}
          onHide={onHideSaveModal}
          title={saveModal.title}
          hideHandler={modalHideHandler}
          body={saveModal.body}
          bodyInfo={saveModal.bodyInfo}
          bodyInfoClass={saveModal.bodyInfoClass}
        />
      </div>
    </>
  )
}

export default CreateDrawing
