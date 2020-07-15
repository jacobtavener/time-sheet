import React from "react"

class TimeCode extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.deleteTimer = this.deleteTimer.bind(this)
  }
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
    this.props.setTime(this.props.id, this.state.time)
  }
  resetTimer() {
    this.setState({time: 0, isOn: false}, () => {
    this.props.setTime(this.props.id, this.state.time)
    })
  }
  deleteTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
    this.props.deleteTimeCode(this.props.id)
  }

  componentDidMount() {
    this.setState({time: this.props.time})
  }

  render() {
    let startBtn = (this.state.time === 0) ?
      <button onClick={this.startTimer} className='btn btn-light'>
        <i className="fas fa-play fa-sm"></i>
      </button> :
      null

    let stopBtn = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer} className='btn btn-light'>
        <i className="fas fa-pause fa-sm"></i>
      </button>

    let resumeBtn = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer} className='btn btn-light'>
        <i className="fas fa-play fa-sm"></i>
      </button>

    let resetBtn = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer} className='btn btn-light'>
        <i className="fas fa-sync fa-sm"></i>
      </button>

    let deleteBtn = <button onClick={this.deleteTimer} className='btn btn-light'>
                      <i className="fas fa-trash-alt fa-sm"></i>
                    </button>
    return(
      <div className='row justify-content-md-center'>
        <div className='col col-lg-2'>
          <p>
            {this.props.code}:
          </p>
        </div>
        <div className='col col-md-auto'>
          <p>
            {this.props.msToHMS(this.state.time)}
          </p>
        </div>
        <div className='col col-lg-2'>
          {startBtn}
          {resumeBtn}
          {stopBtn}
          {resetBtn}
          {deleteBtn}
        </div>
      </div>
    )
  }
}
export default TimeCode