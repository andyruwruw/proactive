<template>
  <div>
    <div
      v-if="state === 0"
      :class="$style['landing-wrapper']">
      <div :class="$style.image" />

      <div :class="$style['landing-action']">
        <v-btn
          color="#186FC0"
          :class="$style.button"
          x-large
          rounded
          dark
          @click="changeState(2)">
          Login to Start
        </v-btn>
      </div>
    </div>

    <login
      v-if="state === 1"
      @change="changeState(2)" />

    <register
      v-if="state === 2"
      @change="changeState(1)" />
  </div>
</template>

<script>
import Login from '@/components/Login';
import Register from '@/components/Register';

export default {
  name: 'Landing',
  components: {
    Login,
    Register,
  },
  data: () => ({
    state: 0,
  }),
  methods: {
    changeState(val) {
      this.state = val;
    }
  },
};
</script>

<style module>
.landing-wrapper {
  margin-top: 7%;
}

.landing-wrapper .image {
  background-image: url('../assets/images/landing.gif');
  background-size: cover;
  height: 80vw;
  margin: 0 auto;
  max-width: 280px;
  max-height: 280px;
  opacity: .75;
  width: 80vw;
}

.landing-action {
  display: flex;
  justify-content: center;
}

.landing-wrapper .landing-action .button {
  display: block;
  margin-top: 34px;
}
</style>