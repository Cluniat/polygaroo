import React from 'react'
import { Image, KeyboardAvoidingView, View, Platform } from 'react-native'
import { ApplicationStyles, Colors, Helpers, Images } from 'App/Theme'
import Style from './LoginScreenStyle'
import InputComponent from 'App/Components/InputComponent/InputComponent'
import { connect } from 'react-redux'
import AuthActions from 'App/Stores/Auth/Actions'
import { PropTypes } from 'prop-types'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import NavigationService from 'App/Services/NavigationService'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordReference: '',
    }
  }

  passwordRef(input) {
    if (this.state.passwordReference === '') this.setState({ passwordReference: input })
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
        <View style={Style.logoContainer}>
          <Image style={Helpers.fullSize} source={Images.logo} resizeMode={'contain'} />
        </View>
        <View style={Helpers.fullWidth}>
          <InputComponent
            placeholder="E-mail"
            onChangeText={(text) => this.handleChange('email', text)}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            onSubmitEditing={() => this.state.passwordReference.focus()}
          />
          <InputComponent
            placeholder="Mot de passe"
            onChangeText={(text) => this.handleChange('password', text)}
            secureTextEntry={true}
            returnKeyType={'done'}
            reference={this.passwordRef.bind(this)}
          />
        </View>
        <ButtonComponent
          onPress={() => this.props.login(this.state.email, this.state.password)}
          title="CONNEXION"
          isLoading={this.props.loginLoading}
          color={Colors.secondary}
          style={ApplicationStyles.touchable.secondary}
        />
        <ButtonComponent
          onPress={() => NavigationService.navigate('Signup')}
          title="Inscription"
          style={ApplicationStyles.touchable.primary}
        />
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {
  token: PropTypes.string,
  loginLoading: PropTypes.bool,
  loginError: PropTypes.string,
  login: PropTypes.func,
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  loginLoading: state.auth.loginLoading,
  loginError: state.auth.loginError,
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(AuthActions.login(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
