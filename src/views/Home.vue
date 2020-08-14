<template>
  <div class="home">
    <div :class="$style['login-wrapper']">
      <div :class="$style.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  }
}
</script>

<style module>
.login-wrapper {

}

.login-wrapper .image {
  background-image: url('../assets/images/landing.gif');
  background-size: cover;
  height: 80vw;
  margin: 0 auto;
  max-width: 280px;
  max-height: 280px;
  opacity: .75;
  width: 80vw;
}
</style>