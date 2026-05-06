<template>
  <v-btn
    :icon="icon"
    :href="href"
    class="text-white"
  />
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
});
</script>
