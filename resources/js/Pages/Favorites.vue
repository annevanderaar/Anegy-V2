<template>
  <Head :title="title()">
    <title>{{ title() }}</title>
  </Head>

  <h1 class="text-center">
    {{ title() }}
  </h1>

  <h3 class="text-center">
    {{ $t('favorites.all') }}
  </h3>
</template>

<script>
import { defineComponent } from 'vue';
import { Head } from '@inertiajs/vue3';

export default defineComponent({
  name: 'Favorites',

  components: {
    Head,
  },

  data () {
    return {};
  },

  methods: {
    title () {
      return this.$t('auth.dashboard.favorites');
    },
  },
});
</script>
