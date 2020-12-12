import { StyleSheet } from 'react-native'
import { ApplicationStyles, Helpers } from 'App/Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    ...ApplicationStyles.screen.primaryContainer,
    ...Helpers.fillCol,
    ...Helpers.mainSpaceBetween,
  },
})
