<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="crew in this.credits.crew"
      :key="crew.id"
      :href="`/people/${crew.id}`"
      width="300px"
      class="cards"
    >
      <v-avatar
        :image="`https://image.tmdb.org/t/p/w500${crew.profile_path}`"
        size="128"
        class="ma-2"
      />
      <v-card-title>{{ crew.name }}</v-card-title>
      <v-card-text class="text-center">
        {{ crew.job }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    credits: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>
@import "../../../css/app.css";
</style>
