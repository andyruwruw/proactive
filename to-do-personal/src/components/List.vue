<template>
<div id="list">
  <div class="slide">

    <div v-bind:class="{besmaller: !preferences.mainmenu && !preferences.labels[0]}" id="top-bar">
      <h1 class="fade" >{{mainGroupTitle}}</h1>
        <div v-if="mainmenu && preferences.mainmenu && !noItems" class="small-mainmenu">
          <button v-if="!preferences.openmenus" v-bind:class="{ invertlights: preferences.colors, activeshown : shown == 0}" @mouseover="hover" @click="showFilteredItems(0)" class="small-button showallbutton tooltip"><span v-if="preferences.tooltipsactive && shown != 0" class="tooltiptext">Show All</span></button>
          <button v-if="!preferences.openmenus" v-bind:class="{ invertlights: preferences.colors, activeshown : shown == 2}" @mouseover="hover" @click="showFilteredItems(2)" class="small-button showactivebutton tooltip"><span v-if="preferences.tooltipsactive && shown != 2" class="tooltiptext">Show Active</span></button>
          <button v-if="!preferences.openmenus" v-bind:class="{ invertlights: preferences.colors, activeshown : shown == 1}" @mouseover="hover" @click="showFilteredItems(1)" class="small-button showdonebutton tooltip"><span v-if="preferences.tooltipsactive && shown != 1" class="tooltiptext">Show Done</span></button>
          <button v-if="!preferences.openmenus" v-bind:class="{ invertlights: preferences.colors, activeshown : doneItems, hoveropacity: doneItems}" @mouseover="hover" @click="deleteDone" class="small-button deleteallbutton tooltip"><span v-if="preferences.tooltipsactive" class="tooltiptext">Delete Done</span></button>
        </div>
        <button v-bind:class="{ invertlights: preferences.colors}" v-if="!mainmenu && !preferences.openmenus && !noItems && preferences.mainmenu" @mouseover="hover" @click="openMenu" class="small-button right menu-button"/>
        <button v-bind:class="{ invertlights: preferences.colors}" v-if="mainmenu && !preferences.openmenus && !noItems && preferences.mainmenu" @mouseover="hover" @click="closeMenu" class="small-button right close menu-button"/>
        <div v-if="preferences.openmenus && !noItems&& preferences.mainmenu" class="right small-mainmenu-nobutton">
          <button v-bind:class="{ invertlights: preferences.colors, activeshown : shown == 0}" @click="showFilteredItems(0)" @mouseover="hover" class="small-button showallbutton tooltip"><span v-if="preferences.tooltipsactive && shown != 0" class="tooltiptext">Show All</span></button>
          <button v-bind:class="{ invertlights: preferences.colors, activeshown : shown == 2}" @click="showFilteredItems(2)" @mouseover="hover" class="small-button showactivebutton tooltip"><span v-if="preferences.tooltipsactive && shown != 2" class="tooltiptext">Show Active</span></button>
          <button v-bind:class="{ invertlights: preferences.colors, activeshown : shown == 1}" @click="showFilteredItems(1)" @mouseover="hover" class="small-button showdonebutton tooltip"><span v-if="preferences.tooltipsactive && shown != 1" class="tooltiptext">Show Done</span></button>
          <button v-bind:class="{ invertlights: preferences.colors, activeshown : doneItems, hoveropacity: doneItems}" @mouseover="hover" @click="deleteDone" class="small-button deleteallbutton tooltip"><span  v-if="preferences.tooltipsactive" class="tooltiptext">Delete Done</span></button>
        </div>
    </div>

    <div v-if="preferences.groupsetting == 0" id="items">
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in items" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <div v-if="preferences.groupsetting == 1" id="due-days">
      <div v-if="pastDue.length" class="grouping" id="pastdue">
          <div id="items">
            <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in pastDue" v-bind:key="item._id">
            <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                    <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                    </div>
                    <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                    <div v-if="preferences.openmenus" class="small-menu-nobutton">
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div v-if="dayItems(0).length" class="grouping" id="today">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length)">Today</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in dayItems(0)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="dayItems(1).length" class="grouping" id="tomorrow">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length)">Tomorrow</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in dayItems(1)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dayItems(2).length" class="grouping" id="day2">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length)">{{dayName(2)}}</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in dayItems(2)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dayItems(3).length" class="grouping" id="day3">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length || dayItems(2).length)">{{dayName(3)}}</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in dayItems(3)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dayItems(4).length" class="grouping" id="day4">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length || dayItems(2).length || dayItems(3).length)">{{dayName(4)}}</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in dayItems(4)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dayItems(5).length" class="grouping" id="day4">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length || dayItems(2).length || dayItems(3).length || dayItems(4).length)">{{dayName(5)}}</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in dayItems(5)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dayItems(6).length" class="grouping" id="day6">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length || dayItems(2).length || dayItems(3).length || dayItems(4).length || dayItems(5).length)">{{dayName(6)}}</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in dayItems(6)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="weekItems(1).length" class="grouping" id="day7">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length || dayItems(2).length || dayItems(3).length || dayItems(4).length || dayItems(5).length || dayItems(6).length)">Next Week</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in weekItems(1)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="furtherOutList.length" class="grouping" id="further-out">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length || dayItems(2).length || dayItems(3).length || dayItems(4).length || dayItems(5).length || dayItems(6).length || weekItems(1).length)">Further Out</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in furtherOutList" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="noDue.length" class="grouping" id="no-due">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && (pastDue.length || dayItems(0).length || dayItems(1).length || dayItems(2).length || dayItems(3).length || dayItems(4).length || dayItems(5).length || dayItems(6).length || weekItems(1).length || furtherOutList.length)">No Due Date</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in noDue" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="preferences.groupsetting == 2" id="custom">


      <div v-for="group in preferences.groups" v-bind:key="group.index">
        <div class="grouping" id="group" v-if="groupItems(group.index).length">
          <h1 class="fade title-day-marker" v-if="preferences.labels[0] && groupBefore(group.index)">{{group.name}}</h1>
          <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in groupItems(group.index)" v-bind:key="item._id">
            <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                    <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                    </div>
                    <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                    <div v-if="preferences.openmenus" class="small-menu-nobutton">
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                      <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grouping" id="group" v-if="groupItems(-1).length">
        <h1 class="fade title-day-marker" v-if="preferences.labels[0] && groupBefore(-1)">No Group</h1>
        <div draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)" v-for="item in groupItems(-1)" v-bind:key="item._id">
          <div class="item" v-bind:class="{ itemdone: (item.done && preferences.colors != 1 && preferences.itembackground), lightsoffthree : (preferences.colors == 1 && preferences.itembackground), itemdoneinvert: (item.done && preferences.colors == 1 && preferences.itembackground), nobackground : !preferences.itembackground}">
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
                  <div v-if="item.menu && !preferences.openmenus" class="small-menu">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="!item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button menu-button"/>
                  <button v-bind:class="{ invertlights: preferences.colors}" v-if="item.menu && !preferences.openmenus" @mouseover="hover" @click="toggleItem(item._id)" class="small-button close menu-button"/>
                  <div v-if="preferences.openmenus" class="small-menu-nobutton">
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="view(item._id)" class="small-button view-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="editItem(item._id)" class="small-button edit-button"/>
                    <button v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="deleteItem(item._id)" class="small-button delete-button"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'list',
  data() {
    return {
      menu: [],
      mainmenu: false,
      drag: {},
      shown: 0,
    }
  },
  methods: {
    groupBefore(groupNum)
    {
      if (groupNum != -1)
      {
        for (var i = 0; i < groupNum; i++)
        {
          if (this.groupItems(i).length)
          {
            return true;
          }
        }
        return false;
      }
      else
      {
        for (var i = 0; i < this.preferences.groups.length; i++)
        {
          if (this.groupItems(i).length)
          {
            return true;
          }
        }
        return false;
      }
    },
    groupItems(groupNum)
    {
      var full = this.items;
      console.log(full);
      var groupArray = [];
      for (var i = 0; i < full.length; i++)
      {
        console.log(full[i]);
        if (full[i].group == groupNum)
        {
          console.log("ADDED");
          groupArray.push(full[i]);
        }
      }
      return groupArray;
    },
    dayName(days) {
      var dayNamesList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var today = new Date();
      var dayOfInterest = today.getDate() + days;
      var month = today.getMonth();
      var year = today.getFullYear();
      var theDay = new Date(year, month, dayOfInterest);
      var dayOfWeek = theDay.getDay();
      return dayNamesList[dayOfWeek];
    },
    showFilteredItems(set) {
      if (this.shown != set)
      {
        this.press();
        this.shown = set;
      }
      console.log("shown = " + this.shown);
    },
    deleteDone() {
      console.log("hi");
      this.$store.dispatch("deleteDoneItems");
      this.$store.dispatch("playSound", {sound: 1, volume: 0});
    },
    openMenu() {
      this.mainmenu = true;
      this.press();
    },
    closeMenu() {
      this.mainmenu = false;
      this.press();
    },
    dragItem(item) {
      this.drag = item;
      this.press();
    },
    async dropItem(item) {
      this.$store.dispatch("playSound", {sound: 2, volume: 0});
      console.log("DROP");
      const indexItem = this.items.indexOf(this.drag);
      let indexTarget = this.items.indexOf(item);
      if (indexTarget == -1){
        indexTarget = this.items.length;
      }
      console.log(indexTarget);
      this.items.splice(indexItem,1);
      this.items.splice(indexTarget,0,this.drag);
      for (var i = 0; i < this.items.length; i++)
      {
        await this.$store.dispatch("changeIndex", {index: i, _id: this.items[i]._id});
      }
    },
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
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    filterItems(shown, full) {
      if (shown == 0)
      {
        return full;
      }
      if (shown == 1)
      {
        let stuff = [];
        
        for (var i = 0; i < full.length; i++)
        {
          if (full[i].done)
          {
            stuff.push(full[i]);
          }
        }
        return stuff
      }
      if (shown == 2)
      {
        let stuff = [];
        for (var i = 0; i < full.length; i++)
        {
          if (!full[i].done)
          {
            stuff.push(full[i]);
          }
        }
        return stuff
      }
    },
    dayItems(day)
    {
      var today = new Date();
      var dayOfInterest = today.getDate() + day;
      var month = today.getMonth();
      var year = today.getFullYear();

      var full = this.$store.state.items;
      full = this.filterItems(this.shown, full);

      var dayArray = [];
      for (var i = 0; i < full.length; i++)
      {
        if (full[i].due == null)
        {
          continue;
        }
        var dateIf = new Date(full[i].due);
        if (dayOfInterest === dateIf.getDate() && year === dateIf.getFullYear() && month === dateIf.getMonth())
        {
          dayArray.push(full[i]);
        }
      }
      return dayArray;
    },
    weekItems(week)
    {
      var full = this.$store.state.items;
      full = this.filterItems(this.shown, full);

      var weekArray = [];
      for (var i = 0; i < full.length; i++)
      {
        if (full[i].due == null)
        {
          continue;
        }
        var dateIf = new Date(full[i].due);
        for (var j = 0; j < 7; j++)
        {
          var today = new Date();
          var dayOfInterest = today.getDate() + (week * 7) + j;
          var month = today.getMonth();
          var year = today.getFullYear();
          if (dayOfInterest === dateIf.getDate() && year === dateIf.getFullYear() && month === dateIf.getMonth())
          {
            weekArray.push(full[i]);
            break;
          }
        }
      }
      return weekArray;
    },
  },
  computed: {
    mainGroupTitle() {
      if (this.preferences.labels[0])
      {
        if (this.preferences.groupsetting == 0)
        {
          if (this.noItems)
          {
            return "You have no tasks.";
          }
          else 
          {
            return "Tasks";
          }
        }
        else if (this.preferences.groupsetting == 1)
        {
          if (this.pastDue.length)
          {
            return "Past Due";
          }
          else if (this.dayItems(0).length)
          {
            return "Today";
          }
          else if (this.dayItems(1).length)
          {
            return "Tomorrow";
          }
          else if (this.dayItems(2).length)
          {
            return this.dayName(2);
          }
          else if (this.dayItems(3).length)
          {
            return this.dayName(3);
          }
          else if (this.dayItems(4).length)
          {
            return this.dayName(4);
          }
          else if (this.dayItems(5).length)
          {
            return this.dayName(5);
          }
          else if (this.dayItems(6).length)
          {
            return this.dayName(6);
          }
          else if (this.weekItems(1).length)
          {
            return "Next Week";
          }
          else if (this.furtherOutList.length)
          {
            return "Further Out";
          }
          else if (this.noDue.length)
          {
            return "No Due Date";
          }
          else
          {
            return "You have no tasks.";
          }
        }
        else if (this.preferences.groupsetting == 2)
        {
          if (this.noItems)
          {
            return "You have no tasks.";
          }
          for (var i = 0; i < this.preferences.groups.length; i++)
          {
            if (this.groupItems(i).length)
            {
              return this.preferences.groups[i].name;
            }
          }
          if (this.groupItems(-1).length)
          {
            return "No Group";
          }
        }
      }

    },
    noDue()
    {
      var full = this.items;

      var noDueArray = [];
      for (var i = 0; i < full.length; i++)
      {
        if (full[i].due == null)
        {
          noDueArray.push(full[i]);
        }
      }
      return noDueArray;
    },
    furtherOutList() {
      var today = new Date();
      var dayOfInterest = today.getDate() + (14);
      var month = today.getMonth();
      var year = today.getFullYear();

      var afterDay = new Date(year, month, dayOfInterest);

      var full = this.items;
      
      var furtherOutArray = [];
      for (var i = 0; i < full.length; i++)
      {
        if (full[i].due == null)
        {
          continue;
        }
        var dateIf = new Date(full[i].due);
        if (afterDay.getFullYear() < dateIf.getFullYear())
        {
          furtherOutArray.push(full[i]);
        }
        else if (afterDay.getFullYear() == dateIf.getFullYear() && afterDay.getMonth() < dateIf.getMonth())
        {
          furtherOutArray.push(full[i]);
        }
        else if (afterDay.getFullYear() == dateIf.getFullYear() && afterDay.getMonth() == dateIf.getMonth() && afterDay.getDate() < dateIf.getDate())
        {
          furtherOutArray.push(full[i]);
        }
      }
      return furtherOutArray;

    },
    pastDue() 
    {
      var today = new Date();

      var full = this.items;

      var pastDueArray = [];
      for (var i = 0; i < full.length; i++)
      {
        if (full[i].due == null)
        {
          continue;
        }
        var itemDate = new Date(full[i].due);
        if (today.getFullYear() > itemDate.getFullYear())
        {
          pastDueArray.push(full[i]);
        }
        else if (today.getFullYear() == itemDate.getFullYear() && today.getMonth() > itemDate.getMonth())
        {
          pastDueArray.push(full[i]);
        }
        else if (today.getFullYear() == itemDate.getFullYear() && today.getMonth() == itemDate.getMonth() && today.getDate() > itemDate.getDate())
        {
          pastDueArray.push(full[i]);
        }
      }
      return pastDueArray;
    },
    items()
    {
      console.log("ITEMS");
      var full = this.$store.state.items;
      return this.filterItems(this.shown, full);
    },
    noItems()
    {
      console.log("NO ITEMS");
      if (this.$store.state.items.length == 0)
      return true;
      return false;
    },
    doneItems()
    {
      console.log("DONE ITEMS");
      for (var i = 0; i < this.$store.state.items.length; i++)
      {
        console.log("ITEM " + i);
        console.log(this.$store.state.items[i].done);
        if (this.$store.state.items[i].done)
        {
          return true;
        }
      }
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
    console.log(this.preferences);
  }
}
</script>

