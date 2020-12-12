import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Colors } from 'App/Theme'
import AppText from 'App/Components/AppText/AppText'

const ButtonComponent = (props) => (
  <TouchableOpacity {...props} style={[ApplicationStyles.touchable, props.style]}>
    {props.isLoading ? (
      <ActivityIndicator color={Colors.primary} />
    ) : (
      <AppText style={ApplicationStyles.touchableText}>{props.title}</AppText>
    )}
  </TouchableOpacity>
)

export default ButtonComponent
