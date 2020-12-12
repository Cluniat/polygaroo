import React from 'react'
import { Image, StatusBar, TouchableOpacity, View } from 'react-native'
import { ApplicationStyles, Colors, Helpers, Images } from 'App/Theme'
import RoleLogoComponent from 'App/Components/RoleLogoComponent/RoleLogoComponent'
import { GiftedChat } from 'react-native-gifted-chat'
import Bubble from 'react-native-gifted-chat/lib/Bubble'
import InputToolbar from 'react-native-gifted-chat/lib/InputToolbar'
import Send from 'react-native-gifted-chat/lib/Send'
import Style from './ChatScreenStyle'
import { connect } from 'react-redux'
import { MessageService } from 'App/Services/FormatMessage'
import NavigationService from 'App/Services/NavigationService'
import ModalComponent from 'App/Components/ModalComponent/ModalComponent'
import ModalReadyEvent from 'App/Components/ModalReadyEvent/ModalReadyEvent'
import ModalStartComponent from 'App/Components/ModalStartComponent/ModalStartComponent'
import ModalVoteComponent from 'App/Components/ModalVoteComponent/ModalVoteComponent'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import ModalChat from 'App/Components/ModalChatComponent/ModalChatComponent'
import AppText from 'App/Components/AppText/AppText'
import CountdownComponent from 'App/Components/CountDownComponent/CountdownComponent'
import ModalQuitComponent from 'App/Components/ModalQuitComponent/ModalQuitComponent'

