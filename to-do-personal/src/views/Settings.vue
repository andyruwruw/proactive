<template>
  <div class="settings">
    
    <div v-if="!user" id="login-div">
      <login v-if="loginorregister"/>
      <register v-else/>
    </div>
    <div class="slide main" v-else>
      <div id="main-flex">
      <h1 v-bind:class="{ invertlights: preferences.colors}" >SETTINGS</h1>
      </div>
      <div class="added-margin">
        <div class="flex-title">
          <div v-bind:class="{ invertlights: preferences.colors}" class="image" id="account"/>
          <h2 v-bind:class="{ invertlights: preferences.colors}" >Account</h2>
        </div>
        <div class="buttons-div">
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="logout" class="button image" id="logout"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Logout</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!editUser" @mouseover="hover" @click="changeUserName" class="button image" id="username"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="editUser" @mouseover="hover" @click="saveUserName" class="button image" id="password-done"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="editUser" @mouseover="hover" @click="undoUserName" class="button image" id="password-undo"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" class="fase-fade" v-if="!editUser">Change Username</h3>
            <input v-if="editUser" class="fase-fade" type="text" v-model="username"/>
          </div>
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!editPass" @mouseover="hover" @click="changePassword" class="button image" id="password"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="editPass" @mouseover="hover" @click="savePassword" class="button image" id="password-done"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="editPass" @mouseover="hover" @click="undoPassword" class="button image" id="password-undo"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}"  class="fase-fade" v-if="!editPass">Change Password</h3>
            <input v-if="editPass" class="fase-fade" type="text" v-model="password"/>
          </div>
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="resetSettings" class="button image" id="reset"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Reset Settings</h3>
          </div>
        </div>

        <div class="flex-title">
          <div v-bind:class="{ invertlights: preferences.colors}" class="image" id="personalize"/>
          <h2 v-bind:class="{ invertlights: preferences.colors}" >Personalize</h2>
        </div>
        <div class="buttons-div">
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!preferences.colors" @mouseover="hover" @click="lights" class="button image" id="lighton"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.colors" @mouseover="hover" @click="lights" class="button image" id="lightoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}">Lights</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ unactive : allLabelsOn, invertlights: preferences.colors}" @mouseover="hover" @click="allLabels(true)" class="button image" id="button"/>
            <h3 v-bind:class="{ unactive : allLabelsOn, invertlights: preferences.colors}">All Labels On</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ unactive : allLabelsOff, invertlights: preferences.colors}" @mouseover="hover" @click="allLabels(false)" class="button image" id="button"/>
            <h3 v-bind:class="{ unactive : allLabelsOff, invertlights: preferences.colors}">All Labels Off</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.tooltipsactive != 0" @mouseover="hover" @click="changeToolTips(0)" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.tooltipsactive == 0" @mouseover="hover" @click="changeToolTips(1)" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Tool Tips On / Off</h3>
          </div>
        </div>

        <div class="flex-title">
          <div v-bind:class="{ invertlights: preferences.colors}" class="image" id="audio"/>
          <h2 v-bind:class="{ invertlights: preferences.colors}" >Audio</h2>
        </div>
        <div class="buttons-div">
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.sound_pack != 0" @mouseover="hover" @click="soundFX" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.sound_pack == 0" @mouseover="hover" @click="soundFX" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Sound Effects On / Off</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ unactive : preferences.sound_pack == 0, volumemargin: editSoundPack , invertlights: preferences.colors}" v-if="preferences.sound_pack == 0" @mouseover="hover" @click="soundPackChoice(1)" class="button image" id="one"/>
            <div v-bind:class="{ unactive : preferences.sound_pack != 1, volumemargin: editSoundPack , invertlights: preferences.colors}" v-if="preferences.sound_pack == 1 || (editSoundPack && preferences.sound_pack != 0)" @mouseover="hover" @click="soundPackChoice(1)" class="button image" id="one"/>
            <div v-bind:class="{ unactive : preferences.sound_pack != 2, volumemargin: editSoundPack , invertlights: preferences.colors}" v-if="preferences.sound_pack == 2 || editSoundPack" @mouseover="hover" @click="soundPackChoice(2)" class="button image" id="two"/>
            <div v-bind:class="{ unactive : preferences.sound_pack != 3, volumemargin: editSoundPack , invertlights: preferences.colors}" v-if="preferences.sound_pack == 3 || editSoundPack" @mouseover="hover" @click="soundPackChoice(3)" class="button image" id="three"/>
            <div v-bind:class="{ unactive : preferences.sound_pack != 4, volumemargin: editSoundPack , invertlights: preferences.colors}" v-if="preferences.sound_pack == 4 || editSoundPack" @mouseover="hover" @click="soundPackChoice(4)" class="button image" id="four"/>
            <h3 v-bind:class="{ unactive : preferences.sound_pack == 0 ,invertlights: preferences.colors }">Sound Pack: {{soundPacks[preferences.sound_pack]}}</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ unactive : preferences.svolume != 0 || preferences.sound_pack == 0, volumemargin: editSFXVolume , invertlights: preferences.colors}" v-if="preferences.svolume == 0 || editSFXVolume" @mouseover="hover" @click="soundFXVolume(0)" class="button image" id="volume-low"/>
            <div v-bind:class="{ unactive : preferences.svolume != 1 || preferences.sound_pack == 0, volumemargin: editSFXVolume , invertlights: preferences.colors}" v-if="preferences.svolume == 1 || editSFXVolume" @mouseover="hover" @click="soundFXVolume(1)" class="button image" id="volume-med"/>
            <div v-bind:class="{ unactive : preferences.svolume != 2 || preferences.sound_pack == 0, volumemargin: editSFXVolume , invertlights: preferences.colors}" v-if="preferences.svolume == 2 || editSFXVolume" @mouseover="hover" @click="soundFXVolume(2)" class="button image" id="volume-high"/>
            <h3 v-bind:class="{ unactive : preferences.sound_pack == 0, invertlights: preferences.colors}">Sound Effects Volume</h3>
          </div>
          <div class="flex add-margin-top">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.music != 0" @mouseover="hover" @click="musicToggle" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.music == 0" @mouseover="hover" @click="musicToggle" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Music On / Off</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ unactive : preferences.music == 0, volumemargin: editSong , invertlights: preferences.colors}" v-if="preferences.music == 0" @mouseover="hover" @click="songChoice(1)" class="button image" id="one"/>
            <div v-bind:class="{ unactive : preferences.music != 1, volumemargin: editSong , invertlights: preferences.colors}" v-if="preferences.music == 1 || (editSong && preferences.music != 0)" @mouseover="hover" @click="songChoice(1)" class="button image" id="one"/>
            <div v-bind:class="{ unactive : preferences.music != 2, volumemargin: editSong , invertlights: preferences.colors}" v-if="preferences.music == 2 || editSong" @mouseover="hover" @click="songChoice(2)" class="button image" id="two"/>
            <div v-bind:class="{ unactive : preferences.music != 3, volumemargin: editSong , invertlights: preferences.colors}" v-if="preferences.music == 3 || editSong" @mouseover="hover" @click="songChoice(3)" class="button image" id="three"/>
            <div v-bind:class="{ unactive : preferences.music != 4, volumemargin: editSong , invertlights: preferences.colors}" v-if="preferences.music == 4 || editSong" @mouseover="hover" @click="songChoice(4)" class="button image" id="four"/>
            <div v-bind:class="{ unactive : preferences.music != 5, volumemargin: editSong , invertlights: preferences.colors}" v-if="preferences.music == 5 || editSong" @mouseover="hover" @click="songChoice(5)" class="button image" id="five"/>
            <div v-bind:class="{ unactive : preferences.music != 6, volumemargin: editSong , invertlights: preferences.colors}" v-if="preferences.music >= 6 || editSong" @mouseover="hover" @click="songChoice(6)" class="button image" id="heart"/>
            <h3 v-bind:class="{ unactive : preferences.music == 0 , invertlights: preferences.colors}">Song: {{music[preferences.music]}}</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ unactive : preferences.mvolume != 0 || preferences.music == 0, volumemargin: editMusicVolume , invertlights: preferences.colors}" v-if="preferences.mvolume == 0 || editMusicVolume" @mouseover="hover" @click="musicVolume(0)" class="button image" id="volume-low"/>
            <div v-bind:class="{ unactive : preferences.mvolume != 1 || preferences.music == 0, volumemargin: editMusicVolume , invertlights: preferences.colors}"  v-if="preferences.mvolume == 1 || editMusicVolume" @mouseover="hover" @click="musicVolume(1)" class="button image" id="volume-med"/>
            <div v-bind:class="{ unactive : preferences.mvolume != 2 || preferences.music == 0, volumemargin: editMusicVolume , invertlights: preferences.colors}"  v-if="preferences.mvolume == 2 || editMusicVolume" @mouseover="hover" @click="musicVolume(2)" class="button image" id="volume-high"/>
            <h3 v-bind:class="{ unactive : preferences.music == 0, invertlights: preferences.colors}">Music Volume</h3>
          </div>
        </div>

        <div class="flex-title">
          <div v-bind:class="{ invertlights: preferences.colors}" class="image" id="task"/>
          <h2 v-bind:class="{ invertlights: preferences.colors}" >Task List</h2>
        </div>
        <div class="buttons-div">
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.labels[0]" @mouseover="hover" @click="taskLabels()" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!preferences.labels[0]" @mouseover="hover" @click="taskLabels()" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Labels On / Off</h3>
          </div>

          <div class="flex">
            <div v-if="a == 1">
            <div v-bind:class="{ invertlights: preferences.colors}"  @mouseover="hover" @click="changemainMenu(0)" class="button image" id="switchon"/>
            </div>
            <div v-else>
              <div v-bind:class="{ invertlights: preferences.colors}" @mouseover="hover" @click="changemainMenu(1)" class="button image" id="switchoff"/>
            </div>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Main Menu On / Off</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="b" @mouseover="hover" @click="openMenus(false)" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!b" @mouseover="hover" @click="openMenus(true)" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Automatically Open Menus On / Off</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="c" @mouseover="hover" @click="itemBackgroundsSet(false)" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!c" @mouseover="hover" @click="itemBackgroundsSet(true)" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Item Backgrounds On / Off</h3>
          </div>

          <div class="flex add-margin-top">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.groupsetting" @click="changeGroupSettings(0)" @mouseover="hover" class="button image" id="switchon"></div>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!preferences.groupsetting" @click="changeGroupSettings(1)" @mouseover="hover" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Task Groups On / Off</h3>
          </div>

          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors, unactive : !preferences.groupsetting, groupnone: preferences.groupsetting == 0, groupcustom: preferences.groupsetting == 2, groupdue: preferences.groupsetting == 1 , volumemargin: groupSettings}" @click="groupSettingsOn()" @mouseover="hover" class="button image"/>
            <h3 v-if="groupSettings" v-bind:class="{ invertlights: preferences.colors, unactive : !preferences.groupsetting}" >Groups: </h3>
            <button @click="changeGroupSettingsCLOSE(1)" v-bind:class="{ invertlights: preferences.colors, unactive : !preferences.groupsetting}" class="groupbutton" v-if="groupSettings">By Due Date</button>
            <button @click="changeGroupSettingsCLOSE(2)" v-bind:class="{ invertlights: preferences.colors, unactive : !preferences.groupsetting}" class="groupbutton" v-if="groupSettings">Custom Groups</button>
            <h3 v-if="!groupSettings" v-bind:class="{ invertlights: preferences.colors, unactive : !preferences.groupsetting}" >Groups: {{groupOption[preferences.groupsetting]}}</h3>

          </div>

          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors, unactive : preferences.groupsetting != 2}" @mouseover="hover" @click="editGroupCustom" class="button image tooltip" id="button"><span v-if="preferences.tooltipsactive" class="tooltiptext">Create and Rearrange Groups</span></div>
            <h3 v-bind:class="{ invertlights: preferences.colors, unactive : preferences.groupsetting != 2}" >Edit Task Groups</h3>
          </div>

          <div v-bind:class="{ invertGROUP: preferences.colors, unactive : preferences.groupsetting != 2}" id="groupCustomDiv" v-if="groupCustomEdit">
            <div class="flex" id="centerGROUP">
              <div v-bind:class="{ invertlights: preferences.colors, unactive : preferences.groupsetting != 2}" @mouseover="hover" @click="saveCustomGroup" class="button image" id="plus-image"/>
              <h3 v-bind:class="{ invertlights: preferences.colors, unactive : preferences.groupsetting != 2}">New Group</h3>
              <input class="fase-fade" type="text" v-model="groupname"/>
            </div>
            <div v-bind:class="{ invertlights: preferences.colors, unactive : preferences.groupsetting != 2}" draggable="true" v-on:dragstart="dragItem(group)" v-on:dragover.prevent v-on:drop="dropItem(group)" class="groupdiv" v-for="group in preferences.groups" v-bind:key="group.num">
              <h3 v-if="!group.edit" >{{group.name}}</h3>
              <input v-if="group.edit" class="fase-fade" type="text" v-model="newGroupName"/>
              <div class="flex" id="nomargin">
                <div  @mouseover="hover" @click="deleteCustomGroup(group.name)" class="button image" id="delete-image"/>
                <div  @mouseover="hover" @click="editCustomGroup(group.index)" class="button image" id="edit-image"/>
              </div>
            </div>
          </div>






        </div>

        <div class="flex-title">
          <div v-bind:class="{ invertlights: preferences.colors}" class="image" id="view"/>
          <h2 v-bind:class="{ invertlights: preferences.colors}" >View Task</h2>
        </div>
        <div class="buttons-div">
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.labels[1]" @mouseover="hover" @click="viewLabels()" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!preferences.labels[1]" @mouseover="hover" @click="viewLabels()" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Labels On / Off</h3>
          </div>
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.datemade" @mouseover="hover" @click="showDateMade(0)" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!preferences.datemade" @mouseover="hover" @click="showDateMade(1)" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Show Date Made On / Off</h3>
          </div>
        </div>

        <div class="flex-title">
          <div v-bind:class="{ invertlights: preferences.colors}" class="image" id="edit"/>
          <h2 v-bind:class="{ invertlights: preferences.colors}" >Edit Task</h2>
        </div>
        <div class="buttons-div">
          <div class="flex">
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="preferences.labels[2]" @mouseover="hover" @click="editLabels()" class="button image" id="switchon"/>
            <div v-bind:class="{ invertlights: preferences.colors}" v-if="!preferences.labels[2]" @mouseover="hover" @click="editLabels()" class="button image" id="switchoff"/>
            <h3 v-bind:class="{ invertlights: preferences.colors}" >Labels On / Off</h3>
          </div>
        </div>
      </div>
      <div id="button-flex">
        <div @mouseover="hover" v-if="!saved" id="save" @click="save"><div class="button image" id="save-image"/><h3 id="save-title">Save Changes</h3></div>
        <div @mouseover="hover" v-if="!saved" id="undo" @click="save"><div class="button image" id="undo-image"/><h3 id="save-title">Undo Changes</h3></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'settings',
  components: {
    Login,
    Register
  },
  data(){
    return {
      password: "",
      username: "",
      groupname: "",
      newGroupName: "",

      drag: null,

      editPass: false,
      editUser: false,

      editSFXVolume: false,
      editMusicVolume: false,

      editSong: false,

      labelChange: false,

      editSoundPack: false,

      saved: true,
      changes: true,

      groupSettings: false,
      groupEdit: false,

      groupOption: ["None", "By Due Date", "Custom Groups"],
      groupCustomEdit: false,

      music: ["What a Difference a Day Makes", "What a Difference a Day Makes", "Ova Da Wudz", "Chopin 24 Preludes Op. 28 No. 15", "Akita Mani Yo", "Day and Night", "Random", "Random", "Random", "Random", "Random", "Random", "Random", "Random",],
      soundPacks: ["Original", "Original", "8-Bit", "Wood Chips", "Bubblez"],

      a: true,
      b: false,
      c: true,
      d: true,
      e: 0,
    }
  },

  methods: {
    dragItem(item) {
      this.drag = item;
    },
    async dropItem(item) {
      const indexItem = this.preferences.groups.indexOf(this.drag);
      let indexTarget = this.preferences.groups.indexOf(item);
      if (indexTarget == -1){
        indexTarget = this.preferences.groups.length;
      }
      var newGroups = this.preferences.groups;
      newGroups.splice(indexItem,1);
      newGroups.splice(indexTarget,0,this.drag);

      var changes = [];

      for (var i = 0; i < this.items.length; i++)
      {
        for (var j = 0; j < newGroups.length; j++)
        {
          if (this.items[i].group == newGroups[j].index)
          {
            await this.$store.dispatch("changeGroup", {group: j, _id: this.items[i]._id});
            j = newGroups.length;
          }
        }
      }

      for(var i = 0; i < newGroups.length; i++)
      {
        newGroups[i].index = i;
      }
      await this.$store.dispatch("updatePreferences", {tag: "groups", set: newGroups});
      this.saved = false;
      this.changes = false;
    },
    async editCustomGroup(index) {
      var newGroups = this.preferences.groups;
      if (newGroups[index].edit == null || newGroups[index].edit == false)
      {
        newGroups[index].edit = true;
        this.press();
      }
      else if (newGroups[index].edit && this.newGroupName != "")
      {
        newGroups[index].name = this.newGroupName;
        this.newGroupName = "";
        await this.$store.dispatch("updatePreferences", {tag: "groups", set: newGroups});
        this.press();
        this.saved = false;
        this.changes = false;
      }
    },
    async deleteCustomGroup(name) {
        var newGroups = this.preferences.groups;
        var index = null
        for (var i = 0; i < newGroups.length; i++)
        {
          if (newGroups[i].name == name)
          {
            newGroups.splice(i, 1);
            index = i;
            break;
          }
        }
        for (var i = 0; i < this.items.length; i++)
        {
          if (this.items[i].group == index)
          {
            await this.$store.dispatch("changeGroup", {group: -1, _id: this.items[i]._id});
          }
          if (this.items[i].group >= index)
          {
            await this.$store.dispatch("changeGroup", {group: (this.items[i].group - 1), _id: this.items[i]._id});
          }
        }
        for(var i = 0; i < newGroups.length; i++)
        {
          newGroups[i].index = i;
        }
        await this.$store.dispatch("updatePreferences", {tag: "groups", set: newGroups});
        this.$store.dispatch("playSound", {sound: 1, volume: 0});
        this.saved = false;
        this.changes = false;
    },
    async saveCustomGroup() {
      if (this.groupname != "")
      {
        var newGroups = this.preferences.groups;
        newGroups.push({index: this.preferences.groups.length, name: this.groupname});
        await this.$store.dispatch("updatePreferences", {tag: "groups", set: newGroups});
        this.press();
        this.groupname = "";
        this.saved = false;
        this.changes = false;
      }
    },
    editGroupCustom() {
      this.press();
      if (this.groupCustomEdit)
      {
        this.groupCustomEdit = false;
        this.groupname = "";
      }
      else
      {
        this.groupCustomEdit = true;
      }
    },
    groupSettingsOn(){
      this.press();
      this.groupSettings = !this.groupSettings;
    },
    async changeGroupSettings(changeto)
    {
      await this.press();
      if (!changeto){
        this.groupSettings = false;
      }
      await this.$store.dispatch("updatePreferences", {tag: "groupsetting", set: changeto});
      this.e = changeto;
      this.saved = false;
      this.changes = false;
    },  
    async changeGroupSettingsCLOSE(changeto)
    {
      await this.press();
      this.groupSettings = false;
      await this.$store.dispatch("updatePreferences", {tag: "groupsetting", set: changeto});
      this.e = changeto;
      this.saved = false;
      this.changes = false;
    },     
    async changeToolTips(changeto)
    {
        await this.press();
        await this.$store.dispatch("updatePreferences", {tag: "tooltipsactive", set: changeto});
        this.d = changeto;
        this.saved = false;
        this.changes = false;
        
    },
    async itemBackgroundsSet(changeto)
    {
        await this.press();
        await this.$store.dispatch("updatePreferences", {tag: "itembackground", set: changeto});
        this.c = changeto;
        this.saved = false;
        this.changes = false;
        
    },
    async changemainMenu(changeto) {
        await this.press();
        await this.$store.dispatch("updatePreferences", {tag: "mainmenu", set: changeto});
        this.a = changeto;
        this.saved = false;
        this.changes = false;
    },
    async showDateMade(set) {
      if (this.preferences.datemade != set)
      {
        await this.press();
        await this.$store.dispatch("updatePreferences", {tag: "datemade", set: set});
        this.saved = false;
        this.changes = false;
      }
    },
    async openMenus(set) {
      if (this.preferences.openmenus != set)
      {
        await this.press();
        await this.$store.dispatch("updatePreferences", {tag: "openmenus", set: set});
        this.saved = false;
        this.changes = false;
      }
      this.b = set;
    },
    async save()
    {
      this.$store.dispatch("playSound", {sound: 4, volume: 0});
      await this.$store.dispatch("changePreferences");
      this.saved = true;
      this.$router.push('/');

    },
    startMusic()
    {
      this.$store.dispatch("playSong");
    },
    logout() {
      this.$store.dispatch("logout");
    },
    hover()
    {
      this.$store.dispatch("playSound", {sound: 3, volume: 0});
    },
    press()
    {
      this.$store.dispatch("playSound", {sound: 0, volume: 0});
    },
    changeUserName()
    {
      this.press();
      this.editUser = true;
      if (this.editPass)
      {
        this.editPass = false;
        this.password = "";
      }
    },
    undoUserName()
    {
      this.press();
      this.editUser = false;
      this.username = "";
    },

    undoPassword()
    {
      this.editPass = false;
      this.password = "";
      this.press();
    },
    async resetSettings()
    {
      this.press();
      if (this.preferences.colors) {
        await this.$store.dispatch("updatePreferences", {tag: "colors", set: 0});

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
      await this.$store.dispatch("resetSettings");
      
      this.saved = false;
      this.changes = false;
    },
    lights()
    {
      this.press();
      if (this.preferences.colors == 0)
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
      this.saved = false;
      this.changes = false;
    },
    async allLabels(set)
    {
      for (var i = 0; i < this.preferences.labels.length; i++)
      {
        if (this.preferences.labels[i] != set)
        {
          await this.press();
          await this.$store.dispatch("updatePreferences", {tag: "labels", at: i, set: set});
          this.saved = false;
          this.changes = false;
          this.labelChange = true;
        }
      }
    },
    async soundFX()
    {
      this.press();
      console.log("THIS");
      console.log(this.preferences.svolume);
      if (this.preferences.sound_pack != 0)
      {
        await this.$store.dispatch("updatePreferences", {tag: "sound_pack", set: 0});
      }
      else
      {
        await this.$store.dispatch("updatePreferences", {tag: "sound_pack", set: 1});
      }
      this.saved = false;
      this.changes = false;
      this.press();
    },
    soundFXVolume(num)
    {
      this.press();
      if (!this.editSFXVolume)
      this.editSFXVolume = true;
      else
      {
        this.editSFXVolume = false;
        this.$store.dispatch("updatePreferences", {tag: "svolume", set: num});
      }
      this.saved = false;
      this.changes = false;
    },
    async soundPackChoice(num)
    {
      this.press();
      if (!this.editSoundPack)
      this.editSoundPack = true;
      else
      {
        this.editSoundPack = false;
        this.$store.dispatch("updatePreferences", {tag: "sound_pack", set: num});
      }
      this.saved = false;
      this.changes = false;
    },
    async songChoice(num)
    {
      this.press();
      if (!this.editSong)
      this.editSong = true;
      else
      {
        this.editSong = false;
        this.$store.dispatch("changeSong", {music: num});
      }
      this.saved = false;
      this.changes = false;
    },
    async musicToggle()
    {
      this.press();
      if (this.preferences.music != 0)
      {
        this.$store.dispatch("changeSong", {music: 0});
      }
      else
      {
        await this.$store.dispatch("updatePreferences", {tag: "music", set: 1});
        this.$store.dispatch("changeSong", {music: 1});
      }
      this.saved = false;
      this.changes = false;
    },
    musicVolume(num)
    {
      this.press();
      if (!this.editMusicVolume)
      this.editMusicVolume = true;
      else
      {
        this.editMusicVolume = false;
        this.$store.dispatch("updatePreferences", {tag: "mvolume", set: num});
        this.startMusic();
      }
      this.saved = false;
      this.changes = false;
    },
    async taskLabels()
    {
      this.press();
      if (this.preferences.labels[0])
      await this.$store.dispatch("updatePreferences", {tag: "labels", at: 0, set: false});
      else
      await this.$store.dispatch("updatePreferences", {tag: "labels", at: 0, set: true});
      this.labelChange = true;
      this.saved = false;
      this.changes = false;
    },
    async viewLabels()
    {
      this.press();
      if (this.preferences.labels[1])
      await this.$store.dispatch("updatePreferences", {tag: "labels", at: 1, set: false});
      else
      await this.$store.dispatch("updatePreferences", {tag: "labels", at: 1, set: true});
      this.labelChange = true;
      this.saved = false;
      this.changes = false;
    },
    async editLabels()
    {
      this.press();
      if (this.preferences.labels[2])
      await this.$store.dispatch("updatePreferences", {tag: "labels", at: 2, set: false});
      else
      await this.$store.dispatch("updatePreferences", {tag: "labels", at: 2, set: true});
      this.labelChange = true;
      this.saved = false;
      this.changes = false;
    },
    async savePassword() {
      let data = {
        password: this.password
      };
      await this.$store.dispatch("changePassword", data);
      await this.$store.dispatch("getItems");
      await this.$store.dispatch("loadPreferences");
      this.editPass = false;
      this.password = "";
      this.press();
    },
    async saveUserName() {
      let data = {
        username: this.username
      };
      console.log("huh");
      console.log(data);
      await this.$store.dispatch("changeUserName", data);
      await this.$store.dispatch("getItems");
      await this.$store.dispatch("loadPreferences");
      this.press();
      this.editUser = false;
      this.username = "";
    },
    changePassword()
    {
      this.press();
      this.editPass = true;
      if (this.editUser)
      {
        this.editUser = false;
        this.username = "";
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    items()
    {
      return this.$store.state.items;
    },
    loginorregister()
    {
      return this.$store.state.loginorregister;
    },
    preferences() {
      if (this.saved || this.changes){
        this.changes = true;
      }
      return this.$store.state.preferences;
    },
    allLabelsOn() {
      if (this.labelChange) this.labelChange = false;
      if ((this.$store.state.preferences.labels[0] && this.$store.state.preferences.labels[1] && this.$store.state.preferences.labels[2]))
      {
        return true;
      }
      return false;
    },
    allLabelsOff() {
      if (this.labelChange) this.labelChange = false;
      if ((!this.$store.state.preferences.labels[0] && !this.$store.state.preferences.labels[1] && !this.$store.state.preferences.labels[2]))
      {
        return true;
      }
      return false;
    },
  },
  async created() {
    this.$store.dispatch("playSound", {sound: 0, volume: 0});
    await this.$store.dispatch("getUser");
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
    this.startMusic();
    this.a = this.preferences.mainmenu;
    this.b = this.preferences.openmenus;
    this.c = this.preferences.itembackground;
  }
}
</script>

<style scoped>
.margin-around {
  margin-left: 10px;
  margin-right: 10px;
}
#main-flex {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.invertGROUP {
  background-color: rgb(45, 47, 51) !important;
}
#centerGROUP {
  margin: 0 auto;
  width: 380px;
  margin-bottom: 20px;
}
#nomargin {
  margin-bottom: 0px;
  width: 20%;
  max-width: 75px;
  justify-content: space-around;
}
.groupdiv {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.897);
  border: 1px solid rgba(0, 0, 0, 0.178);
  border-radius: 30px;
  padding: 5px;
  justify-content: space-between;
  margin-bottom: 20px;
}
#groupCustomDiv {
  margin-left: 00px;
  background-color: rgba(236, 236, 236, 0.445);
  padding: 20px;
  padding-bottom: 5px;
  border-radius: 20px;
  animation: fade 1s ease;
}
.groupbutton{
  margin: 0px;
  margin-left: 10px;
  margin-right: 10px;
  width: 150px;
  padding: 1px;
  text-align: center;
  border-radius: 20px;
  color: rgb(65, 65, 65);
  background-color: rgba(236, 236, 236, 0.445);
}
.groupbutton:hover{
  margin: 0px;
  margin-left: 10px;
  margin-right: 10px;
  width: 150px;
  padding: 1px;
  text-align: center;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  background-color: rgba(236, 236, 236, 0.801);
}
.add-margin-top {
  margin-top: 40px;
}

