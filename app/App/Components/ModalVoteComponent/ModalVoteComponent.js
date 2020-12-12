import React from 'react'
import { Picker, View } from 'react-native'
import { ApplicationStyles, Colors } from 'App/Theme'
import { connect } from 'react-redux'
import { MessageService } from 'App/Services/FormatMessage'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import styles from './ModalVoteComponentStyle'
import AppText from 'App/Components/AppText/AppText'

class ModalVoteComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      candidate: this.props.candidates[0],
    }
  }

  sendEvent() {
    this.props.changeVoteStatus(true)
    this.props.room.send(
      MessageService.formatEvent('vote', {
        user: this.props.me,
        candidate: this.state.candidate,
        total: this.props.candidates.length,
      })
    )
  }

  render() {
    return (
      <View style={ApplicationStyles.modalContent}>
        <AppText style={ApplicationStyles.modalContent.title}>
          {`Qui veux tu exclure de l'école ?`}
        </AppText>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={this.state.candidate}
            style={styles.picker}
            onValueChange={(itemValue) => this.setState({ candidate: itemValue })}
            mode={'dropdown'}
          >
            {this.props.candidates.map((candidate, index) => (
              <Picker.Item
                color={Colors.primary}
                key={`candidate-${index}`}
                label={candidate.name}
                value={candidate}
              />
            ))}
          </Picker>
        </View>
        {this.props.hasVoted ? (
          <AppText style={ApplicationStyles.modalContent.body}>
            Ton vote a bien été pris en compte.
          </AppText>
        ) : (
          <ButtonComponent
            onPress={() => this.sendEvent()}
            title="Envoyer"
            style={ApplicationStyles.touchable.secondary}
            disabled={this.props.hasVoted}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  client: state.colyseus.colyseusClient,
  room: state.colyseus.currentRoom,
  me: state.auth.currentUser,
})

export default connect(mapStateToProps, null)(ModalVoteComponent)
