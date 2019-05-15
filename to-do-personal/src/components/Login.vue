<template>
<div id="login">
  <form @submit.prevent="login" id="color" class="fifty pure-form pure-form-aligned">
    <fieldset>
      <h2 v-if="true" class="title center">Login to your Account</h2>
      
      <div class="group">
        <input v-bind:class="{ error : error && username == ''}"  v-model="username" type="text" placeholder="Username">
      </div>

      <div class="group">
        <input v-bind:class="{ error : error && password == ''}"  v-model="password" type="password" placeholder="Password">
      </div>
<p v-if="error" id="error-message">{{error}}</p>
      <div class="end group end">
        <button @mouseover="hover" @click="toggleLoginRegister" class="registerButton pure-button">Register Instead</button> 
        <button @mouseover="hover" type="submit" class="submit pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
  
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      try {
        this.press();
        console.log("Trying to log in");
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        console.log("logged in");
        await this.$store.dispatch("getItems");
        console.log("hi");
        await this.$store.dispatch("loadPreferences");
      } catch (error) {
        console.log(error);
      }
    },
    toggleLoginRegister() {
      this.press();
      this.$store.dispatch("toggleLoginRegister");
    },
    hover()
    {
          this.$store.dispatch("playSound", {sound: 3, volume: 0});
    },
    press()
    {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
    },
  },
  computed: {
    valid() {
      if (this.username != "" && this.password != "") return true;
      return false;
    }
  }
}
</script>

<style scoped>
.error {
  background-color: rgb(253, 231, 231);
}
#error-message {
  color: rgba(172, 28, 28,.7) !important;
  margin-bottom: 0px;
}

#login
{
    margin-top: 4%;
    min-width: 100px;
}
#color
{
    animation: fade-in 3s ease;
    background-color: rgba(245, 245, 245, 0) !important;
    border: 1px solid rgba(223, 223, 223, 0);
    border-radius: 5px;
    color: #516477;
    padding-top: 20px;
    
}
h2{
    font-weight: lighter;
}
.group
{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 10px;
}
.descript
{
    margin-right: 10px;
    color: rgb(179, 179, 179);

}
fieldset{
    width: 100%;
}
form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
    padding: 20px;
    padding-top: 0px;
    padding-bottom: 0px;
    position: relative;
}

.registerButton
{
  background-color: rgb(240, 239, 239);
  transition: background-color .2s ease, color .2s ease;
  color: rgb(131, 131, 131);
  margin-bottom: 10px;
}
.registerButton:hover{
  background-color: rgb(248, 253, 255);
  color: rgb(34, 31, 77);
}
.pure-controls {
  display: flex;
}
.pure-controls button {
  margin-left: auto;
}

.fifty
{
    margin: 0 auto;
    width: 40%;
    max-width: 400px;
}

.center
{
    display: block;
    margin: 0 auto !important;
    padding-bottom: 20px;
    padding-top: 20px;
    text-align: center;
}

.end
{
    padding-top: 20px;
    justify-content: space-around !important;

}

.valid {
  background-color: rgb(207, 207, 207) !important;
}

.title:hover
{
  animation: pop .7s ease;
}

.submit
{
  margin-bottom: 10px;
}


</style>
