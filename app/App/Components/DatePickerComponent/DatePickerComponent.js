import React from 'react'
import DatePicker from 'react-native-datepicker'
import { ApplicationStyles, Helpers, Metrics } from 'App/Theme'

const DatePickerComponent = (props) => (
  <DatePicker
    {...props}
    style={[Helpers.fullWidth, Metrics.smallVerticalMargin]}
    mode="date"
    format="DD-MM-YYYY"
    customStyles={ApplicationStyles.datePicker}
    showIcon={false}
  />
)

export default DatePickerComponent
