<template>
  <div>
    <h2 v-if="!collection.name" class="text-center">
      {{ $t('details.collection.no') }}
    </h2>

    <h2 class="text-center">
      {{ collection.name }}
    </h2>

    <p class="text-center">
      {{ collection.overview }}
    </p>

    <Cards :results="collection.parts"/>
  </div>
</template>

<script setup>
import Cards from '@/Components/Cards.vue';

defineProps({
  collection: {
    type: Object,
    required: true,
  },
});
</script>
