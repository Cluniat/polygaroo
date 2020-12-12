import { Dimensions, StyleSheet } from 'react-native'
import { Colors, Helpers, Metrics } from 'App/Theme'

const windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
  header: {
    ...Helpers.colCenter,
    alignSelf: 'center',
    height: windowWidth / 1.7,
    overflow: 'hidden',
    width: windowWidth,
  },
  headerContainer: {
    backgroundColor: Colors.primary,
    borderRadius: windowWidth,
    bottom: 0,
    height: windowWidth * 2,
    overflow: 'hidden',
    position: 'absolute',
    width: windowWidth * 2,
  },
  headerContent: {
    bottom: 0,
    height: windowWidth / 1.7,
    marginLeft: windowWidth / 2,
    margin: 10,
    position: 'absolute',
    width: windowWidth,
  },
  imageHeader: {
    ...Helpers.mainSpaceBetween,
    ...Helpers.rowCross,
    ...Helpers.fullWidth,
    ...Metrics.mediumHorizontalPadding,
    position: 'absolute',
    top: 10,
    zIndex: 5,
  },
})