<style scoped>
.grouping {
  margin-bottom: 30px;
}
.tooltip {
  position: relative;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555 !important;
  opacity: 1 !important;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1 !important;
}

.activeshown {
  opacity: .5 !important;
  transform: scale(1.3 1.3);
}
#top-bar {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  margin-right: 14px;
  position: relative;
  margin-bottom: 5px;
  position: relative;
}

.besmaller
{
  height: 5px !important;
  margin-bottom: 0px !important;
}
.right {
  position: absolute;
  right: -1px;
}

.deleteallbutton {
  background-image: url("../assets/delete-all.png");
  opacity: .2;
  transition: opacity .2s ease;
}

.hoveropacity:hover {
  opacity: 1 !important;
}

.showallbutton {
  background-image: url("../assets/show-all.png");
  opacity: .2;
  transition: opacity .2s ease;
}
.showallbutton:hover {
  opacity: 1;
}

.showactivebutton {
  background-image: url("../assets/done-no.png");
  opacity: .2;
  transition: opacity .2s ease;
}
.showactivebutton:hover {
  opacity: 1;
}

.showdonebutton {
  background-image: url("../assets/view-complete.png");
  opacity: .2;
  transition: opacity .2s ease;
}
.showdonebutton:hover {
  opacity: 1;
}

