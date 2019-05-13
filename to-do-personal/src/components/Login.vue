<template>
<div id="login">
  
  <form @submit.prevent="login" id="color" class="fifty pure-form pure-form-aligned">
    <fieldset>
        <h2 v-if="true" class="title center">Login to your Account</h2>
      <div class="group">
        <input v-model="username" type="text" placeholder="Username">
      </div>

      <div class="group">
        <input v-model="password" type="password" placeholder="Password">
      </div>

      <div class="end group end">
        <button @click="toggleLoginRegister" class="registerButton pure-button">Register Instead</button> 
        <button type="submit" class="submit pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
  
  <p v-if="error" class="error">{{error}}</p>
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
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        await this.$store.dispatch("getItems");
      } catch (error) {
        console.log(error);
      }
    },
    toggleLoginRegister() {
        this.$store.dispatch("toggleLoginRegister");
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
  computed: {
    valid() {
      if (this.username != "" && this.password != "") return true;
      return false;
    }
  }
}
</script>

<style scoped>
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
