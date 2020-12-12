import React from 'react'
import { View } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import AppText from 'App/Components/AppText/AppText'

const ModalChat = (props) => (
  <View style={ApplicationStyles.modalContent}>
    <AppText style={ApplicationStyles.modalContent.title}>{props.title}</AppText>
    <AppText style={ApplicationStyles.modalContent.body}>{props.description}</AppText>
  </View>
)

export default ModalChat
