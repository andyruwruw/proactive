<template>
<div id="single-item">
    <h3>SINGLE ITEM</h3>
</div>
</template>

<script>
export default {
  name: 'single-item',
  props:{
      
  },
  data() {
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
  }
}
</script>

<style scoped>
h1{
  margin: 0px;
  font-weight: lighter;
  text-align: center;
  font-size: 150%;
  color: #a0a7ad;
  background: rgba(235, 235, 235, 0.418);
  border: 1px solid rgba(235, 235, 235, 0.664);
  padding: 5px;
  border-radius: 5px;
}
</style>