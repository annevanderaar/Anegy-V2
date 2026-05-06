<template>
  <div class="d-flex flex-wrap justify-center align-center">
    <v-card
      v-for="person in items"
      :key="person.id"
      :href="`/people/${person.id}`"
      width="300px"
      class="cards"
    >
      <v-avatar
        :image="`https://image.tmdb.org/t/p/w500${person.profile_path}`"
        size="128"
        class="ma-2"
      />

      <v-card-title>
        {{ person.name }}
      </v-card-title>

      <template v-if="type === 'cast'">
        <v-card-subtitle>
          {{ $t('details.cast.as') }}
        </v-card-subtitle>

        <v-card-text class="text-center">
          {{ person.character }}
        </v-card-text>
      </template>

      <template v-else>
        <v-card-text class="text-center">
          {{ person.job }}
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  credits: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const items = computed(() => {
  return props.type === 'cast'
    ? props.credits.cast
    : props.credits.crew;
});
</script>
