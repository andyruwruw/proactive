<template>
<div id="itemview">
    <div class="slide" id="big-box">
      <div v-bind:class="{invertinput: preferences.colors}" id="big-box-two">
        <div class="main">
          <h1 v-bind:class="{invertlights: preferences.colors}" id="title">{{title}}</h1>
          <h1 v-bind:class="{invertlights: preferences.colors}" id="description">{{description}}</h1>
          
          <div v-if="subitems.length != 0" id="sub">
            <h1 v-bind:class="{invertlights: preferences.colors}" v-if="preferences.labels[1]" id="subtitle">Sub Tasks</h1>
            <div class="subtask" v-for="subtask in subitems" v-bind:key="subtask.title">
              <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" v-on:click="endsubtask(subtask.title)" class="small-button-done done-button"/>
              <p v-bind:class="{invertlights: preferences.colors}" id="subtaskTitle">{{subtask.title}}</p>
            </div>
          </div>
          
        </div>
        <div v-if="due != null" class="side-bar">
            <h1 id="dueString">Due: {{dueString}}</h1>
        </div>
      </div>
    </div>
    <div v-bind:class="{invertlights: preferences.colors}" v-if="preferences.labels[1]" class="slide flex-buttons-bottom">
      <button class="button create" @mouseover="hover" @click="editItem" id="createItem"><div class="hoverInvert" id="create-image"/>Edit</button>
      <button class="button create" @mouseover="hover" @click="deleteItem" id="deleteItem"><div class="hoverInvert" id="delete-image"/>Delete</button>
      <button class="button create" @mouseover="hover" @click="back" id="back"><div class="hoverInvert" id="back-image"/>Back</button>
    </div>
    <div v-bind:class="{invertlights: preferences.colors}" v-if="!preferences.labels[1]" class="slide flex-buttons-bottom">
      <button class="button create" @mouseover="hover" @click="editItem" id="createItem"><div class="hoverInvert labelless" id="create-image"/></button>
      <button class="button create" @mouseover="hover" @click="deleteItem" id="deleteItem"><div class="hoverInvert labelless" id="delete-image"/></button>
      <button class="button create" @mouseover="hover" @click="back" id="back"><div class="hoverInvert labelless" id="back-image"/></button>
    </div>
    
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'itemview',
  data() {
    return {
        title: "",
        description: "",
        done: false,
        due: null,
        dueString: "",
        subitems: [],
        month: null,
        year: null,
        calendar: null,
        today: null,
        show: false,
        menu: false,
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    }
  },
  methods: {
    toggleMenu() {
      this.press();
      if (this.menu)
      this.menu = false;
      else
      this.menu = true;
    },
    async endsubtask(title) {
      for (var i = 0; i < this.subitems.length; i++)
      {
        if (this.subitems[i].title == title)
        {
          this.subitems.splice(i, 1);
          break;
        }
      }
      let data = {
          _id: this.$route.params._id,
          title: this.title,
          description: this.description,
          due: this.due,
          subitems: this.subitems
        };
        await this.$store.dispatch("updateItem", data);
        this.$store.dispatch("playSound", {sound: 2, volume: 0});
    },
    editItem() {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
      this.$router.push('/edit/' + this.$route.params._id);
    },
    async deleteItem()
    {
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      await this.$store.dispatch("deleteItem", {_id: this.item._id});
      this.$router.push('/');
    },
    back()
    {
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.$router.push('/');
    },
    
    startDate(){
      this.press();
      this.addDate = true;
    },
    closeDate() {
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
      this.addDate = false;
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
    playMusic()
    {
      this.$store.dispatch("playMusic");
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
  },
  computed: {
    item() {
      return this.$store.state.item;
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
    this.createCalendar();
  }
}
</script>

<style scoped>
p{
  margin: 0px;
}
.small-button-done {
  display: block;
  width: 15px;
  height: 15px;
  margin-left: 6px;
  background-size: cover;
  background-color: rgba(104, 186, 253, 0);
  border: 0px;
}
.done-button {
  background-image: url("../assets/done-no.png");
  border-radius: 3px;
  opacity: .5;
  transition: background-color .2s ease;
}
.done-button:hover {
  background-color: rgba(104, 186, 253, 0.274);
}
.undone-button {
  background-image: url("../assets/done.png");
  opacity: .5;
}
.undone-button:hover {
  background-color: rgba(104, 186, 253, 0.274);
}
.subtask {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: left;
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
.labelless
{
  margin-right: 0px !important;
}
.flex-buttons-bottom{
  width: 70%;
  margin: 0 auto;
  display: flex;
  margin-top: 30px;
}
#subtitle {
  color: rgb(168, 168, 168);
}
#subtaskTitle {
  margin-top: 0px;
  margin-left: 5px;
  text-align: left;
  color: rgba(167, 167, 167, 0.829);
}
.fade {
  animation: fade-in 2s ease;
}
.slide {
  animation: slide-up 2s ease;
}
.main {
  display: block;
  width: 65%;
  min-width: 300px;
  position: relative;
}

.side-bar {
  display: block;
  width: 30%;
}

h1 {
  text-align: left !important;
  margin: 0px;
}
#title {
  font-size: 150%;
}

#description {
  color: rgba(124, 124, 124, 0.863);
}

#menuButton
{
  width: 35px;
  height: 35px;
  background-size: cover;
  background-image: url("../assets/more.png");
  border: 0px solid black;
  background-color: rgba(0,0,0,0);
}

#menu{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  padding: 10px;
  border-radius: 100px;
  position: absolute;
  left: 42px;
  top: -83px;
  opacity: .75;
  transition: background .2s ease 0s, opacity .2s ease 0s;
  cursor: pointer;
}

#menu:hover{
  background: rgb(179, 215, 236);
  opacity: 1;
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
  justify-content: center;

  position: relative;
  
}

#big-box-two {
  display: flex;
  width: 85%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  background: rgba(238, 238, 238, 0.37);
  position: relative;
  
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
  margin: 5px;
  border-radius: 10px;
  transition: color .2s ease, background-color .2s ease;
}
.calendar-day:hover {
  background-color: rgb(130, 224, 113) !important;
  color: black;
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
  justify-content: center;
  align-items: center;
  width: 73px;
}

#dueString {
  color: rgb(92, 92, 92);
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: right !important;
}

.due {
  background-color: rgb(65, 216, 34) !important;
  border: 0px !important;
  color: white;
}


#sub
{
  margin-top: 10px;
  margin-bottom: 20px;
}
#subTaskInput {
  margin-top: 0px;
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
    background-color: rgb(34, 34, 34);
    border: 0px solid black;
    color: rgb(224, 224, 224);
    padding: 7px;
    border-radius: 5px;
    width: 120px;
    cursor: pointer;
    transition: background-color .2s ease, color .2s ease, color .2s ease;
}

.create{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px !important;
}

.button:hover{
    background-color : rgb(206, 232, 247) !important;
    color: rgb(19, 19, 19) !important;
    
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

.hoverInvert {
  filter: invert(50%) !important;

}

.hoverInvert:hover {
  filter: invert(50%) !important;
}


#create-image {
    background-image: url("../assets/edit.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    margin-right: 10px;
}

#back-image {
    background-image: url("../assets/undo.png");
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
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
