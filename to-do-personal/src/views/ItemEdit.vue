<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
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
    },
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
    hover()
    {
          this.$store.dispatch("playSound", {sound: 0, volume: 0});
    },
    press()
    {
          this.$store.dispatch("playSound", {sound: 3, volume: 0});
    },
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
  padding: 20px;
  font-weight: lighter;
  font-size: 150%;
  color: #516477;
  width: 200px;
  border-radius: 100px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: rgba(241, 241, 241,0);
  transition: background-color .2s ease, color .2s ease;
  cursor: pointer;
}
#login-button:hover{
background-color: rgb(24, 111, 192);
color: white;
}
#wrapper {
  display: flex;
  margin: 30px;
  margin-top: 0px;
  justify-content: space-around;
  flex-wrap: wrap;
  animation: slide-up 3s ease 0s;
}

.fourty{
  display: block;
  width: 35%;
  border-radius: 5px;
  animation: slide-up 2s ease;
}
.sixty{
    display: block;
  width: 60%;
  border-radius: 5px;
  animation: slide-up 2s ease;
}

#buttons
{
  display: block;
  margin: 0 auto;
  margin-top: 7%;
  animation: fade-in 6s ease 0s;
  
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
