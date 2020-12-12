import React from 'react'
import { View } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Style from './HomeScreenStyle'
import HeaderComponent from 'App/Components/HeaderComponent/HeaderComponent'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import GameListComponent from 'App/Components/GameListComponent/GameListComponent'
import NavigationService from 'App/Services/NavigationService'
import ColyseusActions from 'App/Stores/Colyseus/Actions'
import { connect } from 'react-redux'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      refreshRooms: false,
    }
  }

  getAvailableRooms() {
    this.setState({ refreshRooms: true })
    this.props.client
      .getAvailableRooms('polygaroom')
      .then((rooms) => {
        this.setState({ rooms, refreshRooms: false })
      })
      .catch((err) => {
        console.log(err)
        console.warn(err)
      })
  }

  componentDidMount() {
    this.getAvailableRooms()
  }

  render() {
    return (
      <View style={Style.container}>
        <HeaderComponent />
        <View>
          <ButtonComponent
            title="CREER UNE PARTIE"
            style={ApplicationStyles.touchable.primary}
            onPress={() => NavigationService.navigate('CreateGame')}
          />
        </View>
        <GameListComponent
          list={this.state.rooms}
          refreshing={this.state.refreshRooms}
          onRefresh={() => this.getAvailableRooms()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  client: state.colyseus.colyseusClient,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (room) => {
    dispatch(ColyseusActions.setCurrentRoom(room))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
