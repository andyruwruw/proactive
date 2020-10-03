<template>
  <button :class="[$style['nav-button'], $style[image]]" />
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    image: {
      type: String,
      default: 'home',
    },
    callback: {
      type: Function,
      default: () => (null),
    },
  },
};
</script>

<style module>
.nav-button {
  width: 35px;
  height: 35px;
  margin: 15px 17px;
  background-size: 100% 100%;
  background-position: center center;
  opacity: .75;
}

.nav-button:hover {
  opacity: 1;
}

.nav-button.home {
  background-image: url('../assets/icons/home.svg');
}

.nav-button.settings {
  background-image: url('../assets/icons/settings.svg');
}
</style>