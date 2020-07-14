import React from "react"
import TimeCode from "./TimeCode"

const { v4: uuidv4 } = require('uuid');

class Timesheet extends React.Component {
constructor() {
  super()
  this.state = {
    timesheetCode:'',
    timesheetCodes: [],
    totalTime: 0
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.setTotalTime = this.setTotalTime.bind(this)
  this.findCode = this.findCode.bind(this)
  this.setTime = this.setTime.bind(this)
}

  handleChange(event) {
    this.setState({timesheetCode: event.target.value})
  }

  findCode(id) {
    return this.state.timesheetCodes.findIndex(x => x.id === id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timesheetCodes !== this.state.timesheetCodes) {
      this.setTotalTime()
    }
  }

  setTime(id, timeRecorded) {
    let position = this.findCode(id)
    console.log(this.findCode(id))
    this.setState(prevState => {
      let updatedTimesheetCodes = [...(prevState.timesheetCodes)]
      updatedTimesheetCodes[position].time = timeRecorded
      console.log(updatedTimesheetCodes)
      return({timesheetCodes: updatedTimesheetCodes})
    })
  }

  setTotalTime() {
    this.setState(prevState => {
      let total = 0
      prevState.timesheetCodes.forEach(timesheetCode => {
        total += timesheetCode.time
      })
      return {
        totalTime: total
      }
    })
  }

  handleSubmit(event) {
    this.setState(prevState => {
        const unique = uuidv4()
        return {
          timesheetCodes: [
          ...prevState.timesheetCodes,
          {
            code: this.state.timesheetCode,
            time: 0,
            id: unique,
            key: unique
          }
          ]
        }
      })
    event.preventDefault()
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Timesheet Code    
            <input
              name="timesheetCode"
              type="text"
              id="timesheetCode"
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.timesheetCodes.map(timesheetCode => <TimeCode key={timesheetCode.key} {...timesheetCode} setTime={this.setTime}/> )}
        <p> total: {this.state.totalTime}</p>
      </div>
    )
  }
}

export default Timesheet