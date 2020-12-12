import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles, Helpers, Metrics } from 'App/Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    padding: 10,
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '90%',
  },
  emptyMessage: {
    ...ApplicationStyles.titleAccent,
    ...ApplicationStyles.screen.container,
    ...Helpers.textCenter,
    ...Metrics.smallPadding,
  },
})
