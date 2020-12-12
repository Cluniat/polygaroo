import React from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import Style from './ModalComponentStyle'

const ModalComponent = (props) => (
  <View>
    <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
      <TouchableOpacity
        style={Style.modal}
        onPressOut={() => {
          props.closeModal()
        }}
      >
        <View>{props.children}</View>
      </TouchableOpacity>
    </Modal>
  </View>
)

export default ModalComponent
