import React from 'react'
import { View } from 'react-native'
import AppText from 'App/Components/AppText/AppText'
import { ApplicationStyles, Helpers } from 'App/Theme'

class CountdownComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      minutes: 0,
      seconds: 0,
      interval: null,
    }
  }

  componentDidMount() {
    const interval = setInterval(() => this.setTime(), 1000)
    this.setState({
      time: this.props.time,
      minutes: Math.trunc(this.props.time / 60),
      seconds: this.props.time % 60,
      interval: interval,
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.time !== nextProps.time) {
      return {
        minutes: Math.trunc(nextProps.time / 60),
        seconds: nextProps.time % 60,
        time: nextProps.time,
      }
    }
    return null
  }

  setTime() {
    if (this.state.seconds === 0) {
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: 59,
      })
    } else if (this.state.seconds === 0 && this.state.minutes === 0) {
      this.setState({
        minutes: 0,
        seconds: 0,
      })
    } else {
      this.setState({
        seconds: this.state.seconds - 1,
      })
    }
  }

  render() {
    return (
      <View style={Helpers.row}>
        {this.state.minutes < 10 ? (
          <AppText style={ApplicationStyles.title1}>0{this.state.minutes}</AppText>
        ) : (
          <AppText style={ApplicationStyles.title1}>{this.state.minutes}</AppText>
        )}
        <AppText style={ApplicationStyles.title1}> : </AppText>
        {this.state.seconds < 10 ? (
          <AppText style={ApplicationStyles.title1}>0{this.state.seconds}</AppText>
        ) : (
          <AppText style={ApplicationStyles.title1}>{this.state.seconds}</AppText>
        )}
      </View>
    )
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
}

export default CountdownComponent
