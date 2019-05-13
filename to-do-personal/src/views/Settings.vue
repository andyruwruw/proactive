<template>
  <div class="home">
    <div v-if="!user" id="login-div">
      <login v-if="loginorregister"/>
      <register v-else/>
    </div>
    <div v-else>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    Login,
    Register
  },
  data(){
    return {

    }
  },
  methods: {
    hover()
    {
          this.$store.dispatch("playSound", {sound: 0, volume: 0});
    },
    press()
    {
          this.$store.dispatch("playSound", {sound: 3, volume: 0});
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    loginorregister()
    {
      return this.$store.state.loginorregister;
    }
  },
}
</script>

<style scoped>

</style>