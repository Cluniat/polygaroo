<template>
  <div id="app">
    <div id="nav">
     <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        appName: process.env.VUE_APP_NAME
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style>
  body {
    background-color: #6F0D26;
  }

  h1 {
    padding: 0;
    margin-top: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
