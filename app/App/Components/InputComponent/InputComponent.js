import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { ApplicationStyles, Colors } from 'App/Theme'

const InputComponent = (props) => (
  <View>
    <View style={ApplicationStyles[`inputContainer${props.errors ? 'Error' : ''}`]}>
      <TextInput
        {...props}
        style={[props.style, ApplicationStyles.input]}
        placeholderTextColor={props.errors ? Colors.error : Colors.primary}
        ref={(input) => props.reference && props.reference(input)}
      />
    </View>
    {props.errors && <Text style={ApplicationStyles.inputErrorMsg}>{props.errors.join(', ')}</Text>}
  </View>
)

export default InputComponent
