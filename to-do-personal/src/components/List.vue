<template>
<div id="list">
  <div class="slide">
    <h1 class="fade" v-if="noItems && preferences.labels[0]">You have no tasks.</h1>
    <h1 class="fade" v-if="!noItems && preferences.labels[0]">TASKS</h1>
    <div v-for="item in items" v-bind:key="item._id">
      <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1), lightsoffthree : preferences.colors == 1, itemdoneinvert: (item.done && preferences.colors == 1)}">
        <div class="flex-nowrap">
          <div class="doneButton">
            <button v-if="!item.done" v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="done(item._id)" class="small-button done-button"/>
            <button v-if="item.done" v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="undone(item._id)" class="small-button undone-button"/>
          </div>
          <div class="details">
            <p @click="view(item._id)" v-bind:class="{ crossedOutInvert: (item.done && preferences.colors == 1) ,crossedOut: (item.done && preferences.colors != 1) , inverttext1 : preferences.colors == 1}" class="itemTitle">{{item.title}}</p>
            <p @click="view(item._id)" v-bind:class="{ crossedOutDescInvert: (item.done && preferences.colors == 1)  ,crossedOutDesc: (item.done && preferences.colors != 1)  , inverttext2 : preferences.colors == 1 }" class="itemDescription">{{item.description}}</p>
          </div>
          <div class="task-buttons">
            <div class="relative">
              <div v-if="item.menu" class="small-menu">
                <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
              </div>
              <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
              <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      menu: []
    }
  },
  methods: {
    toggleItem(id) {
      this.press();
      this.$store.dispatch("toggleMenu", {_id: id});
    },
    createItem()
    {
      this.press();
      this.$router.push('new');
    },
    hover()
    {
      this.$store.dispatch("playSound", {sound: 3, volume: 0});
    },
    press()
    {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
    },
    done(id)
    {
      this.$store.dispatch("playSound", {sound: 2, volume: 0});
      this.$store.dispatch("done", {id: id});
    },
    undone(id)
    {
      this.$store.dispatch("playSound", {sound: 2, volume: 0});
      this.$store.dispatch("undone", {id: id});
    },
    editItem(_id) {
      this.press();
      this.$router.push('/edit/' + _id);
    },
    deleteItem(_id) {
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.$store.dispatch("deleteItem", {_id: _id});
    },
    view(_id) {
      this.press();
      this.$router.push('/view/' + _id);
    }
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
    preferences() {
      return this.$store.state.preferences;
    }
  },
  created() {
    for (var i = 0; i < this.menu; i++) {
      menu.push({_id: items[i]._id, open: 0});
    }
  }
}
</script>

<style scoped>
@keyframes menu {
  0% {
    opacity: 0;
    transform: translateX(65px) scale(1, 1);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1, 1);
  }
}
.close {
  background-image: url("../assets/minimize.png") !important;
}

.small-menu {
  position: absolute;
  justify-content: space-around;
  display: flex;
  padding: 13px;
  padding-left: 8px;
  width: 112px;
  padding-right: 8px;
  left: -100px;
  animation: menu .5s ease;
  background-color: rgba(202, 202, 202, 0);
  border-radius: 10px;
}
.relative {
  display: flex;
  align-items: center;
  position: relative;
}
.crossedOut{
  text-decoration: line-through;
  color: rgba(31, 31, 31, 0.185) !important;
}
.crossedOutDesc{
  text-decoration: line-through;
  color: rgba(126, 126, 126, 0.151) !important;
}
.crossedOutInvert{
  text-decoration: line-through;
  color: rgba(211, 211, 211, 0.185) !important;
}
.crossedOutDescInvert{
  text-decoration: line-through;
  color: rgba(161, 161, 161, 0.151) !important;
}
.itemDescription
{
  text-align: left;
  color: rgba(88, 88, 88, 0.274);
  margin: 0px;
  margin-left:10px;
  transition: color .4s ease;
}
.itemTitle{
  text-align: left;
  color: rgba(31, 31, 31, 0.767);
  margin: 0px;
  margin-bottom: 2px;
  margin-left:10px;
  transition: color .4s ease;
}
.flex-nowrap {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

}
.small-button {
  display: block;
  width: 25px;
  height: 25px;
  padding: 0px;
  background-size: cover;
  background-color: rgba(104, 186, 253, 0);
  border: 0px;
  
}
.done-button {
  background-image: url("../assets/done-no.png");
  border-radius: 3px;
  transition: background-color .2s ease;
  margin-top: 0px;
}
.done-button:hover {
  background-color: rgba(104, 186, 253, 0.274);
}
.undone-button {
  background-image: url("../assets/done.png");
  margin-top: 0px;
}
.undone-button:hover {
  background-color: rgba(104, 186, 253, 0.274);
}
.view-button {
  background-image: url("../assets/zoom-in.png");
  opacity: .5;
  transition: opacity .2s ease;
} 
.menu-button {
  background-image: url("../assets/more.png");
  opacity: .5;
  margin-left: 30px;
  width: 30px;
  height: 30px;
  transition: opacity .2s ease;
}

.edit-button {
  margin-left: 3px;
  background-image: url("../assets/edit.png");
  opacity: .5;
  transition: opacity .2s ease;
}
.view-button:hover {
  opacity: 1;
} 
.edit-button:hover {
  opacity: 1;
}
.delete-button {
  background-image: url("../assets/delete.png");
  opacity: .5;
  transition: opacity .2s ease;
}
.delete-button:hover {
  opacity: 1;
}
.menu-button:hover {
  opacity: 1;
}
.slide{
  animation: slide-up 2s ease;
}
.task-buttons {
  display: flex;
  flex-wrap: nowrap;
  margin-left: auto;
  align-items: center;
  justify-content: space-around;
  width: 75px;
}

.fade{
  animation: fade-in 2s ease;
}

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
    padding: 5px;
    border-radius: 5px;
    background-color: rgba(238, 238, 238, 0.24);
    border: 1px solid rgba(238, 238, 238, 0.404);
    color: white;
    transition: background-color .4s ease;

}
.itemdone
{
  background-color: rgba(206, 206, 206, 0.281) !important;
  border: 1px solid rgba(206, 206, 206, 0.281) !important;
}

.itemdoneinvert {
  background-color: rgba(44, 44, 44, 0.062) !important;
  border: 0px solid rgba(48, 48, 48, 0.11) !important;
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

  margin: 0 auto;
  padding: 10px;
  border-radius: 100px;
  position: absolute;
  left: 15px;
  top: -82px;
  opacity: .75;
  transition: background .2s ease 0s, opacity .2s ease 0s;
  cursor: pointer;
}

#new:hover{
  background: rgb(179, 215, 236);
  opacity: 1;
}

</style>
