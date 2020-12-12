import React from 'react'
import { Image, View } from 'react-native'
import Style from './SplashScreenStyle'
import { Images } from 'App/Theme'
import AppText from 'App/Components/AppText/AppText'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={Style.container}>
        <View style={Style.logo}>
          <Image source={Images.logo} resizeMode={'contain'} />
          <AppText>POLYGAROO</AppText>
        </View>
      </View>
    )
  }
}
