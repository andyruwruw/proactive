<template>
<div id="new">
    <div id="big-box">
    <div class="main">
      <div class="flex-title">
        <div id="task-image"/>
        <h1>Task Details</h1>
      </div>
      <p id="error" v-if="error != ''">{{error}}</p>
      <input class="nomargin input" v-bind:class="{texterror: isError}" type="text" placeholder="Task" v-model="title"/>
      <textarea class="input" id="descript" cols="40" rows="5" placeholder="Description" v-model="description"/>

      <div id="buttons-div">
        <button class="button create" @click="createTask" id="createItem"><div id="create-image"/>Create Task</button>
        <button class="button create" @click="deleteNew" id="deleteItem"><div id="delete-image"/>Delete</button>
      </div>
    </div>
    <div class="side-bar">
      <div id="sub">
        <div class="flex-title">
          <div id="sub-image"/>
          <h1>Sub Tasks</h1>
        </div>
        <button v-if="!addSubtask" @click="startSubtask" class="button">Add Sub-Task</button>
        <div v-if="addSubtask">
        <input class="nomargin input" type="text" placeholder="Sub-Task" v-model="subtask"/>
        </div>
      </div>
      <div id="due">
        <div class="flex-title">
          <div id="due-image"/>
          <h1>Due Date</h1>
        </div>
        <button class="button" >Set Due Date</button>
      </div>
    </div>
    
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'new',
  data() {
    return {
        title: "",
        description: "",
        done: false,
        due: null,
        subitems: [],
        error: '',
        addSubtask: false,
        subtask: "",
    }
  },
  methods: {
      async createTask(){
        if (this.title != "")
        {
          let data = {
            title: this.title,
            description: this.description,
            due: this.due,
            subitems: this.subitems
          };
          this.title = "";
          this.description = "";
          this.done = false;
          this.done = null;
          this.subitems = [];
          this.error = '';
          this.$store.dispatch("changeLeftMenu", {status: 0});
          await this.$store.dispatch("postItem", data);
          this.$store.dispatch("playSound", {sound: 4, volume: 0});
          this.$router.push('/');
        }
        else {
          this.error = "Name your task to save it."
        }
      },
      deleteNew()
      {
        this.$store.dispatch("playSound", {sound: 1, volume: 0});
        this.title = "";
        this.description = "";
        this.done = false;
        this.done = null;
        this.subitems = [];
        this.error = '';
        this.$router.push('/');
      },
      startSubtask() {
        this.press();
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
    isError(){
      if (this.error != "" && this.title == "")
      {
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>
#big-box {
  display: flex;
  width: 75%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-around;
}

.main {
  display: block;
  width: 60%;
  min-width: 300px;
}

.side-bar {
  display: block;
  width: 40%;
}











#error {
  color: red;
  margin: 0 auto;
  margin-top: 0px;
  margin-bottom: 0px;
}
#new{
    position: relative;
    display: block;
    animation: slide-up 2s ease;
}

#delete{
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    background-image: url("../assets/delete.png");
    position: absolute;
    left: 85%;
    top: 8px;
    opacity: .5;
    border: 0px;
    transition: width .2s ease, height .2s ease, opacity .2s ease, left .2s ease;
}
#delete:hover{
    width: 22px;
    height: 22px;
    opacity: .85;
    left: 84.7%;
}
h1{
  margin: 0px;
  font-weight: lighter;
  text-align: center;
  font-size: 120%;
  color: #474a4d;

  padding: 5px;
  border-radius: 5px;
}
.item {
    margin-top: 40px;
    background: blue;
    color: white;
}
.input {
    margin-top: 15px;
    background-color: rgba(238, 237, 237, 0.664);
    border: 0px solid black;
    padding: 7px;
    border-radius: 5px;
    width: 85%;
    transition: background-color .7s ease;
}
.input:focus{
    background-color: rgba(185, 218, 238, 0.664);
}
.texterror {
  background-color: rgba(238, 185, 185, 0.664) !important;
}
.button{
    margin: 0 auto;
    margin-bottom: 15px;
    background-color : rgba(238, 237, 237, 0.664);
    border: 0px solid black;
    color: rgb(104, 104, 104);
    padding: 7px;
    border-radius: 5px;
    width: 40%;
    min-width: 150px;
    max-width: 200px;
    cursor: pointer;
    transition: background-color .2s ease, color .2s ease;
}
.button:hover{
    background-color : rgb(179, 215, 236);
    color: rgb(19, 19, 19);
}
.create{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px !important;
  width: 45% !important;
  max-width: 250px;
}

#descript
{
    height: 100px;
}

#buttons-div {
  display: flex;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: space-between;
  width: 95%;
  flex-wrap: wrap;
}
#createItem {
    background-color: rgb(75, 152, 241);
    transition: background-color .3s ease;
    color: white;
}

#createItem:hover {
    background-color: rgb(93, 169, 255);
}

#deleteItem {
    background-color: rgb(226, 70, 70);
    transition: background-color .3s ease;
    color: white;
}

#deleteItem:hover {
    background-color: rgb(255, 89, 89);
}

#create-image {
    background-image: url("../assets/create.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    filter: invert(100%);
    margin-right: 10px;
}

#delete-image {
    background-image: url("../assets/delete.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    filter: invert(100%);
    margin-right: 10px;
}

#sub-image {
    background-image: url("../assets/subitems.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    margin-right: 10px;
}

.nomargin {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

#task-image {
    background-image: url("../assets/TO-DO.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    margin-right: 10px;
}

#due-image {
    background-image: url("../assets/calendar.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    margin-right: 10px;
}

.flex-title {
  display: flex;
  align-items: center;
  justify-content: center; 
  border-radius: 5px;
  width: 50%;
  min-width: 175px;
  margin: 0 auto;
  margin-bottom: 15px;
  background-color: rgb(228, 239, 255);
  border: 1px solid rgba(230, 228, 228, 0.664);
}

</style>
