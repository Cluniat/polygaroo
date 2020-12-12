import { StyleSheet } from 'react-native'
import { ApplicationStyles, Helpers, Metrics } from 'App/Theme'

export default StyleSheet.create({
  cascadeButtons: {
    ...Helpers.row,
    ...Helpers.mainSpaceBetween,
  },
  container: {
    ...ApplicationStyles.screen.container,
    ...ApplicationStyles.screen.primaryContainer,
    ...Helpers.fillCol,
    ...Helpers.mainSpaceBetween,
  },
  debateTime: {
    ...ApplicationStyles.title2,
    ...Metrics.smallMargin,
  },
  validateButton: {
    ...Helpers.mainCenter,
    ...Helpers.crossCenter,
  },
})
