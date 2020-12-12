import React from 'react'
import { View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { ApplicationStyles, Colors, Helpers, Images } from 'App/Theme'
import Style from './ProfileScreenStyle'
import { connect } from 'react-redux'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import AppText from 'App/Components/AppText/AppText'
import InputComponent from 'App/Components/InputComponent/InputComponent'
import DatePickerComponent from 'App/Components/DatePickerComponent/DatePickerComponent'
import AuthActions from 'App/Stores/Auth/Actions'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import IconButtonComponent from 'App/Components/IconButtonComponent/IconButtonComponent'
import ModalComponent from 'App/Components/ModalComponent/ModalComponent'
import ModalLogoutComponent from 'App/Components/ModalLogoutComponent/ModalLogoutComponent'

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      logoutClicked: false,
      toEdit: false,
      userId: this.props.me._id,
      email: this.props.me.email,
      name: this.props.me.name,
      password: this.props.me.password,
      birthday: moment(this.props.me.birth_date).format('DD-MM-YYYY'),
      imgSrc: Images.etudiant,
      listImg: [
        Images.etudiant,
        Images.recale,
        Images.peip1,
        Images.logo,
        Images.admin,
        Images.fetard,
        Images.jury,
        Images.rattrapages,
        Images.redoublant,
      ],
    }
  }

  logout() {
    this.setState({
      modalVisible: true,
      logoutClicked: true,
    })
  }

  emailRef(input) {
    if (this.state.emailReference === '') this.setState({ emailReference: input })
  }

  handleChange(name, text) {
    return this.setState({
      [name]: text,
    })
  }

  editUser() {
    this.props.edit(
      this.props.token,
      this.state.userId,
      this.state.email,
      this.state.password,
      this.state.name,
      this.state.birthday
    )

    this.setState({ toEdit: false })
  }

  changeImg(oldImg) {
    let numImg, newImg
    do {
      numImg = Math.floor(Math.random() * this.state.listImg.length)
      newImg = this.state.listImg[numImg]
    } while (oldImg === newImg)
    this.setState({ imgSrc: newImg })
  }

  render() {
    return (
      <View style={Style.container}>
        <StatusBar backgroundColor={Colors.accent} barStyle={'light-content'} />
        <ModalComponent
          modalVisible={this.state.modalVisible}
          closeModal={() => this.setState({ modalVisible: false })}
        >
          {this.state.logoutClicked && <ModalLogoutComponent />}
        </ModalComponent>
        {!this.state.toEdit && (
          <View style={Style.imageHeader}>
            <IconButtonComponent onPress={() => this.logout()} image={Images.logout} />
          </View>
        )}
        <View style={Style.header}>
          <View style={Style.logoContainer}>
            <TouchableOpacity onPress={() => this.changeImg(this.state.imgSrc)}>
              <Image style={Helpers.fullSize} source={this.state.imgSrc} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
          <View style={Helpers.colCross}>
            <AppText style={ApplicationStyles.titleAccent}>Mon profil</AppText>
            {this.state.toEdit ? (
              <ButtonComponent
                onPress={() => this.editUser()}
                title="VALIDER"
                isLoading={this.props.editLoading}
                style={ApplicationStyles.touchable.primary}
              />
            ) : (
              <ButtonComponent
                onPress={() => this.setState({ toEdit: true })}
                title="MODIFIER"
                style={ApplicationStyles.touchable.primary}
              />
            )}
          </View>
        </View>

        {this.state.toEdit ? (
          <View style={Style.profileContent}>
            <View style={Helpers.fullWidth}>
              <InputComponent
                value={this.state.name}
                onChangeText={(text) => this.handleChange('name', text)}
                returnKeyType={'next'}
                onSubmitEditing={() => this.state.emailReference.focus()}
              />
              <InputComponent
                value={this.state.email}
                onChangeText={(text) => this.handleChange('email', text)}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                reference={this.emailRef.bind(this)}
              />
            </View>
            <DatePickerComponent
              date={this.state.birthday}
              onDateChange={(date) => this.handleChange('birthday', date)}
              returnKeyType={'done'}
            />
          </View>
        ) : (
          <View style={Style.profileContent}>
            <AppText style={Style.body}>{`Pseudo : ${this.props.me.name}`}</AppText>
            <AppText style={Style.body}>{`Email : ${this.props.me.email}`}</AppText>
            <AppText style={Style.body}>
              {`Date de naissance : ${moment(this.props.me.birth_date).format('DD-MM-YYYY')}`}
            </AppText>
          </View>
        )}
      </View>
    )
  }
}

ProfileScreen.propTypes = {
  editLoading: PropTypes.bool,
  editError: PropTypes.string,
  edit: PropTypes.func,
}

const mapStateToProps = (state) => ({
  me: state.auth.currentUser,
  editLoading: state.auth.editLoading,
  token: state.auth.token,
})

const mapDispatchToProps = (dispatch) => ({
  edit: (token, userId, email, password, name, birthday) =>
    dispatch(AuthActions.edit(token, userId, email, password, name, birthday)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
