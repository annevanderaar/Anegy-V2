<template>
  <div class="d-flex flex-wrap justify-center">
    <h2 v-if="!videos.length" class="text-center">
      {{ $t('details.videos.no') }}
    </h2>
    <v-card
      v-for="video in videos"
      :key="video.id"
      class="cards"
    >
      <h4>{{ video.name }}</h4>
      <iframe
        :src="`https://www.youtube.com/embed/${video.key}`"
        width="560"
        height="315"
        frameborder="0"
        allowfullscreen
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    videos: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped>
@import "../../../css/app.css";
</style>
