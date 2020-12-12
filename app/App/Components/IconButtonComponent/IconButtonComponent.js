import { Image, TouchableOpacity, View } from 'react-native'
import Style from 'App/Components/IconButtonComponent/IconButtonComponentStyle'
import React from 'react'

const IconButtonComponent = (props) => (
  <View>
    <TouchableOpacity {...props}>
      <Image style={Style.sendImage} source={props.image} resizeMode={'center'} />
    </TouchableOpacity>
  </View>
)

export default IconButtonComponent
