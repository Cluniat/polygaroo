<template>
  <div>
      <!-- Modal for creating an user-->
      <transition name="modal" v-if="showModalCreateUser">
          <div class="modal-mask">
              <div class="modal-wrapper">
                  <div class="modal-container">
                      <h1>Create an user</h1>
                      <label>
                          <input type="email" name="email" v-model="email" required placeholder="Email"/>
                      </label>
                      <br />
                      <label>
                          <input type="text" name="nom" v-model="nom" required placeholder="Name"/>
                      </label>
                      <br />
                      <label>
                          <input type="text" name="password" v-model="password" required placeholder="Password"/>
                      </label>

                      <div class="modal-buttons">
                          <button class="modal-button" @click="hideCreateUser()">Cancel</button>
                          <button class="modal-button" @click="confirmCreateUser()">Create</button>
                      </div>

                      <br />
                      <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                  </div>
              </div>
          </div>
      </transition>

      <!-- Modal for editing an user -->
      <transition name="modal" v-if="showModalEditUser">
          <div class="modal-mask">
              <div class="modal-wrapper2">
                  <div class="modal-container">
                      <h1>Edit an user</h1>
                      <p>Id</p><p style="color: #FFA07A;"><strong>{{userToEdit._id}}</strong></p>
                      <div class="span5" style="padding-right: 10px;">
                          <p>Email <input type="email" name="editEmail" v-model="editEmail" :placeholder="editEmail"/></p>
                          <p>Name <input type="text" name="editName" v-model="editName" :placeholder="editName"/></p>
                          <p>Password <input type="password" name="editPassword" v-model="editPassword" :placeholder="editPassword"/></p>
                          <p>Is Admin <input type="checkbox" name="editIsAdmin" v-model="editIsAdmin" :placeholder="editIsAdmin"/> </p>
                          <p>Birthday date<input type="text" name="editBirth_date" v-model="editBirth_date" :placeholder="editBirth_date"/></p>
                      </div>
                      <div class="span5" style="padding-left: 10px;">
                          <p>Historic <input type="text" name="editHistoric" v-model="editHistoric" :placeholder="editHistoric"/></p>
                          <p>Good decision <input type="text" name="editGoodDecision" v-model="editGoodDecision" :placeholder="editGoodDecision"/></p>
                          <p>Wins <input type="text" name="editWins" v-model="editWins" :placeholder="editWins"/></p>
                          <p>Nb recale games <input type="text" name="editNbRecaleGames" v-model="editNbRecaleGames" :placeholder="editNbRecaleGames"/></p>
                          <p>Level <input type="text" name="editLevel" v-model="editLevel" :placeholder="editLevel"/></p>
                      </div>
                      <br />

                      <div class="modal-buttons">
                          <button class="modal-button" @click="hideEditUser()">Cancel</button>
                          <button class="modal-button" @click="confirmEditUser(userToEdit, editEmail, editName, editPassword, editIsAdmin, editBirth_date, editHistoric, editGoodDecision, editWins, editNbRecaleGames, editLevel)">Update</button>
                      </div>

                      <br />
                      <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                  </div>
              </div>
          </div>
      </transition>

      <!-- Content page Home-->
      <button class="deconnect" type="button" v-on:click="logoutSubmit()">Sign out</button>
      <button class="create" type="button" v-on:click="showModalCreateUser = true">Create an user</button>

      <h1>List of users</h1>

      <em v-if="users.loading">Loading users...</em>

      <div style="overflow-x:auto;">
          <table>
              <thead>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Is Admin</th>

                    <th></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="user in users.items">
                    <tr v-for="(element, index) in user.data" :key="index">
                        <td>{{ element._id }}</td>
                        <td>{{ element.email}}</td>
                        <td>{{ element.name}}</td>
                        <td>{{ element.is_admin }}</td>
                        <td>
                            <img src="../assets/rubbish-bin.png" @click="deleteAnUser(element._id)">
                            <img src="../assets/pencil-edit-button.png" @click="edit(element)">
                        </td>
                    </tr>
                </template>
              </tbody>
          </table>
      </div>

      <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: "Home",
  data() {
      return {
          showModalCreateUser: false,
          email: '',
          nom: '',
          password: '',

          showModalEditUser: false,
          userToEdit: '',
          editEmail: '',
          editName: '',
          editPassword: '',
          editIsAdmin: '',
          editBirth_date: '',
          editHistoric: '',
          editGoodDecision: '',
          editWins: '',
          editNbRecaleGames: '',
          editLevel: '',
      }
  },
  created: function() {
      // eslint-disable-next-line no-unused-vars
    this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'auth/loginSuccess') {
            this.getAllUsers()
        }
      });

  },
  computed: {
    ...mapGetters('auth', ['loggedIn']),
    ...mapState({users: state => state.users.all}),
  },
  methods: {
      ...mapActions('auth', ['logout']),
      ...mapActions('users', {getAllUsers: 'getAllUsers'}),
      ...mapActions('users', ['createUser']),
      ...mapActions('users', ['deleteUser']),
      ...mapActions('users', ['editUser']),
      ...mapActions('users', ['setAdmin']),

      logoutSubmit() {
          this.logout()
      },

      hideCreateUser() {
          this.showModalCreateUser = false
      },
      confirmCreateUser() {
          if (this.email !== '' && this.password !== '' && this.nom !== '') {
              return this.createUser({email: this.email, password: this.password, name: this.nom})
          }
      },

      deleteAnUser(id) {
          if (confirm("Are you sure you want to delete this user?")) {
              return this.deleteUser(id)
          } else {
              return false
          }
      },

      edit(user) {
          this.showModalEditUser = true
          this.editEmail = user.email
          this.editName = user.name
          this.editPassword = user.password
          this.editIsAdmin = user.is_admin
          this.editBirth_date = user.birth_date
          this.editHistoric = user.historic
          this.editGoodDecision = user.good_decision
          this.editWins = user.wins
          this.editNbRecaleGames = user.nb_recale_games
          this.editLevel = user.level
          this.userToEdit = user
      },

      hideEditUser() {
          this.showModalEditUser = false
      },
      async confirmEditUser(user, email, name, password, isAdmin, birthDate, historic, goodDecision, wins, nbRecaleGames, level) {
          if (user.email !== email && email !== '') {
              user.email = email
          }
          if (user.name !== name && name !== '') {
              user.name = name
          }
          if (user.password !== password && password !== '') {
              user.password = password
          }
          if (user.birth_date !== birthDate && birthDate !== '') {
              user.birth_date = birthDate
          }
          if (user.historic !== historic && historic !== '') {
              user.historic = historic
          }
          if (user.good_decision !== goodDecision && goodDecision !== '') {
              user.good_decision = goodDecision
          }
          if (user.wins !== wins && wins !== '') {
              user.wins = wins
          }
          if (user.nb_recale_games !== nbRecaleGames && nbRecaleGames !== '') {
              user.nb_recale_games = nbRecaleGames
          }
          if (user.level !== level && level !== '') {
              user.level = level
          }

          await this.editUser(user)

          if (user.is_admin !== isAdmin) {
             await this.setUserAdmin(user)
          }

          this.showModalEditUser = false
          this.getAllUsers()
      },

      setUserAdmin(user) {
          return this.setAdmin(user)
      }
  }
};
</script>

