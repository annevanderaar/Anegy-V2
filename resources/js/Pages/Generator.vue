<template>
  <PageHeader :title="$t('generator')"/>

  <h1 class="text-center">
    {{ $t('generator') }}
  </h1>
</template>

<script>
import { defineComponent } from 'vue';
import PageHeader from '@/Components/PageHeader.vue';

export default defineComponent({
  name: 'Generator',

  components: {
    PageHeader,
  },
});
</script>

<style scoped>

</style>
