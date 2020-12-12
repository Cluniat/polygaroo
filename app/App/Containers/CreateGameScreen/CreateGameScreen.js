import React from 'react'
import { KeyboardAvoidingView, View, Platform } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Style from './CreateGameScreenStyle'
import InputComponent from 'App/Components/InputComponent/InputComponent'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import LogoTitleComponent from 'App/Components/LogoTitleComponent/LogoTitleComponent'
import NavigationService from 'App/Services/NavigationService'
import ColyseusActions from 'App/Stores/Colyseus/Actions'
import { connect } from 'react-redux'
import { DropDownHolder } from 'App/Services/DropDownHolder'
import AppText from 'App/Components/AppText/AppText'

class CreateGameScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameName: '',
      debateTime: 3,
      nbPlayers: 0,
      errors: null,
    }
  }

  handleChange(name, text) {
    return this.setState({
      [name]: text,
    })
  }

  errorsBuilder(errors, key, value) {
    return {
      ...errors,
      [key]: [...((errors && errors[key]) || []), value],
    }
  }

  checkRoomOptions() {
    let errors
    if (this.state.gameName === '') {
      errors = this.errorsBuilder(errors, 'gameName', 'gameName cannot be empty')
    }
    if (this.state.gameName > 10) {
      errors = this.errorsBuilder(errors, 'gameName', 'gameName cannot exceed 10 characters')
    }
    if (this.state.nbPlayers < 2) {
      errors = this.errorsBuilder(errors, 'nbPlayers', 'nbPlayer cannot be less than 2')
    }
    if (this.state.nbPlayers > 51) {
      errors = this.errorsBuilder(errors, 'nbPlayers', 'nbPlayer cannot be more than 51')
    }

    this.setState({ errors })

    if (!errors) {
      DropDownHolder.dropDown.alertWithType('success', 'Success', 'La partie a bien été créée !')
      return true
    } else {
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Merci de remplir tous les champs correctement.'
      )
      return false
    }
  }

  createRoom() {
    if (this.checkRoomOptions()) {
      this.props.client
        .create('polygaroom', {
          gameName: this.state.gameName,
          maxClients: this.state.nbPlayers,
          debateTime: this.state.debateTime,
          user: this.props.me,
        })
        .then((room) => {
          this.props.setCurrentRoom(room)
          this.props.setCurrentGameName(this.state.gameName)
          NavigationService.navigateAndReset('ChatScreen')
        })
        .catch((err) => {
          DropDownHolder.dropDown.alertWithType('error', 'Error', err)
        })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={Style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
      >
        <LogoTitleComponent title="Créer une partie" />
        <View>
          <InputComponent
            placeholder="Nom de la partie"
            onChangeText={(text) => this.handleChange('gameName', text)}
            errors={this.state.errors && this.state.errors.gameName}
          />
          <AppText style={Style.debateTime}>Temps de débat :</AppText>
          <View style={Style.cascadeButtons}>
            <ButtonComponent
              onPress={() => this.handleChange('debateTime', 3)}
              title="03:00"
              style={
                this.state.debateTime === 3
                  ? ApplicationStyles.touchable.primary
                  : ApplicationStyles.touchable.accent
              }
            />
            <ButtonComponent
              onPress={() => this.handleChange('debateTime', 5)}
              title="05:00"
              style={
                this.state.debateTime === 5
                  ? ApplicationStyles.touchable.primary
                  : ApplicationStyles.touchable.accent
              }
            />
            <ButtonComponent
              onPress={() => this.handleChange('debateTime', 7)}
              title="07:00"
              style={
                this.state.debateTime === 7
                  ? ApplicationStyles.touchable.primary
                  : ApplicationStyles.touchable.accent
              }
            />
          </View>
          <InputComponent
            placeholder="Nombre de joueurs"
            onChangeText={(text) => this.handleChange('nbPlayers', text)}
            keyboardType={'numeric'}
            errors={this.state.errors && this.state.errors.nbPlayers}
          />
        </View>
        <View style={Style.validateButton}>
          <ButtonComponent
            title="VALIDER"
            isLoading={this.props.registerLoading}
            style={ApplicationStyles.touchable.secondary}
            onPress={() => this.createRoom()}
          />
          <ButtonComponent
            onPress={() => NavigationService.navigateAndReset('Home')}
            title="Retour"
            style={ApplicationStyles.touchable.primary}
          />
        </View>
      </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen)
