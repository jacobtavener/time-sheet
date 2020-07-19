import React from "react"
import TransferTime from "./TransferTime"
const { v4: uuidv4 } = require('uuid');

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <footer className='App-footer fixed-bottom'>
        <div className='row'>
          <p className='col-md-8 offset-md-2'> 
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