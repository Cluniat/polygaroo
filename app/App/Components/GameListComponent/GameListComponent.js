import React, { useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { ApplicationStyles, Helpers } from 'App/Theme'
import Style from './GameListComponentStyle'
import ModalComponent from 'App/Components/ModalComponent/ModalComponent'
import ModalJoinComponent from 'App/Components/ModalJoinComponent/ModalJoinComponent'
import ButtonComponent from 'App/Components/ButtonComponent/ButtonComponent'
import AppText from 'App/Components/AppText/AppText'

const GameListComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [roomToJoin, setRoomToJoin] = useState(false)

  return props.list && props.list.length > 0 ? (
    <ScrollView
      style={Style.container}
      refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}
    >
      <ModalComponent modalVisible={modalVisible} closeModal={() => setModalVisible(false)}>
        <ModalJoinComponent room={roomToJoin} beforeNavigate={() => setModalVisible(false)} />
      </ModalComponent>
      {props.list.map((data, index) => {
        return (
          <View style={Helpers.fillColCenter} key={`room-${index}`}>
            <View style={[Helpers.fillRowCross, Helpers.mainSpaceBetween]}>
              <AppText style={ApplicationStyles.highlightText}>{data.metadata.gameName}</AppText>
              <View style={Helpers.fillColCenter}>
                <AppText>
                  {data.clients} / {data.maxClients}
                </AppText>
                <AppText>joueurs</AppText>
              </View>
              <ButtonComponent
                onPress={() => {
                  setRoomToJoin(data)
                  setModalVisible(!modalVisible)
                }}
                title="Rejoindre"
                style={ApplicationStyles.touchable.primary}
              />
            </View>
            <View style={ApplicationStyles.line} />
          </View>
        )
      })}
    </ScrollView>
  ) : (
    <ScrollView
      style={Helpers.fill}
      refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}
    >
      <AppText style={Style.emptyMessage}>Pour jouer, il faut créer une partie !</AppText>
    </ScrollView>
  )
}

export default GameListComponent
