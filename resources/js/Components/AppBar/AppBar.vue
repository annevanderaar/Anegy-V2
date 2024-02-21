<template>
  <MobileAppBar v-if="mobile"/>

  <DesktopAppBar v-else/>
</template>

<script>
import { defineComponent } from 'vue';
import MobileAppBar from '@/Components/AppBar/MobileAppBar.vue';
import DesktopAppBar from '@/Components/AppBar/DesktopAppBar.vue';

export default defineComponent({
  name: 'AppBar',

  components: {
    DesktopAppBar,
    MobileAppBar,
  },

  computed: {
    mobile () {
      return this.$vuetify.display.mobile;
    },
  },
});
</script>
