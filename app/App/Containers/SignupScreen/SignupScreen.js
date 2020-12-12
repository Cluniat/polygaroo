import React from 'react'
import { KeyboardAvoidingView, View, Platform } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Style from './SignupScreenStyle'
import Helpers from 'App/Theme/Helpers'
import InputComponent from 'App/Components/InputComponent/InputComponent'
import { connect } from 'react-redux'
import AuthActions from 'App/Stores/Auth/Actions'
import { PropTypes } from 'prop-types'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import NavigationService from 'App/Services/NavigationService'
import DatePickerComponent from 'App/Components/DatePickerComponent/DatePickerComponent'
import LogoTitleComponent from 'App/Components/LogoTitleComponent/LogoTitleComponent'

class SignupScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      passwordReference: '',
      emailReference: '',
      birthday: '',
    }
  }

  passwordRef(input) {
    if (this.state.passwordReference === '') this.setState({ passwordReference: input })
  }

  emailRef(input) {
    if (this.state.emailReference === '') this.setState({ emailReference: input })
  }

  handleChange(name, text) {
    return this.setState({
      [name]: text,
    })
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={Style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
      >
        <LogoTitleComponent title="Créer un compte" />
        <View style={Helpers.fullWidth}>
          <InputComponent
            placeholder="Pseudo"
            onChangeText={(text) => this.handleChange('name', text)}
            returnKeyType={'next'}
            onSubmitEditing={() => this.state.emailReference.focus()}
            errors={this.props.registerError && this.props.registerError.name}
          />
          <InputComponent
            placeholder="E-mail"
            onChangeText={(text) => this.handleChange('email', text)}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            onSubmitEditing={() => this.state.passwordReference.focus()}
            reference={this.emailRef.bind(this)}
            errors={this.props.registerError && this.props.registerError.email}
          />
          <InputComponent
            placeholder="Mot de passe"
            onChangeText={(text) => this.handleChange('password', text)}
            secureTextEntry={true}
            returnKeyType={'done'}
            reference={this.passwordRef.bind(this)}
            errors={this.props.registerError && this.props.registerError.password}
          />
          <DatePickerComponent
            placeholder="Date de naissance"
            date={this.state.birthday}
            onDateChange={(date) => this.handleChange('birthday', date)}
            returnKeyType={'done'}
          />
        </View>
        <View style={Helpers.crossCenter}>
          <ButtonComponent
            onPress={() =>
              this.props.register(
                this.state.email,
                this.state.password,
                this.state.name,
                this.state.birthday
              )
            }
            title="VALIDER"
            isLoading={this.props.registerLoading}
            style={ApplicationStyles.touchable.secondary}
          />
          <ButtonComponent
            onPress={() => NavigationService.navigate('MainScreen')}
            title="J'ai déjà un compte"
            style={ApplicationStyles.touchable.primary}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

SignupScreen.propTypes = {
  registerLoading: PropTypes.bool,
  registerError: PropTypes.string,
  register: PropTypes.func,
}

const mapStateToProps = (state) => ({
  registerLoading: state.auth.registerLoading,
  registerError: state.auth.registerError,
})

const mapDispatchToProps = (dispatch) => ({
  register: (email, password, name, birthday) =>
    dispatch(AuthActions.register(email, password, name, birthday)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