.small-mainmenu {
  position: absolute;
  justify-content: space-around;
  display: flex;
  padding: 13px;
  padding-left: 8px;
  width: 150px;
  padding-right: 8px;
  right: 33px;
  animation: menu .5s ease;
  background-color: rgba(202, 202, 202, 0);
  border-radius: 10px;
}

.small-mainmenu-nobutton {
  justify-content: space-around;
  display: flex;
  padding: 13px;
  padding-left: 0px;
  width: 150px;
  padding-right: 0px;
  border-radius: 10px;
  transform: translateX(2px);
}
.small-menu-nobutton {
  justify-content: space-around;
  display: flex;
  padding-left: 0px;
  width: 112px;
  padding-right: 50px;
  border-radius: 10px;
}

#items {
  position: relative;
}

#below {
  position: absolute;
  left: 0px;
  bottom: -75px;
  width: 100%;
  height: 80px;
}
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
  opacity: .2;
  transition: opacity .2s ease;
} 
.menu-button {
  background-image: url("../assets/more.png");
  opacity: .3;
  margin-left: 30px;
  width: 30px;
  height: 30px;
  transition: opacity .2s ease;
}

.edit-button {
  margin-left: 3px;
  background-image: url("../assets/edit.png");
  opacity: .2;
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
  opacity: .2;
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
  cursor: default;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  margin-bottom: 0px
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
  background-color: rgba(248, 248, 248, 0.281) !important;
  border: 1px solid rgba(206, 206, 206, 0) !important;
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

.details {
  cursor: grab;
}


</style>
