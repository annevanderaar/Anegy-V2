<template>
  <PageHeader :title="title()"/>

  <h1 class="text-center">
    {{ title() }}
  </h1>

  <h3 class="text-center">
    {{ $t('watched.all') }}
  </h3>

  <Cards :results="watchedStore.data"/>
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
  name: 'Watched',
  components: {
    PageHeader,
    Cards,
  },
  data () {
    return {
      watchedStore: WatchedStore(),
      languageStore: LanguageStore(),
      favoriteStore: FavoriteStore(),
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
      return this.$t('auth.dashboard.watched');
    },
    getWatched () {
      this.watchedStore.getWatched(this.user.id);
    },
    getFavorites () {
      this.favoriteStore.getFavorites(this.user.id);
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
