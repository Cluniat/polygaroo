const colyseus = require('colyseus')
const gameLogic = require('./GameLogic')
const messageFormatter = require('./messageFormat')
const roles = require('./Roles')

exports.Polygaroom = class extends colyseus.Room {
  /**
     * Called when a room is created, initialize all room custom parameters
     * @param options : options given by the client
     */
  onCreate (options) {
    const roleArray = gameLogic.createRoleArray(options.maxClients)
    this.setMetadata({
      gameName: options.gameName,
      debateTime: options.debateTime,
      creator: options.user.name,
      nbRoles: roleArray,
      attributedRoles: roleArray,
      userRoles: [], // list of players who are still in the game with their roles
      votes: [],
      endVote: false,
      ready: 0,
      eliminates: [], // list of players who have been eliminates
      isRecaleVote: false,
      cowards: [] // list of clients who left the game
    })
    this.maxClients = options.maxClients
    console.log('CREATING NEW ROOM', options)
  }

  /**
     * Called when a client join the room
     * @param client : client who have joined the room
     * @param options : info given by client
     * @param auth : not needed for this game
     */
  onJoin (client, options, auth) {
    console.log('JOINING ROOM')
    const message = messageFormatter.createMessage(
            `${options.user.name} a rejoint la partie ${this.metadata.gameName}`,
            { id: 0, name: 'polygaroo' })
    // Build metadata.userRoles
    gameLogic.chooseRole(this, options.user, client)
    // If all the players are in, send a ready event
    if (this.hasReachedMaxClients()) {
      setTimeout(() => gameLogic.sendReadyEvent(this), 1000)
    }
    // Send message when a player join the game
    setTimeout(() => this.broadcast(message), 1000)
  }

  /**
     * Called when a client send a message
     * @param client
     * @param data
     */
  onMessage (client, data) {
    if (data.isEvent && data.title === 'vote') { // when a vote result is received
      try {
        this.onVoteEvent(data)
      } catch (error) {
        this.onError(error)
      }
    } else if (data.isEvent && data.title === 'ready') { // when a ready is received
      try {
        this.onReadyEvent()
      } catch (error) {
        this.onError(error)
      }
    } else if (this.metadata.isRecaleVote) { // when a normal message is received it's broadcast to everybody
      const message = messageFormatter.createMessage(`${data.text}`, { id: data.user._id, name: data.user.name })
      gameLogic.sendToMultipleClients(this, this.metadata.userRoles.filter(({ role }) => role === roles.RECALE || role === roles.PEIP).map(({ client }) => client), message)
    } else { // when a normal message is received it's broadcast to everybody
      const message = messageFormatter.createMessage(`${data.text}`, { id: data.user._id, name: data.user.name })
      this.broadcast(message)
    }
  }

  onLeave (client, consented) {
    console.log('ChatRoom:', client.sessionId, 'left')
    this.setMetadata({
      ...this.metadata,
      cowards: [...this.metadata.cowards, this.metadata.userRoles.filter((userRole) => userRole.client.sessionId === client.sessionId)[0]]
    })
    this.lock()
  }

  /**
     * Called when a vote event is received
     * @param data
     */
  onVoteEvent (data) {
    // Push the new votes into room metadata votes
    const newVotes = this.metadata.votes
    const totalPlayers = this.metadata.nbRoles.recales + this.metadata.nbRoles.etudiants + this.metadata.nbRoles.peip
    newVotes.push({
      user: data.data.candidate
    })
    this.setMetadata({
      ...this.metadata,
      votes: newVotes,
      endVote: (data.data.total === (totalPlayers + this.metadata.cowards.length) && this.metadata.votes.length === totalPlayers) || (data.data.total < (totalPlayers + this.metadata.cowards.length) && this.metadata.votes.length === this.metadata.nbRoles.recales),
      cowards: []
    })
    // Si c'est un vote commun, on broadcast qui vient de voter
    if (data.data.total === (totalPlayers + this.metadata.cowards.length)) {
      const message = messageFormatter.createMessage(`${data.data.user.name} vient de voter!`, { id: 0, name: 'polygaroo' })
      this.broadcast(message)
    }
  }

  /**
     * Called when a ready is received
     */
  onReadyEvent () {
    // Push the new ready into room metadata ready
    this.setMetadata({
      ...this.metadata,
      ready: this.metadata.ready + 1
    })
    // When all the players are ready, game is called
    if (Number(this.metadata.ready) === Number(this.maxClients)) {
      try {
        gameLogic.game(this)
      } catch (error) {
        this.onError(error)
      }
    }
  }

  onError (error) {
    console.log(error)
    const message = messageFormatter.createMessage('An error occured, please excuse us and leave the game', { id: -1, name: 'error' })
    this.broadcast(message)
  }
}
