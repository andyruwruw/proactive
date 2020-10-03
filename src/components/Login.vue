<template>
  <div :class="$style.component">
    <h1>
      Login to your Account
    </h1>

    <v-text-field
      v-model="username"
      placeholder="Username"
      solo />

    <v-text-field
      v-model="password"
      placeholder="Password"
      :type="showPass ? 'text' : 'password'"
      solo />

    <div :class="$style.actions">
      <v-btn
        outlined
        @click="register">
        Register Instead
      </v-btn>

      <v-btn
        color="#186FC0"
        dark
        @click="login({ username, password })">
        Submit
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    showPass: false,
    username: '',
    password: '',
  }),
  methods: {
    ...mapActions('user', [
      'login',
    ]),
    register() {
      this.$emit('change');
    },
  },
};
</script>

<style module>
.component {
  width: 95%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 4%;
  padding: 20px;
}

.component h1 {
  font-weight: lighter;
  font-size: 24px;
  text-align: center;
  padding: 20px 0;
}

.actions {
  display: flex;
  justify-content: space-around;
}
</style>