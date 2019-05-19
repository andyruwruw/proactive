<template>
  <div class="home">
    <div v-bind:class="{ invertlights: preferences.colors}" v-if="user" @mouseover="hover" @click="createItem" class="fade" id="new"><button id="addTask"/></div>
    <div v-if="!user" id="login-div">
      <div @mouseover="hover" @click="toggleLoginRegister" v-if="loginorregister == -1" id="buttons">
        <div id="image"></div>
        <h1 id="login-button">Login to Start</h1>
      </div>
      <login v-if="loginorregister == 1"/>
      <register v-if="loginorregister == 0"/>
    </div>
    <div id="wrapper" class="below" v-else>
      <list class="div"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    List,
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
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
      this.$store.dispatch("toggleLoginRegister");
    },
    createItem()
    {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
      this.$router.push('new');
    },
    hover()
    {
      this.$store.dispatch("playSound", {sound: 3, volume: 0});
    },
    press()
    {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
    },
    startMusic()
    {
      this.$store.dispatch("playSong");
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
    },
    preferences() {
      return this.$store.state.preferences;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    if (this.user)
    {
      await this.$store.dispatch("getItems");
    }
    if (this.preferences.colors == 1)
      {
        this.$store.dispatch("updatePreferences", {tag: "colors", set: 1});
        let changes = [
          {id: "background", class: "lights-off-one"},
          {id: "app", class: "lights-off-two"},
          {id: "maintitle", class: "inverttext6"},
          {id: "home", class: "invertlights"},
          {id: "settings", class: "invertlights"},
        ];

        for (var i = 0; i < changes.length; i++)
        {
          var element = document.getElementById(changes[i].id);
          element.classList.add(changes[i].class);
        }
      }
      else 
      {
        this.$store.dispatch("updatePreferences", {tag: "colors", set: 0});

        let changes = [
          {id: "background", class: "lights-off-one"},
          {id: "app", class: "lights-off-two"},
          {id: "maintitle", class: "inverttext6"},
          {id: "home", class: "invertlights"},
          {id: "settings", class: "invertlights"},
        ];
        for (var i = 0; i < changes.length; i++)
        {
          var element = document.getElementById(changes[i].id);
          if (element.classList.contains(changes[i].class))
          {
            element.classList.remove(changes[i].class)
          }
        }

      }
    this.startMusic();
    console.log("ITEM BACKGROUND: " + this.preferences.itembackground);
  },
  
}
</script>

<style scoped>
.fade{
  animation: fade-in 1s ease;
}

.home {
  position: relative;
}

#new{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  padding: 10px;
  border-radius: 100px;
  position: absolute;
  left: calc(73px + 2%);
  top: -82px;
  opacity: .75;
  transition: background .2s ease 0s, opacity .2s ease 0s;
  cursor: pointer;
}

#addTask
{
  width: 35px;
  height: 35px;
  background-size: cover;
  background-image: url("../assets/new.png");
  border: 0px solid black;
  background-color: rgba(0,0,0,0);
}

#new:hover{
  background: rgb(179, 215, 236);
  opacity: 1;
}

#login-button
{
  padding: 20px;
  font-weight: lighter;
  font-size: 150%;
  color: #516477;
  width: 200px;
  border-radius: 100px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: rgba(241, 241, 241,0);
  transition: background-color .5s ease, color .2s ease;
  cursor: pointer;
}

#login-button:hover{
background-color: rgb(24, 111, 192);
color: white;
}

#wrapper {
  display: flex;
  margin: 10px;
  margin-top: 0px;
  padding-bottom: 30px;
  justify-content: space-around;
  flex-wrap: wrap;
}

.div{
    display: block;
  width: 85%;
  border-radius: 5px;
}

#buttons
{
  display: block;
  margin: 0 auto;
  margin-top: 7%;
  animation: fade-in 3s ease 0s;
  
  width: calc(50vw);
  height: calc(50vw);
  border-radius: 1000px;
  cursor: pointer;
}

#image{
  display: block;
  margin: 0 auto;
  background-image: url("../assets/start.gif");
  background-size: cover;
  width: calc(30vh);
  height: calc(30vh);
  opacity: .75;

}

#image:hover{
  animation: shake .5s ease 0s;
}


</style>
