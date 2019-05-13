<template>
<div id="list">
  <h1 v-if="noItems">You have no tasks.</h1>
  <h1 v-else>Your Tasks</h1>
  <div class="item" v-for="item in items" v-bind:key="item._id">
    <li class="itemTitle">{{item.title}}</li>
    <p class="itemDescription">{{item.description}}</p>
  </div>
  <div @click="createItem" id="new"><button id="addTask"/>New Task</div>
</div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
    }
  },
  methods: {
    createItem()
    {
      this.$router.push('new');
    },
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
    items()
    {
      return this.$store.state.items;
    },
    noItems()
    {
      if (this.$store.state.items.length == 0)
      return true;
      return false;
    },
  }
}
</script>

<style scoped>
#list{
  position: relative;
}
h1{
  margin: 0px;
  font-weight: lighter;
  text-align: left;
  font-size: 120%;
  color: #a0a7ad;

  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px
}
.item {
    margin-bottom: 15px;
    color: white;
}
#addTask
{
  width: 35px;
  height: 35px;
  background-size: cover;
  background-image: url("../assets/new.png");
  border: 0px solid black;
  background-color: rgba(0,0,0,0);
}

.row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#new{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 150px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 100px;
  position: absolute;
  left: 0px;

  background: rgba(223, 222, 222, 0.651);
  transition: background .2s ease 0s;
  cursor: pointer;
}
#new:hover{
  background: rgb(179, 215, 236);
}
.itemDescription
{
  text-align: left;
  color: rgba(88, 88, 88, 0.418);
  margin: 0px;
  margin-left: 40px;
}
.itemTitle{
  text-align: left;
  color: rgba(46, 46, 46, 0.678);
  margin: 0px;
  margin-bottom: 2px;
  list-style-type: circle;
}
</style>
