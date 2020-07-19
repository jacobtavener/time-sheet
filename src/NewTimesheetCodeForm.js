import React from "react"
import { Button, Form} from 'react-bootstrap';

class NewTimesheetCodeForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      timesheetCode:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({timesheetCode: event.target.value})
  }
  formSubmit(event) {
    this.props.newTimesheetCodeSubmit(this.state.timesheetCode)
    this.setState({timesheetCode: ''})

    event.preventDefault()
  }
  render() {
    return (
      <Form className='form-inline justify-content-center' onSubmit={this.formSubmit}>
        <Form.Group> 
          <Form.Control
            className="form-control"
            name="timesheetCode"
            type="text"
            id="timesheetCode"
            value={this.state.timesheetCode}
            placeholder="New Timesheet Item..."
            onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group controlId="submitButton">
          <Button type="submit" className='btn btn-dark'>
            <i className="fas fa-plus-circle"></i>
          </Button>
        </Form.Group>
      </Form>
    )
  }
}
export default NewTimesheetCodeForm