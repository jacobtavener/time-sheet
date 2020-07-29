import React from "react"
import { Modal, Button } from "react-bootstrap"
import { msToHMS } from "../helpers/HelperFunctions"

class BackgroundTimer extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleClose() {
    this.props.handleBackgroundTimerModalClose()
  }
  handleSave() {
    this.props.handleBackgroundTimerModalSave(this.props.backgroundTimerInfo.id, this.props.backgroundTimerInfo.timeChange)
  }

  render() {
    return (
      <>
        <Modal show={this.props.backgroundTimerShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Background Timer changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>
              {`You left ${this.props.backgroundTimerInfo.timecode} running in the background.`}
            </b>
            <p>
            {`Would you like to add ${msToHMS(this.props.backgroundTimerInfo.timeChange)} onto your existing timesheet code?`}
            </p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              No, thanks
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Yes, please
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
}

export default BackgroundTimer