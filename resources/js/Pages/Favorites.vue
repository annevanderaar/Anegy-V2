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
import Cards from '@/Components/Cards.vue';
import PageHeader from '@/Components/PageHeader.vue';
import { FavoriteStore } from '@/Stores/FavoriteStore';
import { LanguageStore } from '@/Stores/LanguageStore';
import { WatchedStore } from '@/Stores/WatchedStore';

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
      watchedStore: WatchedStore(),
    };
  },
  computed: {
    user () {
      return usePage().props.auth.user;
    },
    refreshFav () {
      return this.favoriteStore.refresh;
    },
    refreshWat () {
      return this.watchedStore.refresh;
    },
    translate () {
      return this.languageStore.translate;
    },
  },
  methods: {
    title () {
      return this.$t('auth.dashboard.favorites');
    },
    getFavorites () {
      this.favoriteStore.getFavorites(this.user.id);
    },
    getWatched () {
      this.watchedStore.getWatched(this.user.id);
    },
  },
  watch: {
    refreshFav () {
      this.getFavorites();
    },
    refreshWat () {
      this.getWatched();
    },
    translate () {
      this.getFavorites();
      this.getWatched();
    },
  },
  mounted () {
    this.getFavorites();
    this.getWatched();
  },
});
</script>
