import { StyleSheet } from 'react-native'
import { Colors, Helpers, ApplicationStyles, Metrics } from 'App/Theme'

export default StyleSheet.create({
  bubbleTextLeft: {
    color: Colors.text,
  },
  bubbleTextLeftError: {
    color: Colors.error,
    fontSize: 22,
  },
  bubbleTextLeftNarrator: {
    color: Colors.secondary,
  },
  bubbleWrapperLeft: {
    backgroundColor: Colors.darkgrey,
  },
  bubbleWrapperLeftNarrator: {
    backgroundColor: Colors.accent,
  },
  bubbleWrapperRight: {
    backgroundColor: Colors.primary,
  },
  chatArea: {
    flex: 0.6,
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
  inputToolbarContainerStyle: {
    backgroundColor: Colors.darkgrey,
    borderRadius: 20,
    borderTopWidth: 0,
  },
  sendContainer: {
    ...Helpers.mainCenter,
    height: 34,
    marginBottom: 5,
    marginRight: 10,
    width: 34,
  },
  sendImage: {
    height: 25,
    width: 25,
  },
})
