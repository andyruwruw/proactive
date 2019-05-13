<template>
<div id="item-in-list">
    <h3>{{item.title}}</h3>
    <p>{{item.description}}</p>
</div>
</template>

<script>
export default {
  name: 'item-in-list',
  props:{
      item: Object,
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
.item {
    margin-top: 40px;
    background: blue;
    color: white;
}
</style>
