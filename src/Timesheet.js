import React from "react"
import TimeCode from "./TimeCode"
import "./Timesheet.css"

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
  this.deleteTimeCode = this.deleteTimeCode.bind(this)
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
      this.setStorage()
    }
  }

  setStorage() {
    localStorage.setItem('day', new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate()))
    localStorage.setItem('timeCodes', JSON.stringify(this.state.timesheetCodes))
  }

  componentDidMount() {
    let dailyCodes = JSON.parse(localStorage.getItem('timeCodes')),
        today = new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate()),
        savedDay = localStorage.getItem('day')
    if(dailyCodes && String(today) === String(savedDay)){
      this.setState({timesheetCodes: dailyCodes})
    }
  }

  setTime(id, timeRecorded) {
    let position = this.findCode(id)
    this.setState(prevState => {
      let updatedTimesheetCodes = [...(prevState.timesheetCodes)]
      updatedTimesheetCodes[position].time = timeRecorded
      return({timesheetCodes: updatedTimesheetCodes})
    })
  }

  deleteTimeCode(id) {
    let position = this.findCode(id)
    this.setState(prevState => {
      let updatedTimesheetCodes = [...(prevState.timesheetCodes)]
      updatedTimesheetCodes.splice(position, 1)
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

  msToHMS(ms) {
    let seconds = Math.floor(ms / 1000),
        hours = parseInt( seconds / 3600 )
    seconds = seconds % 3600
    let minutes = parseInt( seconds / 60 )
    seconds = seconds % 60
    return `${hours >= 10 ? hours : '0'+hours}:${minutes >= 10 ? minutes : '0'+minutes}:${seconds >= 10 ? seconds : '0'+seconds}`
  }

  handleSubmit(event) {
    if(this.state.timesheetCode===''){
      alert('Please provide a timesheet code!')
    }
    else {
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
      }, this.setState({timesheetCode:''}))
    }
    event.preventDefault()
  }

  render(){
    return(
      <div>
        <div className='container-fluid'>
          <form className='form-inline justify-content-center' onSubmit={this.handleSubmit}>
            <div className="form-group"> 
              <input
                className="form-control"
                name="timesheetCode"
                type="text"
                id="timesheetCode"
                value={this.state.timesheetCode}
                placeholder="New Timesheet Item..."
                onChange={this.handleChange}
              />
              <button type="submit" className='btn btn-dark '>
                <i className="fas fa-plus-circle"></i>
              </button>
            </div>
          </form>
          <br/>
          <div className='container-fluid'>
            {this.state.timesheetCodes.map(
              (timesheetCode) => 
                <TimeCode 
                  key={timesheetCode.key} 
                  {...timesheetCode} 
                  setTime={this.setTime} 
                  msToHMS={this.msToHMS}
                  deleteTimeCode={this.deleteTimeCode}
                /> 
            )}
          </div>
          <br/>
        </div>
        <footer className='App-footer fixed-bottom'>
          <p> 
            Total Working Time Today: {this.msToHMS(this.state.totalTime)}
          </p>
          
        </footer>
      </div>
      
    )
  }
}

export default Timesheet