class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      idMessage: 0,
      role: '',
      modalVisible: false,
      isReadyEvent: false,
      isStartEvent: false,
      candidates: [],
      hasVoted: false,
      isModalDescription: false,
      modalTitle: '',
      modalDescription: '',
      isEliminate: false,
      timer: 0,
      quitClicked: false,
      nbRoles: null,
      closeModalFunction: () => {
        this.setState({ modalVisible: false })
      },
    }
  }

  componentDidMount() {
    this.props.room.onMessage((message) => {
      console.log(message)
      if (!message.isEvent) {
        if (message.user._id === -1) this.setState({ modalVisible: false })
        this.setState({ idMessage: this.state.idMessage + 1 })
        this.setState({
          messages: [
            ...this.state.messages,
            MessageService.formatMessage(this.state.idMessage, message, message.user),
          ],
        })
      } else {
        switch (message.title) {
          case 'ready':
            this.setState({
              isReadyEvent: true,
              modalVisible: true,
              closeModalFunction: () => {
                this.setState({ modalVisible: true })
              },
            })
            break
          case 'start':
            this.setState({
              candidates: [],
              hasVoted: false,
              isModalDescription: false,
              modalVisible: true,
              isStartEvent: true,
              role: message.data.role,
              isReadyEvent: false,
              timer: 0,
              nbRoles: message.data.nbRoles,
              closeModalFunction: () => {
                this.setState({ modalVisible: false })
              },
            })
            break
          case 'vote':
            if (this.state.role === 'étudiant' && message.data.forRecale) {
              this.setState({
                isReadyEvent: false,
                candidates: [],
                hasVoted: false,
                isStartEvent: false,
                modalVisible: true,
                isModalDescription: true,
                modalTitle: "Semaine d'examen",
                timer: message.data.timer,
                modalDescription:
                  'Les recalés se concertent pour choisir un étudiant à faire échouer ...',
                closeModalFunction: () => {
                  this.setState({ modalVisible: true })
                },
              })
            } else if (this.state.role === 'PEIP1' && message.data.forRecale) {
              this.setState({
                isReadyEvent: false,
                candidates: [],
                hasVoted: false,
                isStartEvent: false,
                modalVisible: true,
                isModalDescription: true,
                modalTitle: "Semaine d'examen",
                timer: message.data.timer,
                modalDescription:
                  'Les recalés se concertent pour choisir un étudiant à faire échouer, ne te gêne pas pour les espionner ! ',
                closeModalFunction: () => {
                  this.setState({ modalVisible: false })
                },
              })
            } else {
              this.setState({
                isReadyEvent: false,
                hasVoted: false,
                isModalDescription: false,
                isStartEvent: false,
                candidates: message.data.candidates,
                modalVisible: true,
                timer: message.data.timer,
              })
            }

            break
          case 'elimination':
            this.setState({
              isReadyEvent: false,
              isStartEvent: false,
              hasVoted: false,
              modalVisible: true,
              isModalDescription: true,
              modalTitle: 'Résultats du semestre',
              modalDescription: `${message.data.eliminate.name} a échoué et doit quitter Polytech...`,
              candidates: [],
              timer: 0,
              nbRoles: message.data.nbRoles,
              closeModalFunction: () => {
                this.setState({ modalVisible: false })
              },
            })
            if (this.props.me._id === message.data.eliminate._id) {
              this.setState({ isEliminate: true })
            }
            break
          case 'phase':
            this.setState({
              isReadyEvent: false,
              isStartEvent: false,
              hasVoted: false,
              modalVisible: true,
              isModalDescription: true,
              modalTitle: message.data.isExam ? "SEMAINE D'EXAMEN" : 'SEMAINE DE COURS',
              modalDescription: 'Au boulot les polypotes',
              candidates: [],
              timer: message.data.isExam ? 0 : message.data.timer,
              closeModalFunction: () => {
                this.setState({ modalVisible: false })
              },
            })
            break
          case 'end':
            this.setState({
              isReadyEvent: false,
              isStartEvent: false,
              hasVoted: false,
              modalVisible: true,
              isModalDescription: true,
              modalTitle: 'FIN DE LA PARTIE',
              modalDescription: `Les ${message.data}s ont gagnés, ils sont enfin ingénieurs et illuminent le monde de leur savoir.`,
              candidates: [],
              timer: 0,
              closeModalFunction: () => {
                this.setState({ modalVisible: false })
                NavigationService.navigateAndReset('Home')
              },
            })
            break
          default:
            return null
        }
      }
    })
  }

  quitGame() {
    this.setState({
      isReadyEvent: false,
      isStartEvent: false,
      hasVoted: false,
      modalVisible: true,
      isModalDescription: false,
      modalTitle: '',
      modalDescription: ``,
      candidates: [],
      timer: 0,
      quitClicked: true,
      closeModalFunction: () => {
        this.setState({ modalVisible: false })
      },
    })
  }

  onSend(messages = []) {
    this.props.room.send(
      MessageService.formatMessage(this.state.idMessage, messages[0], this.props.me)
    )
  }

  renderBubble(props) {
    let leftStyle = ''
    let leftWrapperStyle = ''
    if (props.currentMessage.user._id === -1) {
      leftStyle = Style.bubbleTextLeftError
      leftWrapperStyle = Style.bubbleWrapperLeftNarrator
    } else if (props.currentMessage.user._id === 0) {
      leftStyle = Style.bubbleTextLeftNarrator
      leftWrapperStyle = Style.bubbleWrapperLeftNarrator
    } else {
      leftStyle = Style.bubbleTextLeft
      leftWrapperStyle = Style.bubbleWrapperLeft
    }
    return (
      <Bubble
        {...props}
        renderUsernameOnMessage={props.currentMessage.user._id !== 0}
        textStyle={{ left: leftStyle }}
        wrapperStyle={{
          left: leftWrapperStyle,
          right: Style.bubbleWrapperRight,
        }}
      />
    )
  }

  renderInputToolbar(props) {
    if (!this.state.isEliminate) {
      return <InputToolbar {...props} containerStyle={Style.inputToolbarContainerStyle} />
    }
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={Style.sendContainer}>
          <Image style={Style.sendImage} source={Images.send} resizeMode={'center'} />
        </View>
      </Send>
    )
  }

  render() {
    return (
      <View style={Style.container}>
        <ModalComponent
          modalVisible={this.state.modalVisible}
          closeModal={this.state.closeModalFunction}
        >
          {this.state.isReadyEvent && <ModalReadyEvent />}
          {this.state.isStartEvent && <ModalStartComponent role={this.state.role} />}
          {this.state.candidates.length > 0 && (
            <ModalVoteComponent
              candidates={this.state.candidates}
              hasVoted={this.state.hasVoted}
              changeVoteStatus={(value) => this.setState({ hasVoted: value })}
            />
          )}
          {this.state.isModalDescription && (
            <ModalChat title={this.state.modalTitle} description={this.state.modalDescription} />
          )}
          {this.state.quitClicked && <ModalQuitComponent />}
        </ModalComponent>
        <StatusBar backgroundColor={Colors.accent} barStyle={'light-content'} />
        <TouchableOpacity onPress={() => this.quitGame()}>
          <Image style={Style.sendImage} source={Images.exit} resizeMode={'center'} />
        </TouchableOpacity>
        <View style={Style.header}>
          <RoleLogoComponent role={this.state.role} />
          <View style={Helpers.colCross}>
            <AppText style={ApplicationStyles.titleAccent}>{this.props.gameName}</AppText>
            {this.state.timer !== 0 && <CountdownComponent time={this.state.timer} />}
            {this.state.candidates.length > 0 && (
              <ButtonComponent
                onPress={() => this.setState({ modalVisible: true })}
                title="VOTER"
                style={ApplicationStyles.touchable.primary}
                disabled={this.state.candidates.length < 1}
              />
            )}
          </View>
        </View>
        {this.state.nbRoles && (
          <View style={Helpers.center}>
            <AppText style={ApplicationStyles.title2}>
              {`RECALE: ${this.state.nbRoles.recales} / ETUDIANTS: ${this.state.nbRoles.etudiants} / PEIP1: ${this.state.nbRoles.peip}`}
            </AppText>
          </View>
        )}
        <View style={Style.chatArea}>
          <GiftedChat
            placeholder="Aa"
            renderAvatar={null}
            renderUsernameOnMessage={true}
            renderBubble={this.renderBubble}
            renderInputToolbar={(props) => this.renderInputToolbar(props)}
            renderSend={this.renderSend}
            textInputStyle={ApplicationStyles.input}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{ _id: this.props.me._id }}
            inverted={false}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.colyseus.currentRoom,
  me: state.auth.currentUser,
  gameName: state.colyseus.currentGameName,
})

export default connect(mapStateToProps, null)(ChatScreen)
