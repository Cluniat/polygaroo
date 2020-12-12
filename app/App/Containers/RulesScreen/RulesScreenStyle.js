import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from 'App/Theme'

export default StyleSheet.create({
  accentText: {
    color: Colors.secondary,
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    ...ApplicationStyles.screen.container,
    ...ApplicationStyles.screen.blackContainer,
    ...Metrics.smallPadding,
  },
  logo: {
    height: 200,
    resizeMode: 'center',
    width: 200,
  },
  mainText: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    textAlign: 'justify',
  },
  roleLogo: {
    height: 100,
    resizeMode: 'center',
    width: 100,
  },
  roleText: {
    color: Colors.secondary,
    fontSize: 20,
    ...Metrics.mediumHorizontalPadding,
    ...Metrics.mediumVerticalPadding,
    textAlign: 'justify',
  },
})