#button-flex {
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 20px;
  margin-bottom: 30px;
}
#save {
  display: flex;
  margin-right: 30px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  width: 180px;
  background-color: rgb(72, 116, 212);
  color: white;
  cursor: pointer;
  transition: background-color .2s ease;
}

#save:hover {
  background-color: rgb(72, 212, 72);
  color: white;
}

#undo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  width: 180px;
  background-color: rgb(212, 203, 72);
  color: white;
  cursor: pointer;
  transition: background-color .2s ease;
}

#undo:hover {
  background-color: rgb(212, 105, 72);
  color: white;
}

#save-title {
  color: inherit;
}

h1 {
  margin: 0px;
  font-weight: lighter;
  text-align: left;
  font-size: 120%;
  color: #7d8388;
  border-radius: 5px;
}

h2 {
  margin: 0px;
  font-weight: lighter;
  text-align: left;
  font-size: 150%;
  color: #282a2c;
  padding: 5px;
  border-radius: 5px;
}

h3 {
  margin: 0px;
  font-weight: lighter;
  text-align: left;
  font-size: 120%;
  color: #282a2c;
  padding: 5px;
  border-radius: 5px;
  margin-left: 8px;
}

.main {
  width: 85%;
  margin: 0 auto;
  padding-bottom: 10px;
  margin-bottom: 10px;
}


