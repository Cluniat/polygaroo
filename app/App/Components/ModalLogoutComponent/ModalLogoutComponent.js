import React from 'react'
import { View } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import { connect } from 'react-redux'
import AppText from 'App/Components/AppText/AppText'
import NavigationService from 'App/Services/NavigationService'
import AuthActions from 'App/Stores/Auth/Actions'
import { PropTypes } from 'prop-types'

class ModalLogoutComponent extends React.Component {
  sendEvent() {
    this.props.logout()
    NavigationService.navigateAndReset('MainScreen')
  }

  render() {
    return (
      <View style={ApplicationStyles.modalContent}>
        <AppText style={ApplicationStyles.modalContent.title}>
          {`Vous êtes sur le point de vous déconnecter`}
        </AppText>
        <AppText style={ApplicationStyles.modalContent.body}>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </AppText>
        <ButtonComponent
          onPress={() => this.sendEvent()}
          title="Oui"
          style={ApplicationStyles.touchable.secondary}
        />
      </View>
    )
  }
}

ModalLogoutComponent.propTypes = {
  logout: PropTypes.func,
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  me: state.auth.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(AuthActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogoutComponent)
