<template>
  <IconButton
    v-if="mobile"
    icon="mdi-filter"
    color="accent"
    class="filterBtn"
  />

  <v-btn
    v-else
    class="position-fixed ma-2"
    color="accent"
  >
    {{ $t('filters.title') }}
  </v-btn>
</template>

<script>
import { defineComponent } from 'vue';
import IconButton from '@/Components/IconButton.vue';

export default defineComponent({
  name: 'FilterButton',

  components: {
    IconButton,
  },

  computed: {
    mobile () {
      return this.$vuetify.display.mobile;
    },
  },
});
</script>

<style scoped>
.filterBtn {
  position: fixed;
  margin: 4px;
  left: 5px;
  z-index: 9;
}
</style>
