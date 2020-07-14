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

  msToHMS( ms ) {
    let seconds = Math.floor(ms / 1000),
        hours = parseInt( seconds / 3600 )
    seconds = seconds % 3600
    let minutes = parseInt( seconds / 60 )
    seconds = seconds % 60
    return `${hours >= 10 ? hours : '0'+hours}:${minutes >= 10 ? minutes : '0'+minutes}:${seconds >= 10 ? seconds : '0'+seconds}`
  }

  render() {
    let start = (this.state.time === 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
    let resume = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
    return(
      <div>
        <h3>{this.props.code}: {this.msToHMS(this.state.time)}</h3>
        {start}
        {resume}
        {stop}
        {reset}
      </div>
    )
  }
}
export default TimeCode