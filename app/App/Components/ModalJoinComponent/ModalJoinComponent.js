import React from 'react'
import { View } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import ColyseusActions from 'App/Stores/Colyseus/Actions'
import { connect } from 'react-redux'
import NavigationService from 'App/Services/NavigationService'
import AppText from 'App/Components/AppText/AppText'
import { DropDownHolder } from 'App/Services/DropDownHolder'

class ModalJoinComponent extends React.Component {
  joinRoom() {
    this.props.client
      .getAvailableRooms('polygaroom')
      .then((rooms) => {
        if (rooms.filter(({ roomId }) => roomId === this.props.room.roomId).length > 0) {
          this.props.client
            .joinById(this.props.room.roomId, { user: this.props.me })
            .then((room) => {
              this.props.setCurrentRoom(room)
              this.props.setCurrentGameName(this.props.room.metadata.gameName)
              this.props.beforeNavigate()
              NavigationService.navigate('ChatScreen')
            })
            .catch((err) => {
              DropDownHolder.dropDown.alertWithType('error', 'Error', err)
            })
        } else {
          this.props.beforeNavigate()
          DropDownHolder.dropDown.alertWithType(
            'error',
            'Error',
            "Cette partie n'a plus de place disponible! Merci de rafraichir la liste et d'en choisir une nouvelle."
          )
        }
      })
      .catch((err) => {
        DropDownHolder.dropDown.alertWithType('error', 'Error', err)
      })
  }

  render() {
    return (
      <View style={ApplicationStyles.modalContent}>
        <AppText style={ApplicationStyles.modalContent.title}>Nom de la partie</AppText>
        <AppText style={ApplicationStyles.modalContent.body}>
          {`Vous êtes sur le point de rejoindre la partie ${this.props.room.metadata.gameName}`}
          {` avec ${this.props.room.maxClients} joueurs créée par ${this.props.room.metadata.creator}`}
        </AppText>
        <ButtonComponent
          onPress={() => this.joinRoom()}
          title="Rejoindre"
          style={ApplicationStyles.touchable.secondary}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  client: state.colyseus.colyseusClient,
  me: state.auth.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (room) => {
    dispatch(ColyseusActions.setCurrentRoom(room))
  },
  setCurrentGameName: (gameName) => {
    dispatch(ColyseusActions.setCurrentGameName(gameName))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalJoinComponent)
