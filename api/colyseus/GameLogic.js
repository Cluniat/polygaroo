const roles = require('./Roles')
const messageFormat = require('./messageFormat')

/**
 * Create the array of roles for a given number of players
 * @param maxClient
 * @returns {{recales: number, etudiants: number}}
 */
exports.createRoleArray = (maxClient) => {
  const nbRecale = Math.trunc(maxClient / 4)
  // TODO: remove the if statement when done testing
  if (maxClient < 4) {
    const nbRecale = 1
    return ({ recales: nbRecale, etudiants: maxClient - (nbRecale + 1), peip: 1 })
  }
  return ({ recales: nbRecale, etudiants: maxClient - (nbRecale + 1), peip: 1 })
}

/**
 * Choose randomly a role to a player and update room metadata
 * @param room
 * @param user
 * @param client
 */
exports.chooseRole = (room, user, client) => {
  // Choose a random number between 1 and 2
  const rdm = Math.floor(Math.random() * 3) + 1
  // If the result is 1 and there is available roles :  role is recale
  if ((rdm === 1 && room.metadata.attributedRoles.recales > 0) || (room.metadata.attributedRoles.etudiants === 0 && room.metadata.attributedRoles.peip === 0)) {
    let { metadata: { userRoles: newRoles, attributedRoles: { recales } } } = room
    recales = recales - 1
    newRoles.push({
      user: user,
      role: roles.RECALE,
      client: client
    })
    room.setMetadata({
      ...room.metadata,
      userRoles: newRoles,
      attributedRoles: { ...room.metadata.attributedRoles, recales }
    })
  } else if ((rdm === 2 && room.metadata.attributedRoles.peip > 0) || (room.metadata.attributedRoles.etudiants === 0 && room.metadata.attributedRoles.recales === 0)) {
    let { metadata: { userRoles: newRoles, attributedRoles: { peip } } } = room
    peip = peip - 1
    newRoles.push({
      user: user,
      role: roles.PEIP,
      client: client
    })
    room.setMetadata({
      ...room.metadata,
      userRoles: newRoles,
      attributedRoles: { ...room.metadata.attributedRoles, peip }
    })
  } else { // else role is etudiant
    let { metadata: { userRoles: newRoles, attributedRoles: { etudiants } } } = room
    etudiants = etudiants - 1
    newRoles.push({
      user: user,
      role: roles.ETUDIANT,
      client: client
    })
    room.setMetadata({
      ...room.metadata,
      userRoles: newRoles,
      attributedRoles: { ...room.metadata.attributedRoles, etudiants }
    })
  }
}

/**
 * Send unique message to multiple clients
 * @param room
 * @param clients
 * @param message
 */
exports.sendToMultipleClients = (room, clients, message) => {
  clients.map((client) => {
    room.send(client, message)
  })
}

/**
 * Test if the game is over and send which team have won
 * @param room
 * return true if the game is over, false if not
 */
exports.testEndGame = (room) => {
  // Remove all players who left from the room metadata
  if (room.metadata.cowards.length > 0) {
    room.metadata.cowards.map(coward => {
      if (room.metadata.userRoles.includes(coward)) {
        this.eliminateUser(room, coward)
      }
    })
  }
  // Broadcast end event when game is over + disconnect the room
  if (room.metadata.nbRoles.recales === 0 || (room.metadata.nbRoles.etudiants === 0 && room.metadata.nbRoles.peip === 0)) {
    const event = messageFormat.createEvent('end', room.metadata.nbRoles.recales === 0 ? roles.ETUDIANT : roles.RECALE)
    room.broadcast(event)
    room.disconnect()
    return true
  }
  return false
}

/**
 * Calculate and send the result of a vote session
 * @param room
 */
