<template>
  <Head :title="title">
    <title>{{ title }}</title>
  </Head>
</template>

<script>
import { Head } from '@inertiajs/vue3';

export default {
  name: 'PageHeader',

  components: {
    Head,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
