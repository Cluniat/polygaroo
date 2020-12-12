import { View } from 'react-native'
import Style from 'App/Components/HeaderComponent/HeaderComponentStyle'
import LogoTitleComponent from 'App/Components/LogoTitleComponent/LogoTitleComponent'
import IconButtonComponent from 'App/Components/IconButtonComponent/IconButtonComponent'
import NavigationService from 'App/Services/NavigationService'
import React from 'react'
import { Images } from 'App/Theme'

const HeaderComponent = () => (
  <View style={Style.header}>
    <View style={Style.imageHeader}>
      <IconButtonComponent
        onPress={() => NavigationService.navigate('Rules')}
        image={Images.rules}
      />
      <IconButtonComponent
        onPress={() => NavigationService.navigate('Profile')}
        image={Images.user}
      />
    </View>
    <View style={Style.headerContainer}>
      <LogoTitleComponent style={Style.headerContent} title="POLYGAROO" />
    </View>
  </View>
)

export default HeaderComponent
