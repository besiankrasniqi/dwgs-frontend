//import React, { useEffect, useState, useRef } from 'react'
import * as React from 'react'
import {Link} from 'react-router-dom'
import './sass/thumbnail.style.sass'

interface Props {
  id: string
  drawingName: string
  userName: string
  creationTime: string
  creationDate: string
  base64Data: string
}

const Thumbnail = ({
  id,
  drawingName,
  userName,
  creationTime,
  creationDate,
  base64Data,
}: Props): React.ReactElement => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  let canvas, contextCanvas

  const loadImageDataUrl = dataBase64 => {
    const imageObj = new Image()
    imageObj.onload = function() {
      contextCanvas.drawImage(this, 0, 0)
    }

    imageObj.src = dataBase64
  }

  React.useEffect(() => {
    canvas = canvasRef.current
    if (canvas) {
      contextCanvas = canvas.getContext('2d')
      console.log(
        'Thumbnail canvas is:',
        canvas,
        ' - contextCanvas is:',
        contextCanvas,
      )

      loadImageDataUrl(base64Data)
    }
  }, [canvas, contextCanvas])

  return (
    <>
      <Link
        to={{
          pathname: `/image/${id}`,
        }}
      >
        <div id={id} className="card thumbnail-wrapper float-left">
          <canvas
            ref={canvasRef}
            className="thumbnail-canvas"
            width="233"
            height="233"
          />

          <div className="thumbnail-meta mt-3">
            <div className="thumbnail-item-title">
              <strong>{drawingName}</strong>
            </div>

            <div className="thumbnail-item">drawingName</div>
            <div className="thumbnail-item">
              <strong>User:</strong> {userName}
            </div>

            <div className="thumbnail-item">
              <strong>Time:</strong> {creationTime}
            </div>

            <div className="thumbnail-item">
              <strong>Date:</strong> {creationDate}
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Thumbnail