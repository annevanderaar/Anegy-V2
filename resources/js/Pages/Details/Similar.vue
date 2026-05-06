<template>
  <div>
    <Cards :results="similar"/>
  </div>
</template>

<script setup>
import Cards from '@/Components/Cards.vue';

defineProps({
  similar: {
    type: Array,
    required: true,
  },
});
</script>
