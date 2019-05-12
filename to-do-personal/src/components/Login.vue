<template>
<div id="login">
  
  <form @submit.prevent="login" id="color" class="fifty pure-form pure-form-aligned">
    <fieldset>
        <h2 v-if="false" class="center">Login to your Account</h2>
      <div class="group">
        <label class="descript" for="username">Username</label>
        <input v-model="username" type="text" placeholder="Username">
      </div>

      <div class="group">
        <label class="descript" for="password">Password</label>
        <input v-model="password" type="password" placeholder="Password">
      </div>

      <div class="end group end">
        <button @click="toggleLoginRegister" class="margin-rigtht pure-button">Register Instead</button> 
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
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
        if (this.error === "")
          this.$router.push('mypage');
      } catch (error) {
        console.log(error);
      }
    },
    toggleLoginRegister() {
        this.$store.dispatch("toggleLoginRegister");
    }
  }
}
</script>

<style scoped>
#login
{
    margin-top: 10%;
    min-width: 100px;
}
#color
{
    animation: fade-in 3s ease;
    background-color: rgba(245, 245, 245, .5) !important;
    border: 1px solid rgba(223, 223, 223, 0.5);
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

.margin-rigtht
{
    margin-right: 50px;
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
}
</style>
