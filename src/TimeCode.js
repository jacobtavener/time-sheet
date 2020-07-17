import React from "react"

class TimeCode extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      simpleView: false, 
      inEdit: false,
      codeEdit: '',
      hourEdit: '',
      minEdit: '',
      secondEdit: '' 
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.editTimer = this.editTimer.bind(this)
    this.deleteTimer = this.deleteTimer.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.getTime = this.getTime.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    }, () => this.props.isActiveToggle(this.props.id, this.state.isOn))
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
  editTimer() {
    this.setState({inEdit: true})
    this.stopTimer()
    this.props.isActiveToggle(this.props.id, false)
  }
  deleteTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
    this.props.deleteTimeCode(this.props.id)
  }
  componentDidMount() {
    this.setState({time: this.props.time})
  }
  handleToggle() {
    this.setState(prevState => {
      return {simpleView: !prevState.simpleView}
    })
  }
  handleChange(event) {
    let {value, name} = event.target
    this.setState({[name]:value})
    event.preventDefault()
  }
  handleEditSubmit(event) {
    let 
    codeEdit = this.state.codeEdit ? this.state.codeEdit : this.props.code,
    hourEdit = this.state.hourEdit ? this.state.hourEdit : this.getTime('hours'),
    minEdit = this.state.minEdit ? this.state.minEdit : this.getTime('minutes'),
    secondEdit = this.state.secondEdit ? this.state.secondEdit : this.getTime('seconds'),
    timeEdit = ((hourEdit*60*60*1000)+(minEdit*60*1000)+secondEdit*1000)
    this.props.editTimesheetCode(this.props.id, codeEdit, timeEdit)
    this.setState({inEdit:false})
    event.preventDefault()
  }
  getTime(type) {
    let seconds = Math.ceil(this.state.time / 1000),
        hours = parseInt( seconds / 3600 )
    seconds = seconds % 3600
    let minutes = parseInt( seconds / 60 )
    seconds = seconds % 60
    if (type==='seconds'){
      return seconds
    } 
    if (type==='minutes'){
      return minutes
    }
    if (type ==='hours'){
      return hours
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // if (prevState.isOn !== this.state.isOn){
      
    // }
    if (prevProps.isActive !== this.props.isActive && this.props.isActive === false){
      this.stopTimer()
    }
    if (prevProps.time !== this.props.time) {
      this.setState({time: this.props.time})
    }
  }

  render() {
    let startBtn = (this.state.time === 0) ?
      <button onClick={this.startTimer} className='btn btn-light' id="stop-btn">
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

    let editBtn  = <button onClick={this.editTimer} className='btn btn-light'>
                    <i className="far fa-edit fa-sm"></i>
                  </button>

    let deleteBtn = <button onClick={this.deleteTimer} className='btn btn-light'>
                      <i className="fas fa-trash-alt fa-sm"></i>
                    </button>
    let toggleView = <button onClick={this.handleToggle} className='btn btn-light'>
                      <i className="fas fa-exchange-alt"></i>
                    </button>
    let time = this.state.simpleView ? this.props.msToMins(this.state.time) : this.props.msToHMS(this.state.time)
    if (this.state.inEdit===false) {
      return(
        <div className='row justify-content-md-center align-self-center'>
          <div className='col-lg-3 pt-2'>
            <p>
              {this.props.code}:
            </p>
          </div>
          <div className='col-md-auto pt-2'>
            <p className='align-baseline'>
              {time}
            </p>
          </div>
          <div className='col-lg-3'>
            {startBtn}
            {resumeBtn}
            {stopBtn}
            {resetBtn}
            {deleteBtn}
            {toggleView}
            {editBtn}
          </div>
        </div>
      )
    } else {
      return(
        <form className='form-inline justify-content-center' onSubmit={this.handleEditSubmit}>
          <div className="form-group"> 
            <input
              className="form-control"
              name="codeEdit"
              type="text"
              id="codeEdit"
              value={this.state.codeEdit}
              placeholder={this.props.code}
              onChange={this.handleChange}
            />
            <input
              className="form-control"
              name="hourEdit"
              type="text"
              id="hourEdit"
              value={this.state.hourEdit}
              placeholder={`${this.getTime('hours') >= 10 ? this.getTime('hours') : '0'+ this.getTime('hours')}`}
              onChange={this.handleChange}
            />
            <input
              className="form-control"
              name="minEdit"
              type="text"
              id="minEdit"
              value={this.state.minEdit}
              placeholder={`${this.getTime('minutes') >= 10 ? this.getTime('minutes') : '0'+ this.getTime('minutes')}`}
              onChange={this.handleChange}
            />
            <input
              className="form-control"
              name="secondEdit"
              type="text"
              id="secondEdit"
              value={this.state.secondEdit}
              placeholder={`${this.getTime('seconds') >= 10 ? this.getTime('seconds') : '0'+ this.getTime('seconds')}`}
              onChange={this.handleChange}
            />
            <button type="submit" className='btn btn-dark '>
            <i className="fas fa-check"></i>
            </button>
          </div>
      </form>
      )
      
    }
    
  }
}
export default TimeCode