.settings {
  margin-left: 30px;
  margin-right: 30px;
  position: relative;
}

input {
  display: block;
  width: 30%;
  max-width: 200px;
  min-width: 200px;
  margin-left: 10px;
  background-color: rgb(233, 233, 233);
  border-radius: 5px;
  transition: background-color .5s ease;
  padding: 5px;
}

input:focus {
  background-color: rgb(217, 235, 243);
}

.fade{
  animation: fade-in 2s ease;
}

.fase-fade {
  animation: fade-in .5s ease;
}

.slide {
  animation: slide-up 2s ease;
}

.flex {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.flex-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  transition: color .3s ease, font-weight .3s ease;
}

.flex-title:hover {
  color: black !important;
  font-weight: bolder !important;
}

.flex-info {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  opacity: .3;
  transition: color .3s ease, font-weight .3s ease, opacity .3s ease;
}

.flex-info:hover {
  opacity: 1;
  color: black !important;
  font-weight: bolder !important;
}

.image {
  display: block;
  width: 25px;
  height: 25px;
  background-color: rgba(0,0,0,0);
  border: 0px;
  background-size: cover;
  opacity: .95;
}

.image-smaller {
  display: block;
  width: 20px;
  height: 20px;
  background-color: rgba(0,0,0,0);
  border: 0px;
  background-size: cover;
  opacity: .95;
  margin-right: 5px;
}

