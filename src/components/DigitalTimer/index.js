// Write your code here
// Write your code here
import {Component} from 'react'

import './index.css'

const initailState = {
  isTimerRunning: false,
  timerSeconds: 0,
  timerInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initailState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerMinutes = () => {
    const {timerInMinutes} = this.state

    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerMinutes = () =>
    this.setState(prevState => ({
      timerInMinutes: prevState.timerInMinutes + 1,
    }))

  renderTimerLimitControler = () => {
    const {timerInMinutes, timerSeconds} = this.state
    const isbuttonDisable = timerSeconds > 0

    return (
      <div className="time-controler-con">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controler">
          <button
            className="btn-limit-cotroler"
            disabled={isbuttonDisable}
            onClick={this.onDecreaseTimerMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-value-con">
            <p className="limit-value">{timerInMinutes}</p>
          </div>
          <button
            className="btn-limit-cotroler"
            disabled={isbuttonDisable}
            onClick={this.onIncreaseTimerMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initailState)
  }

  incrementTimerSeconds = () => {
    const {timerInMinutes, timerSeconds} = this.state
    const isTimerComplete = timerSeconds === timerInMinutes * 60

    if (isTimerComplete) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerSeconds: prevState.timerSeconds + 1,
      }))
    }
  }

  onStartPauseTimer = () => {
    const {isTimerRunning, timerSeconds, timerInMinutes} = this.state
    const isTimerComplete = timerSeconds === timerInMinutes * 60

    if (isTimerComplete) {
      this.setState({timerSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerControler = () => {
    const {isTimerRunning} = this.state
    const startPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controler-con">
        <button
          className="timer-cont-btn"
          onClick={this.onStartPauseTimer}
          type="button"
        >
          <img
            alt={startPauseAltText}
            className="timer-cont-icon"
            src={startPauseImgUrl}
          />
          <p className="timer-cont-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-cont-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-cont-btn"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-cont-label">Reset</p>
        </button>
      </div>
    )
  }

  getSecondsInFormat = () => {
    const {timerInMinutes, timerSeconds} = this.state
    const totalRemainingSec = timerInMinutes * 60 - timerSeconds
    const minutes = Math.floor(totalRemainingSec / 60)
    const seconds = Math.floor(totalRemainingSec % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const strigifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes} :${strigifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-con">
        <h1 className="heading">Digital Timer</h1>

        <div className="digital-timer-con">
          <div className="timer-dis-con">
            <div className="elapsed-time-con">
              <h1 className="elapsed-timer">{this.getSecondsInFormat()}</h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="control-con">
            {this.renderTimerControler()}
            {this.renderTimerLimitControler()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
