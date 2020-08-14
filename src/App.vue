<template>
  <div class="content">
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

html {
  background: rgb(240, 239, 239);
}

.content {
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 98vw;
  max-width: 1248px;
  margin: 0 auto;
  margin-top: 10px;


  color: #384b5f;
  background: rgb(255, 255, 255);
  border-radius: 5px;

  min-height: calc(100vh - 20px);
}
</style>
