import React from "react"
import TransferTime from "./TransferTime"
import Download from "./Download"
import {msToMins} from './HelperFunctions'

const { v4: uuidv4 } = require('uuid');

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  prepareData() {
    let dataset = this.props.timesheetCodes.map(
      (timecode) =>
        (
          {
            code: timecode.code,
            time_ms: timecode.time,
            time_mins: Number(msToMins(timecode.time).split(' ')[0]),
            time_fifteen: Number((Number(msToMins(timecode.time).split(' ')[0])/15).toFixed(2))
          }
        ) 
    )
    return dataset
  }

  render() {
    return(
      <footer className='App-footer fixed-bottom'>
        <div className='row'>
          <div className='col-md-2'>
            <Download 
              timesheetCodes={this.prepareData()}
            />
          </div>
          <p className='col-md-8'> 
            Total Recorded Time Today: {this.props.totalTime}
          </p>
          <TransferTime 
            key={uuidv4()}
            timesheetCodes={this.props.timesheetCodes}
            transferTime={this.props.transferTime}
          />
        </div>
      </footer>
    )
    
  }
}

export default Footer