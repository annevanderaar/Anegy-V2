<template>
  <div>
    <h2 v-if="!reviews.length" class="text-center">
      {{ $t('details.reviews.no') }}
    </h2>

    <v-card
      v-for="review in reviews"
      :key="review.id"
      :href="review.url"
      class="ma-8"
      target="_blank"
    >
      <div class="d-flex align-items-center">
        <v-icon
          v-if="!review.author_details.avatar_path"
          size="x-large"
          icon="mdi-account-circle"
          class="mt-2 ml-2"
        />

        <v-avatar
          v-else-if="review.author_details.avatar_path.charAt(1) === 'h'"
          :image="`${review.author_details.avatar_path.substring(1)}`"
          class="ma-2"
        />

        <v-avatar
          v-else
          :image="`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`"
          class="ma-2"
        />

        <v-card-title>{{ review.author }}</v-card-title>
      </div>

      <v-card-text>{{ review.content }}</v-card-text>

      <v-card-subtitle>
        {{ generalStore.getDate(review.created_at) }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script setup>
import { GeneralStore } from '@/Stores/GeneralStore';

defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});

const generalStore = GeneralStore();
</script>
