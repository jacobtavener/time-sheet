import React from "react"

import TimeCode from "../components/TimeCode"
import Footer from "../components/Footer"
import NewTimesheetCodeForm from "../components/NewTimesheetCodeForm"

import { msToHMS } from "../helpers/HelperFunctions"

import "../styling/Timesheet.css"
import  'bootstrap/dist/css/bootstrap.css'

const { v4: uuidv4 } = require('uuid');

class Timesheet extends React.Component {
constructor() {
  super()
  this.state = {
    timesheetCodes: [],
    totalTime: 0,
    exportData: []
  }
  this.newTimesheetCodeSubmit = this.newTimesheetCodeSubmit.bind(this)
  this.setTotalTime = this.setTotalTime.bind(this)
  this.findCode = this.findCode.bind(this)
  this.findCodeByCode = this.findCodeByCode.bind(this)
  this.setTime = this.setTime.bind(this)
  this.deleteTimeCode = this.deleteTimeCode.bind(this)
  this.isActiveToggle = this.isActiveToggle.bind(this)
  this.editTimesheetCode = this.editTimesheetCode.bind(this)
  this.transferTime = this.transferTime.bind(this)
}

  // Finding Position Within timesheetCodes
  findCode(id) {
    return this.state.timesheetCodes.findIndex(x => x.id === id)
  }
  findCodeByCode(code) {
    return this.state.timesheetCodes.findIndex(x => x.code === code)
  }
  
  // setState Methods
  isActiveToggle(id, isOn) {
    let position = this.findCode(id) 
    this.setState((prevState) => {
      let updatedTimesheetCodes= [...(prevState.timesheetCodes)]
      updatedTimesheetCodes.forEach(timecode => timecode.isActive=false)
      updatedTimesheetCodes[position].isActive = isOn
      return({timesheetCodes: updatedTimesheetCodes})
    }, () => console.log(this.state.timesheetCodes))
  }
  setTime(id, timeRecorded) {
    let position = this.findCode(id)
    this.setState(prevState => {
      let updatedTimesheetCodes = [...(prevState.timesheetCodes)]
      updatedTimesheetCodes[position].time = timeRecorded
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
  editTimesheetCode(id, newCode, newTime) {
    let position = this.findCode(id),
        isReplica = false,
        otherCodes = [...this.state.timesheetCodes]
        otherCodes.splice(position, 1)
    otherCodes.forEach((timecode)=>{
    if(timecode.code.toLowerCase()===newCode.toLowerCase()){
      alert('This timesheet code already exists!')
      return isReplica = true
      }
    })
    if (isReplica===false){
      this.setState(prevState => {
        let updatedTimesheetCodes = [...(prevState.timesheetCodes)]
        updatedTimesheetCodes[position].code = newCode
        updatedTimesheetCodes[position].time = newTime
        return({timesheetCodes: updatedTimesheetCodes})
      })
    }
  }
  deleteTimeCode(id) {
    let position = this.findCode(id)
    this.setState(prevState => {
      let updatedTimesheetCodes = [...(prevState.timesheetCodes)]
      updatedTimesheetCodes.splice(position, 1)
      return({timesheetCodes: updatedTimesheetCodes})
    })
  }

  // Add to local Storage
  setStorage() {
    localStorage.setItem('day', new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate()))
    localStorage.setItem('timeCodes', JSON.stringify(this.state.timesheetCodes))
  }

  // Form Submit Handlers
  transferTime(firstCode, secondCode, timeInput) {
    let firstCodePosition = this.findCodeByCode(firstCode),
        secondCodePosition = this.findCodeByCode(secondCode)
    console.log(timeInput)
    if(this.state.timesheetCodes[firstCodePosition].time >= timeInput){
      this.setState(prevState => {
        let updatedTimesheetCodes = [...(prevState.timesheetCodes)],
            updatedFirstCode = {...updatedTimesheetCodes[firstCodePosition]},
            updatedSecondCode = {...updatedTimesheetCodes[secondCodePosition]}
        updatedFirstCode.time =  prevState.timesheetCodes[firstCodePosition].time - timeInput
        updatedSecondCode.time = prevState.timesheetCodes[secondCodePosition].time + timeInput
        updatedTimesheetCodes[firstCodePosition] = updatedFirstCode
        updatedTimesheetCodes[secondCodePosition] = updatedSecondCode
        return({timesheetCodes:updatedTimesheetCodes})
      }, console.log(this.state.timesheetCodes))
    } else {
      alert('This code does not have sufficient time to transfer over')
    }
  }
  newTimesheetCodeSubmit(timesheetCode) {
    let isBlank= false,
        isReplica = false
    if(timesheetCode===''){
      alert('Please provide a timesheet code!')
      isBlank=true
    }
    this.state.timesheetCodes.forEach(timecode => {
      if(timecode.code.toLowerCase().trim() === timesheetCode.toLowerCase().trim()){
        alert('This code already exists!')
        return isReplica = true
      }
    })
    if (isReplica === false && isBlank === false){
      this.setState(prevState => {
        const unique = uuidv4()
        return {
          timesheetCodes: [
          ...prevState.timesheetCodes,
          {
            code: timesheetCode.trim(),
            time: 0,
            isActive: false,
            inEdit: false,
            id: unique,
            key: unique
          }
          ]
        }
      }, this.setState({timesheetCode:''}))
    }
  }

  // Lifecycle Methods
  componentDidUpdate(prevProps, prevState) {
    if (prevState.timesheetCodes !== this.state.timesheetCodes) {
      this.setTotalTime()
      this.setStorage()
    }
  }
  componentDidMount() {
    let dailyCodes = JSON.parse(localStorage.getItem('timeCodes')),
        today = new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate()),
        savedDay = localStorage.getItem('day')
    if(dailyCodes && String(today) === String(savedDay)){
      this.setState({timesheetCodes: dailyCodes})
    }
  }
  render(){
    return(
      <div>
        <div className='container-fluid'>
          <NewTimesheetCodeForm 
            newTimesheetCodeSubmit={this.newTimesheetCodeSubmit}
          />
          <br/>
          <div className='container-fluid'>
            {this.state.timesheetCodes.map(
              (timesheetCode) => 
                <TimeCode 
                  key={timesheetCode.key} 
                  {...timesheetCode} 
                  setTime={this.setTime} 
                  deleteTimeCode={this.deleteTimeCode}
                  isActiveToggle={this.isActiveToggle}
                  editTimesheetCode={this.editTimesheetCode}
                /> 
            )}
          </div>
          <br/>
        </div>
        <Footer 
          totalTime={msToHMS(this.state.totalTime)}
          timesheetCodes={this.state.timesheetCodes}
          transferTime={this.transferTime}
        />
      </div>
      
    )
  }
}

export default Timesheet