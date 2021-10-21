<template>
  <div>
    <UsersTable/>
    <UsersForm/>
  </div>
</template>

<script>

  import UsersTable from './components/UsersTable'
  import UsersForm from './components/UsersForm'

  export default {
    name: 'App',
    components: {
      UsersTable,
      UsersForm
    }
  }
  
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>