<template>
  <div class="home">
    <div v-if="!user" id="login-div">
      <div v-if="loginorregister == -1" id="buttons">
        <button @click="toggleLoginRegister" class="pure-button" id="login-button">Login to Start</button>
      </div>
      <login v-if="loginorregister == 1"/>
      <register v-if="loginorregister == 0"/>
    </div>
    <div v-else>
      <list/>
      <single-item v-if="item && edit"/>
      <item-editor v-if="item && !edit"/>
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
    Register,
  },
  data(){
    return {
      login: 1,
      edit: 0,
    }
  },
  methods: {
    toggleLoginRegister() {
        this.$store.dispatch("toggleLoginRegister");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    items()
    {
      return this.$store.state.items;
    },
    item()
    {
      return this.$store.state.item;
    },
    deleted()
    {
      return this.$store.state.deleted;
    },
    loginorregister()
    {
      return this.$store.state.loginorregister;
    }
  },
  async created() {
    if (this.user)
    {
      await this.$store.dispatch("getItems");
    }
  },
  
}
</script>

<style scoped>
#login-button
{
  margin-top: 20%;
  padding: 20px;
  animation: fade-in 4s ease 0s;
  font-size: 125%;
  color: #3f5366;
  background-color: rgb(241, 241, 241);
}
</style>
