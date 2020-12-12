import React from 'react'
import { View } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import { connect } from 'react-redux'
import { MessageService } from 'App/Services/FormatMessage'
import AppText from 'App/Components/AppText/AppText'

class ModalReadyEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
    }
  }

  sendEvent() {
    this.setState({ isReady: true })
    this.props.room.send(MessageService.formatEvent('ready', this.props.client))
  }

  render() {
    return (
      <View style={ApplicationStyles.modalContent}>
        <AppText style={ApplicationStyles.modalContent.title}>
          Prêt pour une nouvelle année à Polytech ?
        </AppText>
        {this.state.isReady ? (
          <AppText style={ApplicationStyles.modalContent.body}>
            {`Un peu de patience ! L'année commencera quand tous tes camarades auront rejoint la
            classe.`}
          </AppText>
        ) : (
          <ButtonComponent
            onPress={() => this.sendEvent()}
            title="Prêt"
            style={ApplicationStyles.touchable.secondary}
            disabled={this.state.isReady}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  client: state.colyseus.colyseusClient,
  room: state.colyseus.currentRoom,
})

export default connect(mapStateToProps, null)(ModalReadyEvent)
