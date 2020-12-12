<template>
    <div class="polygaroo">
        <Polygaroo/>
        <div class="login">
            <h1>Login</h1>
            <label>
                <input type="email" name="email" v-model="email" required placeholder="Email" />
            </label>
            <br/>
            <label>
                <input type="password" name="password" v-model="password" required placeholder="Password" />
            </label>
            <button type="button" v-on:click="handleSubmit()">Login</button>
            <br />
            <span v-if="auth.authenticationError !== '' && !auth.authenticationSuccess" class="text-danger">ERROR : {{authenticationError}}</span>
        </div>
    </div>
</template>


<script>
    import Polygaroo from '@/components/Polygaroo.vue'
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            ...mapState({auth: state => state.auth}),
            ...mapGetters('auth', [
                'authenticating',
                'authenticationError',
                'authenticationErrorCode',
                'authenticationSuccess'
            ])
        },
        methods: {
            ...mapActions('auth', ['login']),

            handleSubmit() {
                this.submitted = true
                if (this.email !== '' && this.password !== '') {
                    this.login({email: this.email, password: this.password})
                    this.password = ""
                }
            }
        },
        components: {
            Polygaroo
        }
    }
</script>

<style scoped>
    .login {
        width: 500px;
        border: none;
        background-color: #1E1E1E;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
    }

    h1 {
        color: #FFA07A
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

    input[type=email] {
        background-image: url('../assets/user.png');
        background-position: 5px 3px;
        background-repeat: no-repeat;
        padding-left: 40px;
    }

    input[type=password] {
        background-image: url('../assets/lock.png');
        background-position: 5px 3px;
        background-repeat: no-repeat;
        padding-left: 40px;
    }

    .text-danger {
        color: #FFA07A;
    }

    button {
        background-color: #6F0D26;
        border: none;
        color: #FFA07A;
        padding: 12px 30px;
        text-align: center;
        text-decoration: none;
        margin-top: 10px;
        cursor: pointer;
    }
</style>