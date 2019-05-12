<template>
<div id="register">
  
  <form @submit.prevent="register" id="color" class="fifty pure-form pure-form-aligned">
    <fieldset>
      <h2 v-if="false" class="center">Register for an Account</h2>

      <div class="group">
        <label class="descript" for="name">Real Name</label>
        <input v-model="name" type="text" placeholder="Real Name">
      </div>

      <div class="group">
        <label class="descript" for="username">Username</label>
        <input v-model="username" type="text" placeholder="Username">
      </div>

      <div class="group">
        <label class="descript" for="password">Password</label>
        <input v-model="password" type="password" placeholder="Password">
      </div>

      <div class="group end">
        <button @click="toggleLoginRegister" class="margin-rigtht pure-button">Login Instead</button> 
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
  

  <p v-if="error" class="error">{{error}}</p>
</div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      name: '',
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async register() {
      try {
          console.log("hello");
        this.error = await this.$store.dispatch("register", {
          name: this.name,
          username: this.username,
          password: this.password
        });        
        if (this.error === "")
          this.$router.push('home');
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
#register
{
    margin-top: 10%;
    min-width: 100px;
}
#color
{
    background-color: rgba(245, 245, 245, 0.5) !important;
    border: 1px solid rgba(223, 223, 223, 0.5);
    border-radius: 5px;
    color: #516477;
    animation: fade-in 3s ease;
    padding-top: 20px
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