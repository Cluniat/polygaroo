import React from 'react'
import { View } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import { connect } from 'react-redux'
import AppText from 'App/Components/AppText/AppText'
import NavigationService from '../../Services/NavigationService'

class ModalQuitComponent extends React.Component {
  sendEvent() {
    this.setState({ isReady: true })
    this.props.room.leave(this.props.client)
    NavigationService.navigateAndReset('Home')
  }

  render() {
    return (
      <View style={ApplicationStyles.modalContent}>
        <AppText style={ApplicationStyles.modalContent.title}>
          {`Vous êtes sur le point de quitter l'école.`}
        </AppText>
        <AppText style={ApplicationStyles.modalContent.body}>
          Êtes-vous sûr de vouloir abandonner votre cursus extraordinaire à Polytech Lyon ?
        </AppText>
        <ButtonComponent
          onPress={() => this.sendEvent()}
          title="Quitter"
          style={ApplicationStyles.touchable.secondary}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  client: state.colyseus.colyseusClient,
  room: state.colyseus.currentRoom,
})

export default connect(mapStateToProps, null)(ModalQuitComponent)