<style scoped>
    table {
        border: 2px solid #FFA07A;
        border-radius: 3px;
        background-color: #1E1E1E;
        align-content: center;
        border-collapse: collapse;
        margin-right: auto;
        margin-left: auto;
    }

    th, td {
        background-color: #1E1E1E;
        color: rgba(255,255,255,0.66);
        cursor: pointer;
        border: 2px solid #FFA07A;
        padding: 10px 20px;
        font-size: 15px;
    }

    th:hover {
        color: #fff;
    }

    td:hover {
        color: #FFA07A;
    }

    h1 {
        color: #FFA07A;
        margin-top: 20px;
    }

    .deconnect {
        background-color: #6F0D26;
        border: none;
        color: #FFA07A;
        text-decoration: none;
        margin-top: 20px;
        margin-right: 2px;
        top: 0;
        right: 0;
        position:absolute;
        cursor: pointer;
    }

    .create {
        background-color: #6F0D26;
        border: none;
        color: #FFA07A;
        text-decoration: none;
        margin-top: 30px;
        margin-right: 2px;
        right: 0;
        position: absolute;
        cursor: pointer;
    }

    input {
        background-position: 5px 3px;
        background-repeat: no-repeat;
        background-color: transparent;
        width: 100%;
        border-color: #FFA07A;
        color: rgba(255,255,255,0.66);
        text-align: center;
    }

    .text-danger {
        color: #FFA07A;
    }

    .modal-mask {
        position: absolute;
        z-index: 9998;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
        overflow: hidden;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    div .span5 {
        display: table-cell;
    }

    .modal-container {
        width: 600px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #1E1E1E;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid #FFA07A;
        border-radius: 4px;
        background-color: #6F0D26;
        color: #FFA07A;
    }

    .modal-button {
        background-color: #6F0D26;
        border: none;
        color: #FFA07A;
        padding: 12px 30px;
        text-align: center;
        text-decoration: none;
        margin-top: 10px;
        cursor: pointer;
        margin-right: 5px;
    }
</style>
