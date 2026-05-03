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

<script setup>
import IconButton from '@/Components/IconButton.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
</script>

<style scoped>
.filterBtn {
  position: fixed;
  margin: 4px;
  left: 5px;
  z-index: 9;
}
</style>
