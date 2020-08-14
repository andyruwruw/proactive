<template>
  <div class="content">
    <div class="nav-container">
      <h1>
        PROACTIVE
      </h1>
    </div>

    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data: () => ({

  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');

html {
  background: rgb(240, 239, 239);
}

.content {
  background: rgb(255, 255, 255);
  border-radius: 5px;
  color: #384b5f;
  font-family: 'Roboto Slab', serif;
  max-width: 1248px;
  margin: 0 auto;
  margin-top: 10px;
  min-height: calc(100vh - 20px);
  width: 95vw;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.nav-container h1 {
  display: inline-block;
  cursor: default;
  color: #516477;
  font-weight: lighter;
  margin-top: 15px;
  opacity: .1;
  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.61);
  transition: all .2s ease;
}

.nav-container h1:hover{
  color: #3f5366;
  opacity: 1;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.24);
}
</style>
