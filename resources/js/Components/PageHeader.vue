<template>
  <Head :title="title">
    <title>{{ title }}</title>
  </Head>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
