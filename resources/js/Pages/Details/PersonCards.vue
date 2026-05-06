<template>
  <div>
    <v-btn-toggle
      v-model="value"
      color="accent"
      variant="text"
      mandatory
    >
      <v-btn>{{ $t('details.cast.title') }}</v-btn>

      <v-btn>{{ $t('details.crew') }}</v-btn>
    </v-btn-toggle>

    <Cards
      v-if="selectedValue === 'cast'"
      :results="personMovies ? personMovies.cast : personSeries.cast"
    />

    <Cards
      v-else-if="selectedValue === 'crew'"
      :results="personMovies ? personMovies.crew : personSeries.crew"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Cards from '@/Components/Cards.vue';

defineProps({
  personMovies: {
    type: Object,
    required: false,
    default: () => {},
  },
  personSeries: {
    type: Object,
    required: false,
    default: () => {},
  },
});

const selectedValue = ref('cast');
const value = ref(0);

watch(value, val => {
  if (val === 0) {
    selectedValue.value = 'cast';
  }

  if (val === 1) {
    selectedValue.value = 'crew';
  }
});
</script>
