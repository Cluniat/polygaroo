import React from 'react'
import { Text } from 'react-native'
import styles from './AppTextStyle'

const AppText = (props) => (
  <Text {...props} style={[props.style, styles.font]}>
    {props.children}
  </Text>
)

export default AppText
