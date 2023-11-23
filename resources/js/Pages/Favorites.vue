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

  <Cards :results="favoriteStore.data"/>
</template>

<script>
import { defineComponent } from 'vue';
import { Head, usePage } from '@inertiajs/vue3';
import { LanguageStore } from '@/Stores/LanguageStore';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import Cards from '@/Components/Cards.vue';

export default defineComponent({
  name: 'Favorites',

  components: {
    Cards,
    Head,
  },

  data () {
    return {
      favoriteStore: FavoriteStore(),
      languageStore: LanguageStore(),
    };
  },

  computed: {
    user () {
      return usePage().props.auth.user;
    },

    refresh () {
      return this.favoriteStore.refresh;
    },
  },

  methods: {
    title () {
      return this.$t('auth.dashboard.favorites');
    },

    getFavorites () {
      if (this.user) {
        this.favoriteStore.getFavorites(this.user.id);
      }
    },
  },

  watch: {
    refresh () {
      this.getFavorites();
    },
  },

  mounted () {
    this.favoriteStore.getFavorites(this.user.id);
  },
});
</script>
