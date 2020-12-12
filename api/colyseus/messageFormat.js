exports.createMessage = (message, user) => {
  return (
    {
      isEvent: false,
      user: {
        _id: user.id,
        name: user.name
      },
      text: message,
      createdAt: Date.now()
    }
  )
}

exports.createEvent = (title, data) => {
  return (
    {
      isEvent: true,
      title: title,
      data: data
    }
  )
}