exports.voteResult = (room) => {
  // Add a count attribute to each user which represent the number of its occurences in the list
  const result = room.metadata.votes.reduce((acc, item) => {
    return {
      ...acc,
      [item.user._id]: {
        ...item,
        count: acc[item.user._id] && acc[item.user._id].count ? acc[item.user._id].count + 1 : 1
      }
    }
  }, {})

  // the maximum of all the counts attributes
  const maxVotes = Math.max.apply(Math, Object.values(result).map((vote) => vote.count))

  // The user that correspond to this maximum (in case of equality, the first one is chosen)
  const eliminate = Object.values(result).filter((vote) =>
    vote.count === maxVotes)[0] || room.metadata.userRoles.filter((userRole) => userRole.role !== roles.RECALE)[0]

  // The eliminate user with its role
  const eliminateWithRole = room.metadata.userRoles.filter((userRole) => userRole.user._id === eliminate.user._id)[0]

  // update metadata
  if (eliminateWithRole !== undefined) {
    let { metadata: { userRoles: newRoles, nbRoles: newNb, eliminates: newEliminated } } = room
    newRoles = newRoles.filter((userRole) => userRole.user._id !== eliminate.user._id)
    newNb.etudiants = newRoles.filter((userRole) => userRole.role === roles.ETUDIANT).length
    newNb.recales = newRoles.filter((userRole) => userRole.role === roles.RECALE).length
    newNb.peip = newRoles.filter((userRole) => userRole.role === roles.PEIP).length
    newEliminated.push(eliminateWithRole)
    room.setMetadata({
      ...room.metadata,
      userRoles: newRoles,
      nbRoles: newNb,
      votes: [],
      eliminates: newEliminated,
      endVote: false,
      isRecaleVote: false
    })
    // send the result (event + message)
    const event = messageFormat.createEvent('elimination', { eliminate: eliminate.user, nbRoles: room.metadata.nbRoles })
    const message = messageFormat.createMessage(`${eliminate.user.name} a échoué et quitte Polytech, c'était un ${eliminateWithRole.role}`, {
      id: 0,
      name: 'polygaroo'
    })
    room.broadcast(event)
    room.broadcast(message)
  }
}

/**
 * Remove user from the game and notify client that someone left
 * @param room
 * @param eliminate
 */
exports.eliminateUser = (room, eliminate) => {
  if (eliminate) {
    const eliminateWithRole = room.metadata.userRoles.filter((userRole) => userRole.user._id === eliminate.user._id)[0]
    let { metadata: { userRoles: newRoles, nbRoles: newNb, eliminates: newEliminated } } = room
    newRoles = newRoles.filter((userRole) => userRole.user._id !== eliminate.user._id)
    newNb.etudiants = newRoles.filter((userRole) => userRole.role === roles.ETUDIANT).length
    newNb.recales = newRoles.filter((userRole) => userRole.role === roles.RECALE).length
    newNb.peip = newRoles.filter((userRole) => userRole.role === roles.PEIP).length
    newEliminated.push(eliminateWithRole)
    room.setMetadata({
      ...room.metadata,
      userRoles: newRoles,
      nbRoles: newNb,
      votes: [],
      eliminates: newEliminated,
      isRecaleVote: false
    })
    const message = messageFormat.createMessage(`${eliminate.user.name} a abandonné et quitte Polytech, c'était un ${eliminateWithRole.role}`, {
      id: 0,
      name: 'polygaroo'
    })
    room.broadcast(message)
  }
}

/**
 * Send the start event which start the game to each players
 * @param room
 */
exports.sendStartEvents = (room) => {
  room.metadata.userRoles.map((userRole) => {
    const event = messageFormat.createEvent('start', { role: userRole.role, nbRoles: room.metadata.nbRoles })
    room.send(userRole.client, event)
  })
}

/**
 * Send vote event with the list of candidates
 * @param room
 * @param isRecaleVote
 */
