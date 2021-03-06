//import React, { useEffect, useState, useRef } from 'react'
import * as React from 'react'
import NavBar from '../navbar/navbar.component'
import useHttp from '../../hooks/useHttp'
import {useHistory} from 'react-router-dom'
import Thumbnail from '../thumbnail/thumbnail.component'
import './sass/drawing-list.style.sass'
import RoutesConfig from '../../config/routes-config'
import Config from '../../config/config'

const DrawingList = (props): React.ReactElement => {
  const history = useHistory()
  const httpRequest = useHttp('axios')
  const [drawingList, setDrawingList] = React.useState([])

  const goToCreateDrawing = () => {
    history.push(RoutesConfig.createDrawing.route)
  }

  React.useEffect(() => {
    httpRequest({
      method: 'get',
      url: `${Config.settings.endpoint}/images/list`,
      params: {},
    }).then(response => {
      const {
        data: {results: imageList},
      } = response

      setDrawingList(imageList)
    })
  }, [])

  return (
    <>
      <NavBar />
      <div className="section-dashboard mx-auto section-drawings-list ">
        <div className="drawing-list-content">
          {drawingList.length ? (
            drawingList.map(item => {
              return (
                <Thumbnail
                  key={`${item.drawing_id}_${item.drawing_name}`}
                  id={item.drawing_id + ''}
                  drawingName={item.drawing_name}
                  userName={item.user_name}
                  creationTime={item.creation_time_length_seconds}
                  creationDate={item.created_at}
                  base64Data={item.drawing_base64_data}
                />
              )
            })
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="alert alert-info m-0 p-4" role="alert">
                  There are no drawings! Please create a drawing
                  <span
                    className="create-drawing-link-info"
                    onClick={goToCreateDrawing}
                  >
                    here
                  </span>
                  .
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DrawingList
