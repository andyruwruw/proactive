<template>
<div id="list">
    <item-in-list class="item" v-for="item in items" v-bind:key="item._id" :item="item"/>
</div>
</template>

<script>
import ItemInList from '@/components/List.vue'
export default {
  name: 'list',
  components: {
      ItemInList
  },
  data() {
    return {
    }
  },
  methods: {

  },
  computed: {
    items()
    {
      return this.$store.state.items;
    },
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
