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

    }
  },
  methods: {
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

  },
}
</script>

<style scoped>

</style>