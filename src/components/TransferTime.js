import React from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

const { v4: uuidv4 } = require('uuid');

class TransferTime extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        show: false,
        firstCode: '',
        secondCode: '',
        hourInput: '',
        minInput: '',
        secondInput: ''
      }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleClose() {
    this.setState({show:false})
  }
  handleShow() {
    this.setState({show:true})
  }
  handleSave() {
    this.setState({show:false})
    let hour = this.state.hourInput? this.state.hourInput : 0
    let second = this.state.secondInput? this.state.secondInput : 0
    let min = this.state.minInput? this.state.minInput : 0
    let timeInput = ((parseInt(hour)*60*60*1000)+parseInt(min*60*1000)+parseInt(second*1000))
    this.props.transferTime(this.state.firstCode, this.state.secondCode, timeInput)
  }

  handleChange(event) {
    let {value, name} = event.target
    this.setState({[name]:value})
    event.preventDefault()
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  getOptions() {
    return(
      this.props.timesheetCodes.map(
        (timecode) => 
        <option key={uuidv4()}>{timecode.code}</option>
      )
    )
    
  }

  render(){
    return (
      <>
        <Button bg='#282c34' variant='dark' onClick={this.handleShow}>
          Transfer Time
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Transfer Time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleEditSubmit}>
              <Form.Group>
                <Form.Label>Transfer From</Form.Label>
                <Form.Control 
                  as="select" 
                  name="firstCode" 
                  id="firstCode"
                  value={this.state.firstCode}
                  onChange={this.handleChange}
                >
                  <option>---choose a code ---</option>
                  {this.getOptions()}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Transfer To</Form.Label>
                <Form.Control 
                  as="select" 
                  name="secondCode" 
                  id="secondCode" 
                  value={this.state.secondCode}
                  onChange={this.handleChange}
                >
                    <option>---choose a code ---</option>
                    {this.getOptions()}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Hours</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0"
                  max="23"
                  name="hourInput"
                  id="hourInput"
                  value={this.state.hourInput}
                  onChange={this.handleChange}
                  placeholder="0"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Minutes</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0"
                  max="59" 
                  name="minInput"
                  id="minInput"
                  value={this.state.minInput}
                  onChange={this.handleChange}
                  placeholder="0"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Seconds</Form.Label>
                <Form.Control 
                  type="number" 
                  min="0"
                  max="59" 
                  name="secondInput"
                  id="secondInput"
                  value={this.state.secondInput}
                  onChange={this.handleChange}
                  placeholder="0"/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
}

export default TransferTime