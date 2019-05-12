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
import List from '@/components/List.vue'
import SingleItem from '@/components/SingleItem.vue'
import ItemEditor from '@/components/ItemEditor.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    List,
    SingleItem,
    ItemEditor,
    Login,
    Register
  },
  data(){
    return {

    }
  },
  methods: {

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
#login-div
{
  margin-top: 10%;
}
</style>