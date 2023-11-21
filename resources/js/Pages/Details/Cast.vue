<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="cast in this.credits.cast"
      :key="cast.id"
      :href="`/people/${cast.id}`"
      width="300px"
      class="cards"
    >
      <v-avatar
        :image="`https://image.tmdb.org/t/p/w500${cast.profile_path}`"
        size="128"
        class="ma-2"
      />
      <v-card-title>{{ cast.name }}</v-card-title>
      <v-card-subtitle>{{ $t('details.cast.as') }}</v-card-subtitle>
      <v-card-text style="text-align: center">
        {{ cast.character }}
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