.button:hover{
  animation: bubble .3s ease;
  transform: scale(1.3, 1.3);
}

@keyframes bubble {
  0% {
    transform: scale(1, 1);
  }
  100%
  {
    transform: scale(1.3, 1.3);
  }
}

.buttons-div {
  margin-left: 35px;
  margin-bottom: 50px;
}

button {
  margin: 0px;
  font-weight: lighter;
  text-align: left;
  font-size: 110%;
  background-color: #e9e9e99a;
  border: 0px;
  margin-bottom: 30px;
}

#personalize {
  background-image: url("../assets/personalize.png");
}

#audio {
  background-image: url("../assets/audio.png");
}

#task {
  background-image: url("../assets/tasks.png");
}

#edit {
  background-image: url("../assets/edit-2.png");
}

#view {
  background-image: url("../assets/view.png");
}

#account {
  background-image: url("../assets/account.png");
}

#information {
  background-image: url("../assets/info.png");

}

#switchon {
  background-image: url("../assets/switch-on.png");
}

#switchoff {
  background-image: url("../assets/switch-off.png");
}

#lighton {
  background-image: url("../assets/lighton.png");
}

#lightoff {
  background-image: url("../assets/lightoff.png");
}

#password {
  background-image: url("../assets/password.png");
}

.groupnone
{
background-image: url("../assets/group-off.png");
}

