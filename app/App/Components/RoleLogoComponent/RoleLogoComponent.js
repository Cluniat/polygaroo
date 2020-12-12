import React from 'react'
import { View, Image } from 'react-native'
import Style from './RoleLogoComponentStyle'
import { Images, Helpers } from 'App/Theme'

const getRoleImage = (role) => {
  switch (role) {
    case 'étudiant':
      return Images.etudiant
    case 'recalé':
      return Images.recale
    case 'PEIP1':
      return Images.peip1
    default:
      return null
  }
}

const RoleLogoComponent = (props) => {
  return (
    <View style={Style.logoContainer}>
      {getRoleImage(props.role) && (
        <Image style={Helpers.fullSize} source={getRoleImage(props.role)} resizeMode={'contain'} />
      )}
    </View>
  )
}

export default RoleLogoComponent
