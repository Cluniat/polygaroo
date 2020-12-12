import { StyleSheet } from 'react-native'
import { ApplicationStyles, Helpers } from 'App/Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    ...ApplicationStyles.screen.primaryContainer,
    ...Helpers.center,
  },
  logo: {
    alignItems: 'center',
    display: 'flex',
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
})
