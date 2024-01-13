<template>
  <PageHeader :title="title()"/>

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
import { usePage } from '@inertiajs/vue3';
import { LanguageStore } from '@/Stores/LanguageStore';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import Cards from '@/Components/Cards.vue';
import PageHeader from '@/Components/PageHeader.vue';

export default defineComponent({
  name: 'Favorites',

  components: {
    PageHeader,
    Cards,
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
      this.favoriteStore.getFavorites(this.user.id);
    },
  },

  watch: {
    refresh () {
      this.getFavorites();
    },
  },

  mounted () {
    this.getFavorites();
  },
});
</script>
