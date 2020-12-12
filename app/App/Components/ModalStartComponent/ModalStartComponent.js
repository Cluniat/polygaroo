import React from 'react'
import { View } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import RoleLogoComponent from 'App/Components/RoleLogoComponent/RoleLogoComponent'
import AppText from 'App/Components/AppText/AppText'

const ModalStartComponent = (props) => (
  <View style={ApplicationStyles.modalContent}>
    <RoleLogoComponent role={props.role} />
    <AppText style={ApplicationStyles.modalContent.title}>
      Cette année vous serez {props.role}
    </AppText>
    <AppText style={ApplicationStyles.modalContent.body}>
      {`Dans le menu se trouve les règles associées à ce rôle pour vous aider à aborder l'année dans
      les meilleures conditions.`}
    </AppText>
  </View>
)

export default ModalStartComponent
