//import React, { useEffect, useState, useRef } from 'react'
import * as React from 'react'
import NavBar from '../navbar/navbar.component'
import {useHistory} from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import AuthenticationUtils from '../../utils/AuthenticationUtils'
import ModalInfo from '../ModalInfo'
import RoutesConfig from '../../config/routes-config'
import Config from '../../config/config'

const SingleImage = ({match}): React.ReactElement => {
  const [isPubliclyAccessed, setIsPubliclyAccessed] = React.useState(false)
  const history = useHistory()
  const httpRequest = useHttp('axios')
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [drawingId, setDrawingId] = React.useState<number>(null)
  const [drawingName, setDrawingName] = React.useState<string>(null)
  const [showDeleteButton, setShowDeleteButton] = React.useState<boolean>(false)
  const [isBackendError, setIsBackendError] = React.useState(false)

  let canvas, contextCanvas

  const [infoModal, setInfoModal] = React.useState({
    show: false,
    title: 'Success!',
    body: '',
    bodyInfo: '',
    bodyInfoClass: '',
  })

  const loadImageDataUrl = dataBase64 => {
    const imageObj = new Image()
    imageObj.onload = function() {
      contextCanvas.drawImage(this, 0, 0)
    }

    imageObj.src = dataBase64
  }

  const goToAllDrawings = () => {
    history.push(RoutesConfig.drawingList.route)
  }

  const deleteDrawing = () => {
    const infoModalCopy = Object.assign({}, infoModal)

    try {
      httpRequest({
        method: 'delete',
        url: `${Config.settings.endpoint}/images/delete-image`,
        params: {
          id: drawingId,
        },
      }).then(response => {
        const {
          data: {isDeleted},
        } = response

        const {
          data: {message},
        } = response

        if (isDeleted) {
          infoModalCopy.title = isDeleted ? 'Success!' : 'Error!'
          infoModalCopy.bodyInfo = message
          infoModalCopy.bodyInfoClass = `alert ${
            isDeleted ? 'alert-success' : 'alert-danger'
          }`

          infoModalCopy.bodyInfoClass = `alert alert-success`
          setIsBackendError(!isDeleted)
          infoModalCopy.show = true
          setInfoModal(infoModalCopy)
        }
      })
    } catch (error) {
      setIsBackendError(true)
      infoModalCopy.title = 'Error!'
      infoModalCopy.bodyInfo = error.response.data.message
      infoModalCopy.bodyInfoClass = 'alert alert-danger'
      infoModalCopy.show = true
      setInfoModal(infoModalCopy)
    }
  }

  const onHideinfoModal = () => {
    return
  }

  const modalHideHandler = () => {
    setInfoModal(prevState => {
      const prevStateCopy = Object.assign({}, prevState)
      prevStateCopy.show = false
      return prevStateCopy
    })

    if (!isBackendError) history.push(RoutesConfig.drawingList.route)
  }

  React.useEffect(() => {
    const urlParams = match.params
    const imageId = urlParams.id
    canvas = canvasRef.current
    if (canvas) {
      contextCanvas = canvas.getContext('2d')
    }

    httpRequest({
      method: 'get',
      url: `${Config.settings.endpoint}/images/${
        !isPubliclyAccessed ? 'get-image' : 'get-public-image'
      }`,
      params: {
        id: imageId,
      },
    }).then(response => {
      const {
        data: {imageBase64: base64Data},
      } = response

      const {
        data: {drawingName: name},
      } = response

      const {
        data: {userId},
      } = response

      const {
        data: {id: id},
      } = response

      setShowDeleteButton(userId === AuthenticationUtils.getAuth().userId)

      if (id) {
        loadImageDataUrl(base64Data)
        setDrawingName(name)
        setDrawingId(id)
      } else {
        //show modal
        const infoModalCopy = Object.assign({}, infoModal)
        infoModalCopy.title = 'Error!'
        infoModalCopy.bodyInfo = 'This drawing does not exist!'
        infoModalCopy.bodyInfoClass = 'alert alert-danger'
        infoModalCopy.show = true
        setInfoModal(infoModalCopy)
      }
    })
  }, [canvas, contextCanvas, isPubliclyAccessed])

  React.useEffect(() => {
    setIsPubliclyAccessed(true)
    if (AuthenticationUtils.getAuth()) {
      if (AuthenticationUtils.getAuth().isAuthorized) {
        setIsPubliclyAccessed(false)
      } else {
        const urlParams = match.params
      }
    }
  }, [])

  return (
    <>
      {!isPubliclyAccessed ? <NavBar /> : null}
      <div className="section-dashboard mx-auto">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header drawing-section-header text-light">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="drawing-title-single text-dark">
                        {drawingName}
                      </h1>

                      <div
                        className="btn btn-warning float-right"
                        onClick={goToAllDrawings}
                      >
                        <strong>All Drawings</strong>
                      </div>
                    </div>
                    {/* <div className="col-md-2">
                      {!isPubliclyAccessed ? (
                        <div
                          className="btn btn-warning float-right"
                          onClick={goToAllDrawings}
                        >
                          <strong>All Drawings</strong>
                        </div>
                      ) : null}
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="card-body bg-white pt-5 pb-5">
                <div className="row">
                  <div className="col-md-12">
                    <canvas
                      id="single-drawing-canvas"
                      className="canvas-drawing"
                      ref={canvasRef}
                      width="800"
                      height="300"
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showDeleteButton ? (
            <div className="row m-0 p-0">
              <div className="col-md-12 alert alert-danger">
                <div className="btn btn-danger" onClick={deleteDrawing}>
                  Delete Drawing
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <ModalInfo
        show={infoModal.show}
        onHide={onHideinfoModal}
        title={infoModal.title}
        hideHandler={modalHideHandler}
        body={infoModal.body}
        bodyInfo={infoModal.bodyInfo}
        bodyInfoClass={infoModal.bodyInfoClass}
      />
    </>
  )
}

export default SingleImage
