const formatMessage = (idMessage, message, user) => {
  return {
    _id: idMessage,
    text: message.text,
    createdAt: message.createdAt,
    user: {
      _id: user._id,
      name: user.name,
    },
  }
}

const formatEvent = (title, data) => {
  return {
    isEvent: true,
    title: title,
    data: data,
  }
}

export const MessageService = {
  formatMessage,
  formatEvent,
}