.groupdue
{
background-image: url("../assets/group-date.png");
}

.groupcustom
{
background-image: url("../assets/group-on.png");
}

#password-done {
  background-image: url("../assets/password-done.png");
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(100%);
  padding: 3px;
  border-radius: 20px;
  background-color: rgb(174, 51, 185);
}

#password-undo {
  background-image: url("../assets/password-undo.png");
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(100%);
  padding: 3px;
  border-radius: 20px;
  background-color: rgb(55, 207, 218);
  margin-left: 7px;
}

#username {
  background-image: url("../assets/username.png");
}

#reset {
  background-image: url("../assets/reset.png");
}

#button {
  background-image: url("../assets/button.png");
}

#button:hover {
  background-image: url("../assets/button2.png");
}

#volume-low {
  background-image: url("../assets/volume-low.png");
}

#volume-med {
  background-image: url("../assets/volume-med.png");
}

#undo-image {
  background-image: url("../assets/undo.png");
  filter: invert(100%);
}

#volume-high {
  background-image: url("../assets/volume-high.png");
}

.volumemargin {
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.unactive {
  opacity: .4;
}

#one {
  background-image: url("../assets/1.png");
}
#two {
  background-image: url("../assets/2.png");
}
#three {
  background-image: url("../assets/3.png");
}
#four {
  background-image: url("../assets/4.png");
}
#five {
  background-image: url("../assets/5.png");
}
#six {
  background-image: url("../assets/6.png");
}
#seven {
  background-image: url("../assets/7.png");
}
#eight {
  background-image: url("../assets/8.png");
}
#nine {
  background-image: url("../assets/9.png");
}
#ten {
  background-image: url("../assets/10.png");
}
#heart {
  background-image: url("../assets/11.png");
}

#logout {
  background-image: url("../assets/logout.png");
}

#save-image {
  background-image: url("../assets/save.png");
  filter: invert(100%);
}


#plus-image {
  background-image: url("../assets/plus.png");
  border-radius: 50px;
  transition: background-color .5s ease, filter .5s ease;
}

#plus-image:hover {
  background-color: rgba(199, 119, 27, 0.952);
  background-position: center;
  filter: invert(100%);
}

#delete-image {
  background-image: url("../assets/delete.png");
  opacity: .5;
  transition: opacity .5s ease;
}

#edit-image {
  background-image: url("../assets/edit.png");
  opacity: .5;
  transition: opacity .5s ease;
}

#delete-image:hover {
  opacity: 1;
}

#edit-image:hover {
  opacity: 1;
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
  font-size: 85%;
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
</style>