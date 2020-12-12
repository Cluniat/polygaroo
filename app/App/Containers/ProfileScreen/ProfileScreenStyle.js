import { StyleSheet } from 'react-native'
import { ApplicationStyles, Helpers, Metrics, Colors } from 'App/Theme'

export default StyleSheet.create({
  body: {
    color: Colors.text,
    fontSize: Metrics.normal,
    lineHeight: 30,
    textAlign: 'center',
  },
  container: {
    ...ApplicationStyles.screen.container,
    ...ApplicationStyles.screen.blackContainer,
    ...Metrics.smallPadding,
  },
  header: {
    ...Helpers.fillRowCross,
    ...Helpers.mainSpaceAround,
    flex: 0.35,
  },
  imageHeader: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 5,
  },
  logoContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 200,
    height: 100,
    margin: 15,
    width: 100,
  },
  profileContent: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
})
