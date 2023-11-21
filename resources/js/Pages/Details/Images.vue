<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="image in images.profiles"
      :key="image.id"
      :href="`https://image.tmdb.org/t/p/w500${image.file_path}`"
      class="cards"
      target="_blank"
    >
      <v-img
        :src="`https://image.tmdb.org/t/p/w500${image.file_path}`"
        width="300px"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    images: {
      type: Object,
      required: true,
    },
  },
});
</script>
