<template>
  <div class="home">
    <landing v-if="!user" />

    <list v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Landing from '@/components/Landing';
import List from '@/components/List';

export default {
  name: 'Home',
  components: {
    Landing,
    List,
  },
  computed: {
    ...mapGetters('user', [
      'user',
    ]),
  },
};
</script>

<style module>

</style>