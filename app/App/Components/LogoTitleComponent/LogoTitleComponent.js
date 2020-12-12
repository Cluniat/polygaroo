import React from 'react'
import { Image, View } from 'react-native'
import { ApplicationStyles, Helpers, Images } from 'App/Theme'
import AppText from 'App/Components/AppText/AppText'

const LogoTitleComponent = (props) => (
  <View style={[Helpers.colCenter, props.style]}>
    <View style={ApplicationStyles.logoContainer}>
      <Image style={ApplicationStyles.logo} source={Images.logo} resizeMode={'contain'} />
    </View>
    <AppText style={ApplicationStyles.titleAccent}>{props.title}</AppText>
  </View>
)

export default LogoTitleComponent
