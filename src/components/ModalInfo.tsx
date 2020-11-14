import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface Props {
  show: boolean
  onHide: () => void
  size?: 'sm' | 'lg' | 'xl'
  title: string
  component?: string
  body?: string
  bodyInfo?: string
  bodyInfoClass?: string
  hideHandler: () => void
}

const ModalInfo = ({
  show,
  onHide,
  size = null,
  title,
  component = null,
  body,
  bodyInfo,
  bodyInfoClass,
  hideHandler,
}: Props): React.ReactElement => {
  return (
    <Modal show={show} onHide={onHide} size={size}>
      <div className="modal-header">
        <div className="modal-title h5">{title}</div>
      </div>

      <Modal.Body>
        {component ? component : null}

        <div
          className="margin-bottom-15"
          dangerouslySetInnerHTML={{__html: body}}
        ></div>
        <div
          className={bodyInfoClass ? bodyInfoClass : ''}
          dangerouslySetInnerHTML={{__html: bodyInfo ? bodyInfo : ''}}
        ></div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={hideHandler}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalInfo
