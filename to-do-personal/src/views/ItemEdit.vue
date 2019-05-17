<template>
<div @click="playMusic" id="new">
    <div v-if="show" id="big-box">
      <div class="main">
        <div v-bind:class="{ inverttitle: preferences.colors}" class="different-width flex-title">
          <div v-bind:class="{ invertlights: preferences.colors}" class="center short-flex">
            <div id="task-image"/>
            <h1 v-if="preferences.labels[2]">Editing Task</h1>
          </div>
        </div>
        <p id="error" v-if="error != ''">{{error}}</p>
        <input class="nomargin input" v-bind:class="{texterror: isError, invertinput: preferences.colors}" type="text" placeholder="Task" v-model="title"/>
        <textarea v-bind:class="{invertinput: preferences.colors}" class="input" id="descript" cols="40" rows="5" placeholder="Description" v-model="description"/>

        <div v-if="preferences.labels[2]" id="buttons-div">
          <button class="button create" @mouseover="hover" @click="updateTask" id="createItem"><div id="create-image"/>Update</button>
          <button class="button create" @mouseover="hover" @click="deleteItem" id="deleteItem"><div id="delete-image"/>Delete</button>
          <button class="button create" @mouseover="hover" @click="back" id="back"><div id="back-image"/>Undo</button>
        </div>
        <div v-if="!preferences.labels[2]" id="buttons-div">
          <button class="button create smaller" @mouseover="hover" @click="updateTask" id="createItem"><div id="create-image"/></button>
          <button class="button create smaller" @mouseover="hover" @click="deleteItem" id="deleteItem"><div id="delete-image"/></button>
          <button class="button create smaller" @mouseover="hover" @click="back" id="back"><div id="back-image"/></button>
        </div>
      </div>
      <div class="side-bar">
        <div id="sub">
          <div class="flex-no-wrap-title">
            <div v-bind:class="{ invertbutton: preferences.colors}" class="flex-title no-margin">
              <div class="short-flex">
                <div v-bind:class="{ invertlights: preferences.colors , alittlemargin : !preferences.labels[2]}" id="sub-image"/>
                <h1 v-if="preferences.labels[2]" v-bind:class="{ invertsub: preferences.colors}">Sub Tasks</h1>
              </div>
              <button v-bind:class="{ invertlights: preferences.colors}" v-if="!addSubtask" @mouseover="hover" @click="startSubtask" class="small-button add-button"></button>
              <button v-bind:class="{ invertlights: preferences.colors}" v-if="addSubtask" @mouseover="hover" @click="deleteSubtask" class="small-button minus-button"></button>
            </div>
            
          </div>
          <div class="fade" v-if="!addSubtask">
            <div id="subtask" v-for="subtask in subitems" v-bind:key="subtask.title">
              <div v-bind:class="{invertinput: preferences.colors}" class="flex-no-wrap fade">
                <div id="subtaskDetails">
                  <p id="subtaskTitle">{{subtask.title}}</p>
                </div>
                <div id="subtaskButtons">
                  <button v-bind:class="{ invertlights: preferences.colors}" class="small-subtask-button" id="edit-subtask" @mouseover="hover" @click="editSubtaskList(subtask.title, subtask.description, subtask.number)"></button>
                  <button v-bind:class="{ invertlights: preferences.colors}" class="small-subtask-button" id="delete-subtask" @mouseover="hover" @click="deleteSubtaskList(subtask.number)"></button>
                </div>
              </div>
            </div>
          </div>
          <div class="fade" id="addSubtaskDiv" v-if="addSubtask">
            <input v-bind:class="{invertinput: preferences.colors}" class="input" id="subTaskInput" type="text" placeholder="Sub-Task" v-model="subtaskInput"/>
            <div id="subbuttons">
              <button class="subButton" @mouseover="hover" @click="createSubtask" id="createItem"><div id="create-image"/>Create</button>
              <button class="subButton" @mouseover="hover" @click="deleteSubtask" id="deleteItem"><div id="delete-image"/>Delete</button>
            </div>
          </div>
        </div>
        <div id="due">
          <div class="flex-no-wrap-title">
            <div v-bind:class="{ invertbutton: preferences.colors}" class="flex-title no-margin">
              <div class="short-flex">
                <div v-bind:class="{ invertlights: preferences.colors , alittlemargin : !preferences.labels[2]}" id="cal-image"/>
                <h1 v-if="preferences.labels[2]" v-bind:class="{ invertsub: preferences.colors}" @click="startDate">Due Date</h1>
              </div>
              <button v-bind:class="{ invertlights: preferences.colors}" v-if="!addDate" @mouseover="hover" @click="startDate" class="small-button add-button"></button>
              <button v-bind:class="{ invertlights: preferences.colors}" v-if="addDate" @mouseover="hover" @click="closeDate" class="small-button minus-button"></button>
            </div>
            
          </div>
          <div class="fade" v-if="dueString != ''">
            <div class="fade" v-if="!addDate" id="dueDiv">
              <p @click="editDate" id="dueString">Due: {{dueString}}</p>
              <div class="buttonsDueDiv">
                <button @mouseover="hover" @click="editDate" class="invert small-button edit-button"></button>
                <button @mouseover="hover" @click="deleteDate" class="invert small-button delete-button"></button>
              </div>
            </div>
          </div>
          <div v-if="addDate" class="fade">
            <div id="calendar-div">
              <div v-bind:class="{invertinput: preferences.colors}" id="month-and-year">{{months[month]}} {{year}}</div>
              <div id="calendar">
                <div class="calendar-row" v-for="row in calendar" v-bind:key="row.num">
                  <div class="calendar-day" @mouseover="hover" @click="setDate(block.Date)" v-bind:class="{active: block.active && !preferences.colors, today: block.today, due: block.due, invertdate: preferences.colors && block.active}" v-for="block in row.blocks" v-bind:key="block.date">{{block.date}}</div>
                </div>
              </div>
              <div id="calendar-buttons">
                <button v-bind:class="{invertbutton: preferences.colors}" class="calendar-button" id="previous" @mouseover="hover" @click="previous">Previous</button>
                <button v-bind:class="{invertbutton: preferences.colors}" class="calendar-button" id="next" @mouseover="hover" @click="next">Next</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    
    </div>
    <div v-else id="loading"></div>
    
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
        dueString: "",
        subitems: [],
        error: '',
        addSubtask: false,
        addDate: false,
        subtaskInput: "",
        subtaskdescription: "",
        month: null,
        year: null,
        calendar: null,
        today: null,
        show: false,
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    }
  },
  methods: {
    async updateTask(){
      if (this.title != "")
      {
        let data = {
          _id: this.$route.params._id,
          title: this.title,
          description: this.description,
          due: this.due,
          subitems: this.subitems,
          group: -1,
          priority: 0,
          index: this.item.index,
        };
        this.title = "";
        this.description = "";
        this.done = false;
        this.subitems = [];
        this.error = '';
        await this.$store.dispatch("updateItem", data);
        this.$store.dispatch("playSound", {sound: 4, volume: 0});
        this.$router.push('/');
      }
      else {
        this.error = "Name your task to save it."
      }
    },
    async deleteItem()
    {
      this.show = 0;
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.title = "";
      this.description = "";
      this.done = false;
      this.subitems = [];
      this.error = '';
      this.$store.dispatch("deleteItem", {_id: this.item._id});
      this.$router.push('/');
    },
    back()
    {
      this.show = 0;
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.title = "";
      this.description = "";
      this.done = false;
      this.subitems = [];
      this.error = '';
      this.$router.push('/');
    },
    startSubtask() {
      this.press();
      this.addSubtask = true;
    },
    deleteSubtask() {
      this.addSubtask = false;
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.subtaskInput = "";
      this.subtaskdescription = "";
    },
    createSubtask() {
      if (this.subtaskInput != "")
      {
        this.$store.dispatch("playSound", {sound: 0, volume: 0});
        let subtask = 
        {
          title: this.subtaskInput, 
          description: this.subtaskdescription,
          done: false,
          number: this.subitems.length,
        };
        this.addSubtask = false;
        this.subtaskInput = "";
        this.subtaskdescription = "";
        this.subitems.push(subtask);
      }
    },
    deleteSubtaskList(number) {
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.subitems.splice(number, 1);
    },
    editSubtaskList(title, descript, number) {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
      this.subtaskInput = title;
      this.subtaskdescription = descript;
      this.subitems.splice(number, 1);
      this.addSubtask = true;
    },
    startDate(){
      this.press();
      this.addDate = true;
    },
    closeDate() {
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.addDate = false;
    },
    setDate(date) {
      if (this.due != null)
      {
        if (date.getDate() == this.due.getDate() && date.getMonth() == this.due.getMonth() && date.getFullYear() == this.due.getFullYear())
        {
          this.due = null;
          this.dueString = "";
          this.$store.dispatch("playSound", {sound: 1, volume: 0});
          this.addDate = false;
          this.displayCalendar();
          return null;
        }
      }
      this.press();
      this.due = date;
      this.addDate = false;
      this.displayCalendar();
      this.dueString = "" + this.due.getDate() + " " + this.months[this.due.getMonth()] + ", " + this.due.getFullYear();
    },
    deleteDate(){
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.due = null,
      this.displayCalendar();
      this.dueString = "";
      this.addDate = false;
    },
    editDate(){
      this.press();
      this.addDate = true;
    },
    hover()
    {
      console.log("Tryingn");
      this.$store.dispatch("playSound", {sound: 3, volume: 0});
    },
    press()
    {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
    },
    displayCalendar() {
      let firstDay = (new Date(this.year, this.month)).getDay();
      this.calendar = [];
      let date = 1;
      for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = {num: i, blocks: []};
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            let cell = {
              text: "",
              active: 0,
              today: 0,
              Date: null,
              due: 0,
              date: null,
            };
            row.blocks.push(cell);
          }
          else if (date > this.daysInMonth(this.month, this.year)) {
            break;
          }
          else {
            let cell = {
              text: "",
              active: 1,
              today: 0,
              date: date,
              due: 0,
              Date: new Date(this.year, this.month, date)
            };
            if (this.due != null)
            {
              if (date === this.due.getDate() && this.year === this.due.getFullYear() && this.month === this.due.getMonth()) {
                cell.due = 1;
              } // color today's date
            }
            if (cell.due != 1 && date === this.today.getDate() && this.year === this.today.getFullYear() && this.month === this.today.getMonth()) {
              cell.today = 1;
            } // color today's date
            row.blocks.push(cell);
            date++;
          }
        }
        this.calendar.push(row); // appending each row into calendar body.
      }
    },
    daysInMonth() 
    { 
      let start = 32;
      let num = start - new Date(this.year, this.month, 32).getDate();
      return num;
    },
    createCalendar() {
      this.today = new Date();
      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();
      this.displayCalendar();
    },
    next() {
      this.press();
      this.year = (this.month === 11) ? this.year + 1 : this.year;
      this.month = (this.month + 1) % 12;
      this.displayCalendar();
    },
    previous() {
      this.press();
      this.year = (this.month === 0) ? this.year - 1 : this.year;
      this.month = (this.month === 0) ? 11 : this.month - 1;
      this.displayCalendar();
    },
    playMusic()
    {
      this.$store.dispatch("playMusic");
    }
  },
  computed: {
    isError(){
      if (this.error != "" && this.title == "")
      {
        return true;
      }
      return false;
    },
    item() {
      return this.$store.state.item;
    },
    index()
    {
      return this.$store.state.items.length;
    },
    preferences() {
      return this.$store.state.preferences;
    }
  },
  async created() {
    
    await this.$store.dispatch("getItem", {_id: this.$route.params._id});
    this.title = this.item.title;
    this.description = this.item.description;
    this.done = this.item.done;
    
    if (this.due != null)
    {
      this.due = new Date(this.item.due);
      this.dueString = "" + this.due.getDate() + " " + this.months[this.due.getMonth()] + ", " + this.due.getFullYear();
    }
    this.subitems = this.item.subitems;
    if (this.preferences.colors == 1)
      {
        this.$store.dispatch("updatePreferences", {tag: "colors", set: 1});
        let changes = [
          {id: "background", class: "lights-off-one"},
          {id: "app", class: "lights-off-two"},
          {id: "maintitle", class: "inverttext6"},
          {id: "home", class: "invertlights"},
          {id: "settings", class: "invertlights"},
        ];

        for (var i = 0; i < changes.length; i++)
        {
          var element = document.getElementById(changes[i].id);
          element.classList.add(changes[i].class);
        }
      }
      else 
      {
        this.$store.dispatch("updatePreferences", {tag: "colors", set: 0});

        let changes = [
          {id: "background", class: "lights-off-one"},
          {id: "app", class: "lights-off-two"},
          {id: "maintitle", class: "inverttext6"},
          {id: "home", class: "invertlights"},
          {id: "settings", class: "invertlights"},
        ];
        for (var i = 0; i < changes.length; i++)
        {
          var element = document.getElementById(changes[i].id);
          if (element.classList.contains(changes[i].class))
          {
            element.classList.remove(changes[i].class)
          }
        }

      }
    this.show = true;
    this.createCalendar();
  }
}
</script>

<style scoped>
.alittlemargin {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
.invertbutton {
  background-color: rgb(67, 71, 75) !important;
  border: 1px solid rgb(44, 44, 44) !important;
  color: rgb(146, 146, 146) !important;
}

.invertsub {
  color: rgb(216, 216, 216) !important;
}
.inverttitle {
  background-color: rgb(67, 71, 75) !important;
  border: 1px solid rgb(44, 44, 44) !important;
}
.invertinput {
  background-color: rgb(49, 51, 54) !important;
  border: 1px solid rgb(44, 44, 44) !important;
  color: rgb(146, 146, 146) !important;
}
.invertdate {
  background-color: rgb(49, 51, 54) !important;
  border: 1px solid rgb(44, 44, 44) !important;
  color: rgb(146, 146, 146);
}

.invertdate:hover {
  background-color: rgb(130, 224, 113) !important;
  color: black !important;
}


.different-width {
  width: 88% !important;
}
.short-flex {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.center{
  margin: 0 auto !important;
}
#loading{
  display: block;
  background-image: url("../assets/loading.png");
  background-size: cover;
  animation: rotate 1s linear;
  animation-iteration-count: infinite;
  width: 50px;
  height:50px;
  opacity: .8;
  margin: 0 auto;
  margin-top: 20%;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(1, 1);
    
  }
  50% {
    transform: rotate(180deg) scale(.8, .8);
  }
  100% {
    transform: rotate(360deg) scale(1, 1);
  }
}

#big-box {
  display: flex;
  width: 85%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-around;
}

.calendar-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  margin: 0 auto;
  width: 235px;
}
.calendar-day {
  display: block;
  width: 23px;
  height: 23px;
  cursor: default;
  margin: 5px;
  border-radius: 10px;
  transition: color .2s ease, background-color .2s ease;
}
.active:hover {
  background-color: rgb(130, 224, 113) !important;
  color: black !important;
}
#calendar-div {
  display: block;
  min-width: 230px;
  width: 80%;
  margin: 0 auto;
}

#calendar-buttons {
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-bottom: 30px;
}
.calendar-button {
  width: 47%;
  border-radius: 5px;
  padding: 1px;
  color: rgb(104, 104, 104);
  border: 0px;
}

#month-and-year {
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
  cursor: default;
}

#next {
  background-color: rgba(238, 237, 237, 0.664);
}
#previous {
  background-color: rgba(238, 237, 237, 0.664);
}


.active {
  background-color: rgb(212, 225, 241);
  border: 0px !important;
  color: white !important;
}
.today {
  background-color: rgb(44, 137, 243) !important;
  border: 0px !important;
  color: white;
} 
#dueDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(101, 199, 83);
  width: 80%;
  margin: 0 auto;
  margin-top: 0px;
  margin-bottom: 10px;
  border-radius: 13px;
  padding: 3px;
}
#buttonsDueDiv{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 73px;
}

#dueString {
  color: white;
  margin-left: 5px;
  cursor: default;
}

.due {
  background-color: rgb(65, 216, 34) !important;
  border: 0px !important;
  color: white;
}

.main {
  display: block;
  width: 60%;
  min-width: 300px;
}

.side-bar {
  display: block;
  width: 40%;
  min-width: 235px;
}
#sub
{
  margin-bottom: 30px;
}
#subTaskInput {
  margin-top: 20px;
  margin-bottom: 20px;
}

#subTaskDescInput {
  margin-bottom: 10px;
}

.subButton {
  max-width: 100px !important;
      margin: 0 auto;
    margin-bottom: 15px;
    background-color : rgba(238, 237, 237, 0.664);
    border: 0px solid black;
    color: rgb(104, 104, 104);
    padding: 7px;
    border-radius: 5px;
    width: 40%;
    cursor: pointer;
    transition: background-color .2s ease, color .2s ease;

      display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px !important;
  width: 45% !important;
}

#subbuttons {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}

#subtaskTitle {
  margin-top: 0px;
  text-align: left;
  cursor: default;
}


.flex-no-wrap {
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding-left: 10px;
  width: 75%;
  padding-right: 10px;
  background-color: rgba(241, 241, 241, 0.637);
  border-radius: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
}

#subtaskButtons {
  display: flex;
  justify-content: space-around;
  min-width: 60px;
}

.flex-no-wrap-title {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}





#error {
  color: red;
  margin: 0 auto;
  margin-top: 0px;
  margin-bottom: 5px;
}
#new{
    position: relative;
    display: block;
    animation: slide-up 2s ease;
}
.fade {
  animation: fade-in 2s ease;
}

#addSubtaskDiv {
  width: 80%;
  margin: 0 auto;
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
.no-margin {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
h1{
  margin: 0px;
  font-weight: lighter;
  text-align: center;
  font-size: 120%;
  color: #474a4d;
cursor: default;
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

.small-button {
    border: 0px solid black;
    padding: 7px;
    margin-right: 8px;
    border-radius: 20px;
    width: 25px;
    height: 25px;
    background-color: rgba(0,0,0,0);
    opacity: .5;
    cursor: pointer;
    transition: opacity .2s ease, color .2s ease;
    background-size: cover;
}

.small-button:hover {
    opacity: 1;
}

.add-button {
  background-image: url("../assets/plus.png");
}
.minus-button {
  background-image: url("../assets/minus.png");
}
.edit-button {
  background-image: url("../assets/calendar.png");
  margin-left: 0px;
  opacity: .8;
}
.delete-button {
  background-image: url("../assets/delete.png");
  margin-left: 0px;
  opacity: .8;
}
.invert {
  filter: invert(100%);
}

.create{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px !important;
  width: 28% !important;
  max-width: 150px;
  min-width: 120px !important;
}

.smaller {
  max-width: 100px !important;
  min-width: 100px !important;
  padding-left: 20px !important;
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

#back {
  background-color: rgb(65, 216, 34);
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

#back-image {
    background-image: url("../assets/undo.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    filter: invert(100%);
    margin-right: 10px;
}

#delete-subtask {
  background-image: url("../assets/delete.png");
  background-size: cover;
}

#edit-subtask {
  background-image: url("../assets/item.png");
  background-size: cover;
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

#cal-image {
  background-image: url("../assets/calendar.png");
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
    margin-bottom: 5px;
    margin-top: 5px;
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
  justify-content: space-between; 
  border-radius: 5px;
  width: 80%;
  min-width: 170px;
  margin: 0 auto;
  margin-bottom: 15px;
  background-color: rgb(228, 239, 255);
  border: 1px solid rgba(230, 228, 228, 0.664);
}

.small-subtask-button {
  display: block;
  width: 25px;
  height: 25px;
  background: rgba(0,0,0,0);
  border-radius: 5px;
  border: 0px;
}

</style>