exports.sendVoteEvent = (room, isRecaleVote) => {
  // All users with role = etudiant
  const etudiants = room.metadata.userRoles.filter((item) => item.role !== roles.RECALE).map((item) => item.user)
  // All users of the game
  const allPlayers = room.metadata.userRoles.map((item) => item.user)
  // All clients of the game
  const allClients = room.metadata.userRoles.map((item) => item.client)
  // Send the event
  const event = messageFormat.createEvent('vote', {
    forRecale: isRecaleVote,
    candidates: isRecaleVote ? etudiants : allPlayers,
    timer: 30
  })
  room.setMetadata({
    ...room.metadata,
    isRecaleVote: true
  })
  this.sendToMultipleClients(room, allClients.filter(({ id: clientId }) => !room.metadata.eliminates.map(({ id }) => id).includes(clientId)), event)
  if (isRecaleVote) {
    const message = messageFormat.createMessage('Pendant ce vote, le chat devient privé ! Seuls les recalés (ou presque) peuvent voir ces messages.', { id: 0, name: 'polygaroo' })
    this.sendToMultipleClients(room, allClients.filter(({ id: clientId }) => !room.metadata.eliminates.map(({ id }) => id).includes(clientId)), message)
  }
}

/**
 * Send an event to know if all the players are ready
 * @param room
 */
exports.sendReadyEvent = (room) => {
  const event = messageFormat.createEvent('ready', null)
  room.broadcast(event)
}

/**
 * Send a phase event : Semaine d'examen or Semaine de cours + send a message
 * @param room
 * @param isExam
 */
exports.sendPhaseEvent = (room, isExam) => {
  const data = isExam ? { isExam: isExam } : { isExam: isExam, timer: room.metadata.debateTime * 60 }
  const event = messageFormat.createEvent('phase', data)
  const message = messageFormat.createMessage(isExam ? 'SEMAINE D\'EXAMEN' : 'SEMAINE DE COURS', {
    id: 0,
    name: 'polygaroo'
  })
  const allClients = room.metadata.userRoles.map((item) => item.client)
  this.sendToMultipleClients(room, allClients.filter(({ id: clientId }) => !room.metadata.eliminates.map(({ id }) => id).includes(clientId)), event)
  room.broadcast(message)
}

/**
 * Contains all the logic of a game
 * @param room
 */
exports.game = async (room) => {
  // Start game by sending player role
  this.sendStartEvents(room)
  await this.sleep(room, 2000)

  let isOver = false
  while (!isOver) {
    // Send exam phase event
    this.sendPhaseEvent(room, true)
    let timeCheck = await this.sleep(room, 2000)
    if (timeCheck.isOver) return
    clearTimeout(timeCheck.interval)

    // send recale vote event (they've got 30s to decide)
    this.sendVoteEvent(room, true)
    timeCheck = await this.sleep(room, 30000)
    if (timeCheck.isOver) return
    clearInterval(timeCheck.interval)

    // send vote result (even if not everybody has vote)
    this.voteResult(room)
    timeCheck = await this.sleep(room, 2000)
    if (timeCheck.isOver) return
    clearTimeout(timeCheck.timeout)

    // Send course phase (wait until the end of the debate time)
    this.sendPhaseEvent(room, false)
    timeCheck = await this.sleep(room, room.metadata.debateTime * 60000)
    // timeCheck = await this.sleep(room, 3000)
    if (timeCheck.isOver) return
    clearTimeout(timeCheck.timeout)

    // Send common vote event (they've got 30s to decide)
    this.sendVoteEvent(room, false)
    timeCheck = await this.sleep(room, 30000)
    if (timeCheck.isOver) return
    clearInterval(timeCheck.interval)

    // send vote result (even if not everybody has vote)
    this.voteResult(room)
    timeCheck = await this.sleep(room, 2000)
    if (timeCheck.isOver) return
    clearTimeout(timeCheck.timeout)

    // Check if the game is over
    isOver = this.testEndGame(room)
  }
}

/**
 * Wait before doing the next action
 * @param room
 * @param time
 * @returns {Promise}
 */
exports.sleep = (room, time) => {
  let seconds = 0
  return new Promise((resolve, reject) => {
    let isOver = false
    const interval = setInterval(() => {
      seconds = seconds + 1000
      isOver = this.testEndGame(room)
      if (room.metadata.endVote || seconds === time) {
        return resolve({ interval, isOver })
      }
    }, 1000)
    return { interval, isOver }
  })
}
