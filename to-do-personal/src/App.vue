<template>
<div>
  <div id="app">
    <div id="nav">
      <router-link id="home" to="/"></router-link> <h1 v-if="true" id="maintitle">PROACTIVE</h1>
      <router-link id="settings" to="/settings"></router-link>
    </div>
    <router-view/>
  </div>
  <a id="github" href="https://github.com/andyruwruw/To-Do-Personal"/>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');

.lights {
  transition: background-color .1s ease, color .1s ease, border .1s ease, invert .1s ease;
}

.invertlights {
  filter: invert(100%);
}

#background
{
  background: rgb(240, 239, 239);
}

.lights-off-one
{
  background: rgb(29, 30, 32) !important;
}

.lights-off-two
{
  background: rgb(40, 41, 44) !important;}

.lightsoffthree
{
  background: rgba(51, 52, 56, 0.356) !important;
  border: rgb(54, 55, 59) !important;
}

.nobackground
{
  background: rgba(51, 52, 56, 0) !important;
  border: rgba(54, 55, 59, 0) !important;
}


.inverttext1
{
  color: rgba(255, 255, 255, 0.795) !important;
}

.inverttext2
{
  color: rgba(255, 255, 255, 0.61) !important;
}

.inverttext3
{
  color: rgba(255, 255, 255, 0.445) !important;
}

.inverttext6
{
  color: rgba(255, 255, 255, 0.596) !important;
}




#app {
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 75%;
  margin: 0 auto;
  margin-top: 10px;
  
  text-align: center;
  color: #384b5f;
  background: rgb(255, 255, 255);
  border-radius: 5px;

  max-width: 1300px;
  min-width: 500px;

  min-height: calc(95vh);
}

#maintitle {
  margin-top: 15px;
  margin-bottom: 0px;
  opacity: .1;
  font-weight: lighter;
  text-align: center;
  font-size: 200%;
  cursor: default;
  color: #516477;
  transition: font-size .2s ease 0s, margin-top .2s ease 0s, opacity .2s ease;;
  animation: title 7.5s ease;
}
#maintitle:hover{
  font-size: 210%;
  margin-top: 14px;
  color: #3f5366;
  opacity: 1;
}

#github {
  margin: 0 auto;
  display: block;
  width: 30px;
  height: 30px;
  background-color: rgba(0,0,0,0);
  background-size: cover;
  background-image: url("./assets/github.png");
  margin-bottom: 30px;
  margin-top: 20px;
  opacity: .3;
  transition: opacity .5s ease;
  animation: github-out .25s linear;
}

#github:hover {
  animation: github .5s linear;
  opacity: 1;
  transform: scale(1.1, 1.1);
}

@keyframes github {
  0% {
    transform: rotate(0deg) scale(1, 1);
  }
  50%
  {
    transform: rotate(180deg) scale(1.3, 1.3);
  }
  100% {
    transform: rotate(360deg) scale(1.1, 1.1);
  }
}

@keyframes github-out {
  0% {
    transform: rotate(360deg) scale(1, 1);
  }
  50%
  {
    transform: rotate(180deg) scale(1.3, 1.3);
  }
  100% {
    transform: rotate(0deg) scale(1, 1);
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

#nav {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

#nav a {
  display: block;
  width: 40px;
  height: 40px;
  margin: 15px 17px;
  background-size: cover;
  opacity: 0.75;
  animation: fade-in 2s ease;
  transition: width .2s ease 0s, height .2s ease 0s, margin .2s ease 0s;
}

#nav a:hover{
  width: 50px;
  height: 50px;
  opacity: 1;
  margin: 10px 12px;
  cursor: pointer;
}

#home
{
  background-image: url("./assets/home.png");
}

#settings
{
  background-image: url("./assets/settings.png");
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(0deg);
    transform: scale(1.2, 1.2);
    opacity: 1;
  }
  75%
  {
    transform: rotate(-15deg);
  }
  100% {
    
    transform: translateY(0);
  }
}

@keyframes title {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  25% {
    opacity: 1;
    transform: translateY(0);

  }
  55% {
    opacity: 1;
  }
  100% {
    opacity: .1;
  }
}

@keyframes pop {
  0% {
    transform: scale(1, 1);
  }
  50%
  {
    transform: scale(1.3, 1.3);
  }
  100% {
    transform: scale(1, 1);
  }
}



</style>
